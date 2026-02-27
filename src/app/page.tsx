"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Menggunakan alias @ agar clean
import { Search, Code2, ChevronRight, LayoutDashboard, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Komponen Kecil untuk Kerapihan ---
const MerchantCard = ({ merchant, onClick }: { merchant: any; onClick: () => void }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner uppercase">
        {merchant.profiles?.full_name?.charAt(0) || "D"}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {merchant.profiles?.full_name}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Code2 className="w-3.5 h-3.5" /> {merchant.experience_years} Tahun Pengalaman
        </p>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1 italic">
      "{merchant.short_description || "Siap membantu mewujudkan website impian Anda."}"
    </p>
    <div className="border-t pt-4 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Harga Mulai</p>
        <p className="font-extrabold text-blue-600 text-lg">
          Rp {merchant.start_price?.toLocaleString("id-ID")}
        </p>
      </div>
      <button 
        onClick={onClick}
        className="bg-gray-900 text-white p-2 rounded-xl hover:bg-blue-600 transition-all shadow-md active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default function MarketplaceHome() {
  const router = useRouter();
  const [merchants, setMerchants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    fetchMerchants();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchMerchants = async () => {
    try {
      // Query dengan join ke tabel profiles
      const { data, error } = await supabase
        .from("merchants")
        .select(`*, profiles ( full_name, role )`);

      if (error) {
        // Tampilkan error lebih detail di console agar tidak muncul {} kosong
        console.error("Supabase Error:", error.message, "| Hint:", error.hint);
      } else {
        setMerchants(data || []);
      }
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Header & Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Cari Developer Website Terbaik
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 font-medium">
          Temukan developer berpengalaman untuk membangun landing page, e-commerce, hingga sistem kustom.
        </p>
        
        <div className="max-w-xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg p-1">
          <div className="pl-4 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari keahlian (React, Golang, Flutter)..."
            className="w-full px-4 py-3 text-gray-700 outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-bold transition-all">
            Cari
          </button>
        </div>
      </section>

      {/* 2. Daftar Developer Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ChevronRight className="text-blue-600" /> Developer Tersedia
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-2" />
            <p>Memuat daftar developer...</p>
          </div>
        ) : merchants.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner">
            <p className="text-gray-500 font-medium">Belum ada developer yang terdaftar di area ini.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {merchants.map((merchant) => (
              <MerchantCard 
                key={merchant.id} 
                merchant={merchant} 
                onClick={() => router.push(`/merchant/${merchant.id}`)} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}