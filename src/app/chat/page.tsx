"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Send, MessageSquare } from "lucide-react";

// Tipe data untuk TypeScript
type ChatMessage = {
  id: number;
  created_at: string;
  sender: string;
  message: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simulasi role: Di aplikasi asli, ini didapat dari sistem Login.
  // Untuk uji coba, kita set sebagai 'customer'.
  const currentUser = "customer"; 

  useEffect(() => {
    // 1. Ambil histori pesan saat halaman pertama kali dimuat
    fetchMessages();

    // 2. Aktifkan Supabase Realtime Listener
    const channel = supabase
      .channel("live-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          // Jika ada pesan baru di database, langsung tambahkan ke state UI
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    // Cleanup listener saat komponen di-unmount (Best Practice Clean Code)
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-scroll ke pesan paling bawah setiap ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", { ascending: true }); // Urutkan dari yang terlama ke terbaru

    if (!error && data) {
      setMessages(data);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageToSend = newMessage;
    setNewMessage(""); // Kosongkan input langsung agar terasa cepat (Optimistic UI)

    // Kirim ke database
    const { error } = await supabase.from("chats").insert([
      { sender: currentUser, message: messageToSend },
    ]);

    if (error) {
      alert("Gagal mengirim pesan!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Chat Header */}
        <div className="bg-blue-600 p-4 text-white flex items-center gap-3 shadow-md z-10">
          <MessageSquare className="w-6 h-6" />
          <div>
            <h2 className="font-bold text-lg">Live Chat dengan Developer</h2>
            <p className="text-blue-100 text-sm">Tanya jawab seputar pembuatan website</p>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              Belum ada pesan. Mulai percakapan sekarang!
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender === currentUser;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                    isMe 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-[10px] mt-1 text-right ${isMe ? "text-blue-200" : "text-gray-400"}`}>
                      {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} /> {/* Elemen pancingan untuk auto-scroll */}
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 px-4 py-3 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}