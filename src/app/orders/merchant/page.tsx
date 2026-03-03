"use client";

import { PlayCircle, CheckCircle, Package, User, Inbox } from "lucide-react";
// Import logika dari folder hooks
import { useMerchantOrders } from "@/hooks/merchant/useMerchantOrders";

export default function MerchantOrdersPage() {
  // Panggil semua state dan fungsi yang dibutuhkan
  const { orders, isLoading, updateStatus } = useMerchantOrders();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="animate-pulse text-blue-600 dark:text-blue-500 flex flex-col items-center">
          <Package size={48} className="animate-bounce" />
          <p className="mt-4 font-bold text-slate-500 dark:text-gray-400">Mengecek pesanan masuk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 p-6 md:p-12 pb-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manajemen Pesanan</h1>
            <p className="text-slate-500 dark:text-gray-400 mt-2 text-lg">Kelola proyek masuk dan perbarui status pengerjaan.</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-sm border border-blue-200 dark:border-blue-500/20 flex items-center gap-2 transition-colors">
            <Inbox size={18} /> {orders.length} Proyek Masuk
          </div>
        </header>

        <div className="space-y-5">
          {orders.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#111111] rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm transition-colors">
              <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-gray-500">
                <Inbox size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-gray-200">Kotak Masuk Kosong</h3>
              <p className="text-slate-500 dark:text-gray-400 mt-2">Belum ada klien yang memesan jasamu saat ini.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:border-gray-700 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex gap-5 items-center w-full md:w-auto">
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl text-slate-500 dark:text-gray-400 transition-colors">
                    <Package size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{order.services?.title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1.5">
                      <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400 font-medium">
                        <User size={14} className="text-blue-500 dark:text-blue-400" /> {order.profiles?.full_name}
                      </p>
                      <span className="hidden md:block w-1 h-1 bg-slate-300 dark:bg-gray-700 rounded-full"></span>
                      <p className="text-sm font-bold text-slate-700 dark:text-gray-300">Rp {order.services?.price?.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end p-2 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800 transition-colors">
                  <button 
                    onClick={() => updateStatus(order.id, 'proses')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      order.status === 'proses' 
                        ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
                        : 'bg-transparent text-slate-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                    }`}
                  >
                    <PlayCircle size={18} /> {order.status === 'proses' ? 'Sedang Digarap' : 'Proses'}
                  </button>
                  
                  <button 
                    onClick={() => updateStatus(order.id, 'selesai')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      order.status === 'selesai' 
                        ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' 
                        : 'bg-transparent text-slate-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
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