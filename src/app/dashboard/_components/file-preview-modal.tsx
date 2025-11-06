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

  const isPreviewable = file.type === "image" || file.type === "pdf";

  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="truncate">{file.name}</DialogTitle>
          {isPreviewable ? (
             <DialogDescription>
              Previewing {file.type}. You can also download the file.
            </DialogDescription>
          ) : (
            <DialogDescription>
              This file type cannot be previewed directly. Please download it to view.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {file.type === "image" && (
            <div className="relative w-full h-full">
              <Image src={file.url} alt={file.name} fill style={{ objectFit: 'contain' }} />
            </div>
          )}
          
          {file.type === "pdf" && (
            <iframe src={file.url} className="w-full h-full border-0" />
          )}

          {!isPreviewable && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
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