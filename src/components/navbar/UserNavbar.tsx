"use client";
import { Home, ShoppingBag, MessageSquare, User } from "lucide-react";
import Link from "next/link";

export default function UserNavbar() {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white border-b z-50 px-8 py-4 justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">Butuh Website</h1>
        <div className="flex gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/orders/user" className="hover:text-blue-600 transition-colors">Pesanan Saya</Link>
          <Link href="/chat" className="hover:text-blue-600 transition-colors">Chat</Link>
          <Link href="/profile" className="hover:text-blue-600 transition-colors">Akun</Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t flex justify-around py-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-all">
          <Home className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href="/orders/user" className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-all">
          <ShoppingBag className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Pesanan</span>
        </Link>
        <Link href="/chat" className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-all">
          <MessageSquare className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Chat</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-all">
          <User className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Akun</span>
        </Link>
      </nav>
    </>
  );
}