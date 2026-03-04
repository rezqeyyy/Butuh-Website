"use client";

import { useMoreWebsite } from "@/hooks/morewebsite/useMoreWebsite";
import { MoreWebsiteService } from "@/services/morewebsite/morewebsite.service";
import { LayoutTemplate, Monitor, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

// Komponen website card
const WebsiteCard = ({ website }: { website: any }) => (
    <div className="bg-white dark:bg-[#111111] rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer">
        <div className={`h-40 w-full bg-linear-to-br ${website.color} relative p-5 flex flex-col justify-end overflow-hidden`}>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/30">
            {website.type}
            </div>
            <Monitor className="text-white/20 w-24 h-24 absolute -right-4 -bottom-4 transform -rotate-12" />
        </div>

        <div className="p-6 flex flex-col flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#1a56db] dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
            {website.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
            {website.desc}
            </p>
            
            <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex items-center justify-between mt-auto">
            <div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Harga Beli</p>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg">
                Rp {website.price.toLocaleString("id-ID")}
                </p>
            </div>
            <div className="bg-[#1a56db] hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95">
                <ShoppingCart className="w-5 h-5" />
            </div>
            </div>
        </div>
    </div>
);

export default function WebsiteHome() {
  // --- LOAD DUMMY DATA UNTUK JUALAN WEBSITE ---
  const { moreWebsite: websites } = useMoreWebsite();
  const router = useRouter();
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* Header & Hero Section */}
            <section className="bg-[#1a56db] dark:bg-blue-950 text-white py-20 px-6 text-center transition-colors">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Kumpulan Website Siap Pakai 
                </h1>
                <p className="text-blue-100 dark:text-blue-200 text-lg max-w-2xl mx-auto mb-10 font-medium">
                Beli website siap pakai yang langsung bisa digunakan, tanpa ribet custom, dan dengan harga terjangkau. Mulai dari company profile, toko online, hingga undangan digital.
                </p>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
                
                <section>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <LayoutTemplate className="text-sky-500" /> Website Siap Pakai
                          </h2>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">Beli desain jadi, langsung online hari ini juga.</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {websites?.map((website: any) => (
                        <div key={website.id} onClick={() => router.push(`/morewebsite/${website.id}`)}>
                        <WebsiteCard website={website} />
                        </div>
                    ))}
                    </div>
                </section>

            </div>
        </div>
    );
}