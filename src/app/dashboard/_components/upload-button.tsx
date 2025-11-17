"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UploadIcon } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
});

export function UploadButton() {
  const { toast } = useToast();
  const organization = useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", file: undefined },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const orgId = organization.organization?.id ?? user.user?.id;
    if (!orgId) return;

    const postUrl = await generateUploadUrl();
    const fileType = values.file[0].type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    const types = {
      // Images
      "image/png": "image",
      "image/jpeg": "image",
      "image/gif": "image",
      "image/webp": "image",
      "image/svg+xml": "image",

      // Pdf
      "application/pdf": "pdf",

      // CSV
      "text/csv": "csv",

      // Excel
      "application/vnd.ms-excel": "excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel", // .xlsx

      // Word/Doc
      "application/msword": "word",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",

      // Ppt
      "application/vnd.ms-powerpoint": "ppt",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": "ppt",

      // Audio
      "audio/mpeg": "audio",
      "audio/wav": "audio",
      "audio/ogg": "audio",
      "audio/mp4": "audio",

      // Video
      "video/mp4": "video",
      "video/quicktime": "video",
      "video/x-ms-wmv": "video",
      "video/webm": "video",

      // ZIP
      "application/zip": "zip",
      "application/x-zip-compressed": "zip",
    } as Record<string, Doc<"files">["type"]>;

    try {
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId,
        type: types[fileType] ?? "other",
      });

      form.reset();
      setIsFileDialogOpen(false);

      toast({
        variant: "success",
        title: "File Uploaded",
        description: `"${values.title}" is now accessible to your organization.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your file could not be uploaded, try again later.",
      });
    }
  }

  return (
    <Dialog open={isFileDialogOpen} onOpenChange={(isOpen) => {
      setIsFileDialogOpen(isOpen);
      form.reset();
    }}>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <UploadIcon className="w-4 h-4" /> Upload File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload your File</DialogTitle>
        <DialogDescription>
          This file will be accessible by anyone in your organization.
        </DialogDescription>

        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting} className="flex gap-1">
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}