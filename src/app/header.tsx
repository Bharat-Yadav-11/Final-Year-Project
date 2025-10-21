"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <>

      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-black" onClick={() => setIsMenuOpen(false)}>
            <Image src="/logo.png" width="40" height="40" alt="SmartDrive logo" />
            <span>SmartDrive</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-4">
            <SignedIn>
              <Button variant={"secondary"}>
                <Link href="/dashboard/files">Your Files</Link>
              </Button>
            </SignedIn>
            <div className="flex items-center gap-4">
              <OrganizationSwitcher />
              <UserButton />
              <SignedOut>
                <SignInButton mode="modal">
                  <Button>Sign In</Button>
                </SignInButton>
              </SignedOut>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-16 left-0 z-40 w-full border-b bg-white/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto flex flex-col items-start gap-4 p-4">
              <SignedIn>
                <Link
                  href="/dashboard/files"
                  className="w-full rounded-md p-2 text-left font-medium hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Files
                </Link>
              </SignedIn>
              <div className="w-full border-t pt-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Switch Organization</span>
                  <SignedIn>
                    <OrganizationSwitcher />
                  </SignedIn>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Manage Account</span>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full">Sign In</Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}