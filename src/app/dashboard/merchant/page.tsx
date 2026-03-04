"use client";

import { Loader2, Wallet, Briefcase, Activity, Settings, User, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMerchantDashboard } from "@/hooks/merchant/useMerchantDashboard";

export default function MerchantDashboardPage() {
  const { dashboardData, isLoading, handleLogout } = useMerchantDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300">
        <Loader2 className="animate-spin text-[#1a56db] w-10 h-10" />
      </div>
    );
  }

  const { profile, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8 px-6">
        
        {/* Header Section */}
        <div className="bg-white dark:bg-[#111111] p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-[#1a56db] to-indigo-500 overflow-hidden shrink-0 border-2 border-white dark:border-zinc-800 shadow-lg">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                  {profile?.full_name?.charAt(0) || "D"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Halo, {profile?.full_name || "Developer"}!
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">Siap menerima pesanan proyek hari ini?</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-2 text-red-500 font-bold bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 px-5 py-3 rounded-xl transition-all"
          >
            <LogOut size={18} /> Keluar
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-[#1a56db] dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <Wallet size={24} />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-xs mb-1">Total Pendapatan</p>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Rp {stats.totalIncome.toLocaleString('id-ID')}
            </h3>
          </div>

          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Activity size={24} />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-xs mb-1">Pesanan Aktif</p>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {stats.activeOrders} Proyek
            </h3>
          </div>

          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={24} />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-xs mb-1">Proyek Selesai</p>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {stats.completedOrders} Proyek
            </h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link href="/orders/merchant" className="group bg-linear-to-br from-[#1a56db] to-indigo-600 p-8 rounded-3xl shadow-lg shadow-blue-500/20 text-white relative overflow-hidden flex justify-between items-center transition-transform hover:scale-[1.02]">
            <div className="relative z-10">
              <h3 className="text-xl font-extrabold mb-2">Kelola Pesanan</h3>
              <p className="text-blue-100 font-medium">Cek kotak masuk klienmu.</p>
            </div>
            <ChevronRight size={32} className="relative z-10 text-blue-200 group-hover:translate-x-2 transition-transform" />
            <div className="absolute -right-8 -bottom-8 opacity-20"><Briefcase size={120} /></div>
          </Link>

          <Link href="/profile/merchant" className="group bg-white dark:bg-[#111111] p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex justify-between items-center transition-transform hover:scale-[1.02] dark:hover:border-zinc-700">
            <div>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-2">Etalase Profil</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Ubah foto, harga, & deskripsi.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#1a56db] dark:group-hover:text-blue-400 group-hover:rotate-45 transition-all">
              <Settings size={24} />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}