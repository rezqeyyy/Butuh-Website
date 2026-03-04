"use client";

import { Search, Code2, ChevronRight, Loader2, Monitor, LayoutTemplate, ShoppingCart } from "lucide-react";
import Link from "next/link";
// Import logika dari folder hooks
import { useMarketplace } from "@/hooks/home/useMarketplace";
import { useRouter } from "next/navigation";
import { useMoreWebsite } from "@/hooks/morewebsite/useMoreWebsite";
import { useWebsite } from "@/hooks/website/useWebsite";

// --- Komponen Kartu Khusus Jualan Website ---
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

// --- Komponen Kartu Developer ---
const MerchantCard = ({ merchant }: { merchant: any }) => (
  <div className="bg-white dark:bg-[#111111] rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 bg-linear-to-br from-[#1a56db] to-indigo-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner uppercase overflow-hidden shrink-0">
        {merchant.profiles?.avatar_url ? (
          <img src={merchant.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          merchant.profiles?.full_name?.charAt(0) || "D"
        )}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#1a56db] dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {merchant.profiles?.full_name || "Developer"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
          <Code2 className="w-3.5 h-3.5" /> {merchant.experience_years || 0} Tahun Pengalaman
        </p>
      </div>
    </div>
    
    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-1 italic">
      &quot;{merchant.short_description || "Siap membantu mewujudkan website impian Anda."}&quot;
    </p>
    
    <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex items-center justify-between mt-auto">
      <div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">Harga Mulai</p>
        <p className="font-extrabold text-[#1a56db] dark:text-blue-400 text-lg">
          Rp {merchant.start_price?.toLocaleString("id-ID") || 0}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 p-2.5 rounded-xl group-hover:bg-[#1a56db] group-hover:text-white dark:group-hover:bg-blue-600 transition-all shadow-sm">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default function MarketplaceHome() {
  // Panggil data dari custom hook
  const { merchants, isLoading } = useMarketplace();
  const { website, loading } = useWebsite();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* Header & Hero Section */}
      <section className="bg-[#1a56db] dark:bg-blue-950 text-white py-20 px-6 text-center transition-colors">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Wujudkan Website Impianmu
        </h1>
        <p className="text-blue-100 dark:text-blue-200 text-lg max-w-2xl mx-auto mb-10 font-medium">
          Beli website siap pakai yang langsung bisa digunakan, atau sewa developer ahli untuk bangun sistem sesuai kebutuhan khususmu.
        </p>
        
        <div className="max-w-2xl mx-auto flex bg-white dark:bg-[#111111] rounded-full overflow-hidden shadow-xl p-1.5 border border-white/20 dark:border-zinc-800 transition-colors">
          <div className="pl-5 flex items-center text-gray-400 dark:text-gray-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari website, developer, atau keahlian (React, Landing Page)..."
            className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white outline-none placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button className="bg-[#1a56db] dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all shrink-0">
            Cari
          </button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <LayoutTemplate className="text-emerald-500" /> Website Siap Pakai
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Beli desain jadi, langsung online hari ini juga.</p>
            </div>
            <button onClick={() => router.push('/morewebsite')} className="hidden md:flex text-[#1a56db] dark:text-blue-400 font-bold hover:underline items-center text-sm cursor-pointer">
              Lihat Semua
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {website.map((website: any) => (
              <div key={website.id} onClick={() => router.push(`/morewebsite/${website.id}`)}>
                <WebsiteCard website={website} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Code2 className="text-[#1a56db] dark:text-blue-500" /> Developer Kustom
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Sewa ahli untuk membangun sistem spesifik sesuai permintaanmu.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin mb-3 text-[#1a56db] dark:text-blue-500" />
              <p className="font-medium">Memuat daftar developer...</p>
            </div>
          ) : merchants.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#111111] rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800 shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada developer yang terdaftar di area ini.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {merchants.map((merchant) => (
                <Link href={`/developer/${merchant.id}`} key={merchant.id} className="block outline-none">
                  <MerchantCard merchant={merchant} />
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}