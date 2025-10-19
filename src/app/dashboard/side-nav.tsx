"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard/files", icon: <FileIcon />, label: "All Files" },
  { href: "/dashboard/favorites", icon: <StarIcon />, label: "Favorites" },
  { href: "/dashboard/trash", icon: <TrashIcon />, label: "Trash" },
];

export function SideNav() {
  const pathname = usePathname();

  // FIX: This guard clause satisfies TypeScript and prevents errors if pathname is ever null.
  if (!pathname) {
    return null;
  }

  return (
  
    <nav className="flex flex-col gap-4">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link href={link.href} key={link.href}>
            <Button
              variant={"ghost"}
              className={clsx(
                "flex justify-start items-center gap-2 w-full",
                {
                  "bg-muted text-primary hover:text-primary": isActive,
                }
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}