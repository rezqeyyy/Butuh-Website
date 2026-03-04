"use client";

import { MessageSquare, Search, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useChatInbox } from "@/hooks/chat/useChatInbox"; // Pastikan import ini benar sesuai dengan nama hook yang kamu buat

export default function ChatInboxPage() {
  const { filteredChats, loading, searchQuery, setSearchQuery,} = useChatInbox();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-6 pb-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <MessageSquare className="text-blue-600 dark:text-blue-500 w-8 h-8" /> 
            Pesan Saya
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Pantau semua obrolan dengan klien atau developer di sini.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all shadow-sm"
            placeholder="Cari nama atau pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Memuat pesan...</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-700">
                <MessageSquare className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-900 dark:text-white font-bold text-lg">Belum ada obrolan</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredChats.map((chat: any) => (
                <Link 
                  href={`/chat/${chat.id}?targetId=${chat.interlocutor_id || ''}`} 
                  key={chat.id}
                  className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
                >
                  <div className="w-14 h-14 shrink-0 rounded-full bg-linear-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xl shadow-inner">
                    {chat.interlocutor_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white truncate pr-4">
                        {chat.interlocutor_name}
                      </h3>
                      <span className="text-xs whitespace-nowrap text-gray-400 dark:text-gray-500 font-medium">
                        {chat.last_message_time}
                      </span>
                    </div>
                      {/* FIX: Warna font pesan dipastikan terlihat di dark mode */}
                    <p className="text-sm truncate pr-4 text-gray-500 dark:text-gray-400">
                      {chat.last_message}
                    </p>
                  </div>
                  <div className="text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}