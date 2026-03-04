"use client";

import { useParams, useRouter } from "next/navigation";
import { Send, ArrowLeft, Loader2, MoreVertical } from "lucide-react";
import { useChatRoom } from "@/hooks/chat/useChatRoom";

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  
  // Keluarkan roomName dari hook
  const { messages, newMessage, setNewMessage, currentUser, loading, messagesEndRef, roomName, handleSendMessage } = useChatRoom(roomId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/chat')} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg">
              {/* Tampilkan huruf depan namanya di Avatar */}
              {roomName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm md:text-base leading-tight">
                {/* Tampilkan nama aslinya di sini */}
                {roomName}
              </h2>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-2">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg: any) => {
          const isMe = msg.sender_id === currentUser?.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] md:max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${
                isMe 
                  ? "bg-blue-600 text-white rounded-tr-sm" 
                  : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-tl-sm"
              }`}>
                <p className="text-[15px] leading-relaxed wrap-break-word">{msg.message}</p>
                <p className={`text-[10px] mt-1.5 text-right font-medium ${isMe ? "text-blue-200" : "text-gray-400 dark:text-gray-500"}`}>
                  {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3 items-end">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e as any); } }}
            placeholder="Ketik pesan..."
            rows={1}
            className="flex-1 max-h-32 min-h-[44px] resize-none px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-inner"
          />
          <button type="submit" disabled={!newMessage.trim()} className="shrink-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed shadow-md">
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}