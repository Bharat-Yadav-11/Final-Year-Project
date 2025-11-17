"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Doc } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

type FileWithUrl = Doc<"files"> & { url: string | null };

export function FilePreviewModal({
  file,
  onClose,
}: {
  file: FileWithUrl | null;
  onClose: () => void;
}) {
  if (!file || !file.url) {
    return null;
  }

  const isOfficeDocument = file.type === "word" || file.type === "ppt" || file.type === "excel";
  const isPreviewable = file.type === "image" || file.type === "pdf" || file.type === "audio" || file.type === "video" || isOfficeDocument;

  // The Office Viewer needs a URL-encoded version of file's URL
  let officeViewerUrl = "";
  if (isOfficeDocument && file.url) {
    const encodedUrl = encodeURIComponent(file.url);
    officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;

    // For Word documents, add the parameter to default to Page Width zoom
    if (file.type === "word") {
      officeViewerUrl += "&wdw.zoom=PageWidth";
    }
  }

  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className={isOfficeDocument ? "max-w-5xl h-[90vh] flex flex-col" : "max-w-4xl"}>
        <DialogHeader>
          <DialogTitle className="truncate">{file.name}</DialogTitle>
          <DialogDescription>
            Previewing your file. Some content may not render perfectly.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 h-full overflow-auto">
          {file.type === "image" && (
            <div className="relative w-full h-[60vh]">
              <Image src={file.url} alt={file.name} fill style={{ objectFit: 'contain' }} />
            </div>
          )}

          {file.type === "pdf" && (
            <iframe src={file.url} className="w-full h-[70vh] border-0" />
          )}

          {file.type === "audio" && (
            <div className="p-8">
              <audio controls className="w-full">
                <source src={file.url} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {file.type === "video" && (
            <video controls className="w-full max-h-[70vh]">
              <source src={file.url} />
              Your browser does not support the video tag.
            </video>
          )}

          {isOfficeDocument && (
            <iframe src={officeViewerUrl} className="w-full h-full border-0 bg-gray-200" />
          )}

          {!isPreviewable && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
              <p className="text-lg">No preview available for this file type.</p>
              <Button onClick={() => window.open(file.url!, "_blank")} className="flex gap-2">
                <DownloadIcon className="w-5 h-5" />
                Download {file.name}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}