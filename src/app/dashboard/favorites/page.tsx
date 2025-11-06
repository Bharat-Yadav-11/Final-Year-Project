"use client";

import Image from "next/image";
import { FileBrowser } from "../_components/file-browser";

function FavoritesPlaceholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        alt="an image of a star icon"
        width="200"
        height="200"
        src="/favorites.svg"
        priority
      />
      <div className="text-2xl text-center">
        You have no favorite files yet.
      </div>
      <p className="text-gray-600 text-center">
        Favorite a file to see it appear here.
      </p>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser 
      title="Favorites" 
      favoritesOnly 
      placeholder={ <FavoritesPlaceholder/> }
      />
    </div>
  );
}
