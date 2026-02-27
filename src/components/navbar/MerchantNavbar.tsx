"use client";
import { LayoutDashboard, Inbox, MessageSquare, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MerchantNavbar() {
  const [isDark, setIsDark] = useState(false);

  // Cek apakah website sedang dalam mode gelap saat baru dimuat
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  // Fungsi saklar untuk mengganti tema seluruh layar
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Desktop Navbar - Terang di Light Mode, Gelap di Dark Mode */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-50 px-8 py-4 justify-between items-center shadow-sm transition-colors duration-300">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">Butuh Website</h1>
        
        <div className="flex items-center gap-8 font-medium text-gray-600 dark:text-gray-300">
          <Link href="/dashboard/merchant" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link href="/orders/merchant" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pesanan Masuk</Link>
          <Link href="/chat" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chat Klien</Link>
          <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profil</Link>
          
          {/* Garis Pembatas */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>

          {/* Tombol Tema */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            title="Ganti Tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar - Mengambang di Bawah */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex justify-around py-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-colors duration-300">
        <Link href="/dashboard/merchant" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
          <LayoutDashboard className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Dashboard</span>
        </Link>
        <Link href="/orders/merchant" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
          <Inbox className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Pesanan</span>
        </Link>
        <Link href="/chat" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
          <MessageSquare className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Chat</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
          <User className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Profil</span>
        </Link>
        
        {/* Tombol Tema Mobile */}
        <button 
          onClick={toggleTheme}
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-all"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} 
          <span className="text-[10px] mt-1 font-medium">Tema</span>
        </button>
      </nav>
    </>
  );
}