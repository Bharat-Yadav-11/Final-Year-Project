"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JSZip from "jszip";
import PDFParser from "pdf2json";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const generateEmbedding = internalAction({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    const file = await ctx.runQuery(internal.files.getFile, {
      fileId: args.fileId,
    });
    if (!file) return;

    const fileBlob = await ctx.storage.get(file.fileId);
    if (!fileBlob) {
      console.log(`No content found for file ${file.name}`);
      return;
    }

    const arrayBuffer = await fileBlob.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    let textToEmbed = "";

    const base64Data = fileBuffer.toString("base64");

    try {
      switch (file.type) {
        case "pdf": {
          const pdfParser = new PDFParser(null, 1);
          textToEmbed = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", (errData: any) =>
              reject(errData.parserError)
            );
            pdfParser.on("pdfParser_dataReady", () => {
              resolve((pdfParser as any).getRawTextContent());
            });
            pdfParser.parseBuffer(fileBuffer);
          });
          break;
        }
        case "word": {
          const zip = await JSZip.loadAsync(fileBuffer);
          const xml = await zip.file("word/document.xml")?.async("string");
          if (xml) {
            textToEmbed =
              xml
                .match(/<w:t[^>]*>([^<]*)<\/w:t>/g)
                ?.map((t) => t.replace(/<[^>]+>/g, ""))
                .join(" ") || "";
          }
          break;
        }
        case "ppt": {
          const zip = await JSZip.loadAsync(fileBuffer);
          const slideFiles = Object.keys(zip.files).filter(
            (key) => key.startsWith("ppt/slides/slide") && key.endsWith(".xml")
          );

          for (const slideFile of slideFiles) {
            const xml = await zip.file(slideFile)?.async("string");
            if (xml) {
              const slideText =
                xml
                  .match(/<a:t[^>]*>([^<]*)<\/a:t>/g)
                  ?.map((t) => t.replace(/<[^>]+>/g, ""))
                  .join(" ") || "";
              textToEmbed += slideText + " ";
            }
          }
          break;
        }
        case "zip": {
          const zip = await JSZip.loadAsync(fileBuffer);

          const fileNames = Object.keys(zip.files);

          const visibleFiles = fileNames.filter(
            (name) => !name.startsWith("__") && !name.startsWith(".")
          );

          textToEmbed =
            "A ZIP archive containing the following files: " +
            visibleFiles.join(", ");
          break;
        }
        case "image":
        case "audio":
        case "video": {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

          const prompt = `Analyze this ${file.type} file. 
          If it's an image, describe it in detail. 
          If it's audio or video, transcribe the spoken content and describe the visual actions.
          Focus on extracting information useful for searching.`;

          const result = await model.generateContent([
            prompt,
            {
              inlineData: {
                data: base64Data,
                mimeType: "application/octet-stream",
              },
            },
          ]);

          textToEmbed = result.response.text();
          break;
        }
        default: {
          textToEmbed = file.name;
          break;
        }
      }
    } catch (error) {
      console.error(`Failed to process content from ${file.name}:`, error);
      textToEmbed = file.name;
    }

    textToEmbed = textToEmbed.trim().substring(0, 8000);
    if (textToEmbed.length === 0) return;

    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const embeddingResult = await embeddingModel.embedContent(textToEmbed);
    const embedding = embeddingResult.embedding.values;

    await ctx.runMutation(internal.files.updateFileEmbedding, {
      fileId: args.fileId,
      embedding,
    });
  },
});

export const performSearch = action({
  args: {
    orgId: v.string(),
    query: v.string(),
  },
  async handler(ctx, args) {
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const embeddingResult = await embeddingModel.embedContent(args.query);
    const queryVector = embeddingResult.embedding.values;

    const searchResults = await ctx.vectorSearch("files", "by_embedding", {
      vector: queryVector,
      limit: 16,
      filter: (q) => q.eq("orgId", args.orgId),
    });

    const relevantResults = searchResults.filter((result) => {
      console.log(`File Score: ${result._score}`); // Uncomment to debug scores
      return result._score > 0.40;
    });

    const files: any[] = await Promise.all(
      relevantResults.map(async (result) => {
        const file = await ctx.runQuery(internal.files.getFile, {
          fileId: result._id,
        });
        if (!file) return null;

        const url = await ctx.storage.getUrl(file.fileId);
        // Return the score so we can see it in the UI if we want
        return { ...file, url, score: result._score };
      })
    );

    return files.filter((f) => f !== null);
  },
});
