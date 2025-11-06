import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <div className="container mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="xl:flex xl:items-start xl:justify-between xl:gap-8">
          {/* Logo and Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                width="40"
                height="40"
                alt="SmartDrive logo"
                className="h-10 w-auto filter invert"
              />
              <span className="text-2xl font-bold">SmartDrive</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              The simplest, smartest way to share files — for teams, businesses, and individuals alike.
            </p>
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:max-w-md xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <Link href="/about" className="text-sm leading-6 text-gray-300 transition-colors duration-300 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm leading-6 text-gray-300 transition-colors duration-300 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm leading-6 text-gray-300 transition-colors duration-300 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <Link href="/privacy" className="text-sm leading-6 text-gray-300 transition-colors duration-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-sm leading-6 text-gray-300 transition-colors duration-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section with Social Links and Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="flex space-x-6">
            <a href="https://x.com/BharatYadav9910" target="_blank" className="text-gray-400 transition-colors duration-300 hover:text-white">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://github.com/Bharat-Yadav-11" target="_blank" className="text-gray-400 transition-colors duration-300 hover:text-white">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/bharatdev/" target="_blank" className="text-gray-400 transition-colors duration-300 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 sm:mt-0">
            &copy; {new Date().getFullYear()} SmartDrive, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}