"use client";

import { useParams, useRouter } from "next/navigation";
import { Loader2, Monitor } from "lucide-react";
import { useDetailWebsiteRoom } from "@/hooks/morewebsite/useDetailWebsite";

export default function WebsiteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const webId = params.id as string;
  const { detailWebsite, loading } = useDetailWebsiteRoom(webId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!detailWebsite) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Website tidak ditemukan</h1>
          <button onClick={() => router.back()} className="text-[#1a56db] hover:underline font-medium">Kembali</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 mx-auto my-16">
        <div className={`min-h-5 mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-md p-6 bg-linear-to-br ${detailWebsite?.color}`}>
          <div className={`h-40 w-full bg-linear-to-br ${detailWebsite.color} relative p-5 flex flex-col justify-end overflow-hidden`}>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/30">
            {detailWebsite.type}
            </div>
            <Monitor className="text-white/20 w-24 h-24 absolute -right-4 -bottom-4 transform -rotate-12" />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{detailWebsite?.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{detailWebsite?.desc}</p>
          
          <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex items-center justify-between mt-auto" />  
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Harga Beli</p>
          <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg">
            Price: Rp {detailWebsite?.price.toLocaleString("id-ID")}
          </p>
        </div>
    </div>
  );
}