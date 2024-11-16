import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react"; 

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
              href="/try-now"
              className="bg-[#62825D] text-white px-6 py-2.5 rounded-full hover:bg-[#3D5300] transition-colors"
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
