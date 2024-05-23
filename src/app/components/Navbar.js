import Link from "next/link";
import { signout, useSession } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center">
        <h1 className="text-white text-lg font-bold">OCR4Cards</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/contacts" className="text-white hover:text-gray-300">
          Contacts
        </Link>
        <Link href="/account" className="text-white hover:text-gray-300">
          Account
        </Link>
      </div>
    </nav>
  );
}
