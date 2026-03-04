"use client";

import { Clock, CheckCircle, Package, LayoutTemplate, Loader2 } from "lucide-react";
import Link from "next/link";
// Import logika dari folder hooks
import { useUserOrders } from "@/hooks/user/useUserOrders";

export default function UserOrdersPage() {
  // Panggil data dari custom hook
  const { orders, isLoading } = useUserOrders();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-500 animate-spin" />
          <p className="text-slate-500 dark:text-gray-400 font-medium">Memuat pesananmu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 p-6 md:p-12 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Pesanan Proyek Saya</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-2 text-lg">Pantau perkembangan pembuatan website impianmu di sini.</p>
        </header>

        <div className="space-y-5">
          {orders.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#111111] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col items-center transition-colors">
              <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-slate-300 dark:text-gray-500">
                <LayoutTemplate size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-white">Belum ada proyek aktif</h3>
              <p className="text-slate-500 dark:text-gray-400 mt-2 mb-6">Yuk, cari developer dan mulai bangun websitemu!</p>
              <Link 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Cari Developer Sekarang
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:border-gray-700 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex gap-5 items-center w-full md:w-auto">
                  <div className="p-4 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Package size={28} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-xl">{order.services?.title}</h2>
                    <div className="flex items-center gap-3 mt-1.5">
                      <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase tracking-wider">ID: #{order.id}</p>
                      <span className="w-1 h-1 bg-slate-300 dark:bg-gray-700 rounded-full"></span>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Rp {order.services?.price?.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex justify-end">
                  <span className={`px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2.5 border shadow-sm transition-colors ${
                    order.status === 'pending' 
                      ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20' 
                      : order.status === 'proses' 
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-500/20' 
                      : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20'
                  }`}>
                    {order.status === 'pending' ? <Clock size={16} /> : 
                     order.status === 'proses' ? (
                       <span className="relative flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 dark:bg-blue-400"></span>
                       </span>
                     ) : <CheckCircle size={16} />}
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