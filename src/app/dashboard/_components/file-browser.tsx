"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { SearchBar } from "./search-bar";
import { ReactNode, useState } from "react";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MobileNav } from "./mobile-nav";
import { FilePreviewModal } from "./file-preview-modal";

type ModifiedFileType = Doc<"files"> & {
  isFavorited: boolean;
  url: string | null;
};

function LoadingPlaceholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
      <div className="text-2xl text-center">Loading your files...</div>
    </div>
  );
}

function EmptyPlaceholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="An image of a picture and directory icon"
        width="250"
        height="250"
        src="/empty.svg"
        priority
      />
      <div className="text-2xl text-center">
        Your space is empty.
      </div>
      <p className="text-gray-500 text-center">
        You haven't upload anything yet. Upload your first file to get started!
      </p>

      <div className="mb-12">
        <UploadButton />
      </div>
    </div>
  );
}

export function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
  placeholder,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
  placeholder?: ReactNode;
}) {

  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  const [previewFile, setPreviewFile] = useState<ModifiedFileType | null>(null);

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : "skip");
  const files = useQuery(api.files.getFiles, orgId ? { orgId, type: type === "all" ? undefined : type, query, favorites: favoritesOnly, deletedOnly } : "skip");
  const isLoading = files === undefined;

  const modifiedFiles: ModifiedFileType[] = files?.map((file) => ({ ...file, isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id) })) ?? [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      {/* HEADER: ENHANCED FOR CLEANER MOBILE LAYOUT */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* The MobileNav appears only on mobile screens */}
              <div className="md:hidden">
                <MobileNav />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            </div>
            <div className="hidden md:block">
              <UploadButton />
            </div>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      <Tabs defaultValue="grid">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="grid" className="flex-1 md:flex-initial flex gap-2 items-center"><GridIcon />Grid</TabsTrigger>
            <TabsTrigger value="table" className="flex-1 md:flex-initial flex gap-2 items-center"><RowsIcon />Table</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center justify-end">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select value={type} onValueChange={(newType) => { setType(newType as any); }}>
              <SelectTrigger id="type-select" className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV/Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="word">Word</SelectItem>
                <SelectItem value="ppt">PPT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && <LoadingPlaceholder />}

        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {modifiedFiles?.map((file) => (
              <FileCard key={file._id} file={file} onPreview={() => setPreviewFile(file)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {!isLoading && files.length === 0 && (
        placeholder ? placeholder : <EmptyPlaceholder />
        )}
    </motion.div>
  );
}