"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; 
import { Clock, CheckCircle, Package, PlayCircle, ChevronRight, LayoutTemplate } from "lucide-react";

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gig_orders")
          .select(`*, services(title, price)`)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setOrders(data || []);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Memuat pesananmu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pesanan Proyek Saya</h1>
          <p className="text-slate-500 mt-2 text-lg">Pantau perkembangan pembuatan website impianmu di sini.</p>
        </header>

        <div className="space-y-5">
          {orders.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <LayoutTemplate size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Belum ada proyek aktif</h3>
              <p className="text-slate-500 mt-2 mb-6">Yuk, cari developer dan mulai bangun websitemu!</p>
              <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Cari Developer Sekarang
              </a>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex gap-5 items-center w-full md:w-auto">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                    <Package size={28} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-xl">{order.services?.title}</h2>
                    <div className="flex items-center gap-3 mt-1.5">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">ID: #{order.id}</p>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <p className="text-sm font-bold text-blue-600">Rp {order.services?.price?.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex justify-end">
                  <span className={`px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2.5 border shadow-sm ${
                    order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200/50' : 
                    order.status === 'proses' ? 'bg-blue-50 text-blue-600 border-blue-200/50' : 
                    'bg-emerald-50 text-emerald-600 border-emerald-200/50'
                  }`}>
                    {order.status === 'pending' ? <Clock size={16} /> : 
                     order.status === 'proses' ? <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span> : 
                     <CheckCircle size={16} />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}