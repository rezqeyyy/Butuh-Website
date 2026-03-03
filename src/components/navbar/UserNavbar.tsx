"use client";

import { Home, ShoppingBag, MessageSquare, User, LogOut, Settings, LogIn, Sun, Moon, ChevronDown } from "lucide-react";
import Link from "next/link";
// Import hook
import { useNavbar } from "@/hooks/navbar/useNavbar";

export default function UserNavbar() {
  // Panggil semua logika dari hook
  const { user, profile, isDark, isDropdownOpen, setIsDropdownOpen, dropdownRef, toggleTheme, handleLogout } = useNavbar();

  return (
    <>
      {/* Desktop Navbar - Desain Premium */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-zinc-800 z-50 px-10 py-3.5 justify-between items-center transition-colors duration-300">
        
        <Link href="/" className="text-2xl font-bold text-[#1a56db] dark:text-blue-500 tracking-tight">
          Butuh Website
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-7 font-medium text-[15px] text-gray-500 dark:text-gray-400 mr-4">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/orders/user" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Pesanan Saya</Link>
            <Link href="/chat" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Chat</Link>
          </div>
          
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all border border-gray-100 dark:border-zinc-800" title="Ganti Tema">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="w-[1.5px] h-6 bg-gray-200 dark:bg-zinc-800 mx-1"></div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all bg-white dark:bg-[#0a0a0a]">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#1a56db] to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-inner overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                  {profile?.full_name || user.email?.split('@')[0]}
                </span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 fade-in">
                  <div className="px-5 py-4 border-b border-gray-50 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">Login sebagai</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{profile?.full_name || user.email}</p>
                  </div>
                  <div className="p-2">
                    <Link href="/profile/user" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
                      <Settings size={16} /> Pengaturan Akun
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-1">
                      <LogOut size={16} /> Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-[#1a56db] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-[15px] transition-all">
              <LogIn size={18} /> Masuk / Daftar
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-zinc-800 flex justify-around py-3 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-colors duration-300">
        <Link href="/" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-[#1a56db] dark:hover:text-blue-500 transition-all">
          <Home className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href={user ? "/orders/user" : "/login"} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-[#1a56db] dark:hover:text-blue-500 transition-all">
          <ShoppingBag className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Pesanan</span>
        </Link>
        <Link href={user ? "/chat" : "/login"} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-[#1a56db] dark:hover:text-blue-500 transition-all">
          <MessageSquare className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">Chat</span>
        </Link>
        <Link href={user ? "/profile/user" : "/login"} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-[#1a56db] dark:hover:text-blue-500 transition-all">
          <User className="w-5 h-5" /> <span className="text-[10px] mt-1 font-medium">{user ? "Akun" : "Login"}</span>
        </Link>
        <button onClick={toggleTheme} className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-all">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />} 
          <span className="text-[10px] mt-1 font-medium">Tema</span>
        </button>
      </nav>
    </>
  );
}