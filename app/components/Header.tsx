import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Commuity", href: "/community-page" },
  { name: "Support", href: "/support-resources" },
];

export default function Header() {
  return (
    <header className="bg-white text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/contentstack.svg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex gap-x-8">
          {navigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-black hover:text-indigo-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
