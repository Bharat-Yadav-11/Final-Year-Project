"use client";

import Image from "next/image";
import { FileBrowser } from "../_components/file-browser";
function TrashPlaceholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a trash can"
        width="250"
        height="250"
        src="/trash.svg"
        priority
      />
      <div className="text-2xl text-center">
        Your trash is empty.
      </div>
      <p className="text-gray-600 text-center">
        Deleted files will appear here for you to restore or permanently delete.
      </p>
    </div>
  );
}

export default function TrashPage() {
  return (
    <div>
      <FileBrowser
        title="Trash"
        deletedOnly 
        placeholder={ <TrashPlaceholder/> }
        />
    </div>
  );
}
