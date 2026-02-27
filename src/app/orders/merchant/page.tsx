"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; 
import { PlayCircle, CheckCircle, Package, User, ChevronRight, Inbox } from "lucide-react";

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIncomingOrders();
  }, []);

  const fetchIncomingOrders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("gig_orders")
        .select(`*, profiles!user_id(full_name), services(title, price)`)
        .eq("merchant_id", user.id)
        .order("created_at", { ascending: false });
      setOrders(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (orderId: number, newStatus: string) => {
    const { error } = await supabase.from("gig_orders").update({ status: newStatus }).eq("id", orderId);
    if (!error) {
      fetchIncomingOrders(); // Auto refresh tanpa alert berisik
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-blue-600 flex flex-col items-center">
          <Package size={48} className="animate-bounce" />
          <p className="mt-4 font-bold text-slate-500">Mengecek pesanan masuk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 pb-24">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Pesanan</h1>
            <p className="text-slate-500 mt-2 text-lg">Kelola proyek masuk dan perbarui status pengerjaan.</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm border border-blue-200 flex items-center gap-2">
            <Inbox size={18} /> {orders.length} Proyek Masuk
          </div>
        </header>

        <div className="space-y-5">
          {orders.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Inbox size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Kotak Masuk Kosong</h3>
              <p className="text-slate-500 mt-2">Belum ada klien yang memesan jasamu saat ini.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex gap-5 items-center w-full md:w-auto">
                  <div className="p-4 bg-slate-50 rounded-2xl text-slate-500">
                    <Package size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{order.services?.title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1.5">
                      <p className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                        <User size={14} className="text-blue-500" /> {order.profiles?.full_name}
                      </p>
                      <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                      <p className="text-sm font-bold text-slate-700">Rp {order.services?.price?.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <button 
                    onClick={() => updateStatus(order.id, 'proses')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      order.status === 'proses' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
                        : 'bg-transparent text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <PlayCircle size={18} /> {order.status === 'proses' ? 'Sedang Digarap' : 'Proses'}
                  </button>
                  
                  <button 
                    onClick={() => updateStatus(order.id, 'selesai')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      order.status === 'selesai' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' 
                        : 'bg-transparent text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle size={18} /> Selesai
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}