'use client';

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isRootPage = pathname === "/";

  if (isRootPage) {
    return (
      <nav className="bg-white fixed w-full top-0 z-50 border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <Image
                src="/greenesis_logo.png"
                alt="Greenesis Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>Blog</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>FAQ</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <Link
                href="/partners"
                className="text-gray-600 hover:text-gray-900"
              >
                Team
              </Link>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>Contact</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <Link
                href="/explore"
                className="bg-[#62825D] text-white px-6 py-2.5 rounded-full hover:bg-[#3D5300] transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div className="navbar sticky top-0 z-50 bg-base-200 bg-opacity-30 py-2 px-6">
      <div className="flex flex-grow justify-between gap-3">
        <div className="flex flex-auto items-center justify-between gap-3">
          <div>
            <div className="flex flex-shrink-0 flex-row items-center gap-1 py-2">
              <div className="flex ml-3">
                <Link href="/">
                  <img
                    src="/app_logo.png"
                    alt="App Logo"
                    className="h-12 w-12 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex me-3">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;