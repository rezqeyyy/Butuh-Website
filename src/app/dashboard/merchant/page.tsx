"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { Settings, Save, TrendingUp, Briefcase, Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function MerchantDashboard() {
  const [merchantData, setMerchantData] = useState<any>({
    short_description: "",
    start_price: 0,
    experience_years: 0,
    total_projects: 0
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchMerchantProfile();
  }, []);

  const fetchMerchantProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("merchants").select("*").eq("id", user.id).single();
      if (data) setMerchantData(data);
    }
    setLoading(false);
  };

  const handleUpdateProfile = async () => {
    setSaveStatus('saving');
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("merchants").update({
      short_description: merchantData.short_description,
      start_price: merchantData.start_price,
      experience_years: merchantData.experience_years
    }).eq("id", user?.id);
    
    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000); // Pesan sukses hilang otomatis dalam 3 detik
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="flex flex-col items-center gap-3 text-blue-600 dark:text-blue-500">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-medium text-slate-500 dark:text-gray-400">Mempersiapkan Ruang Kerja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 p-6 md:p-12 pb-24 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="text-blue-600 dark:text-blue-500 w-8 h-8" /> Ikhtisar Developer
          </h1>
          <p className="text-slate-500 dark:text-gray-400 mt-2 text-lg">Pantau performa dan atur etalase jasa pembuatan website kamu.</p>
        </header>

        {/* Statistik Ringkas (Bento Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl"><Briefcase size={28} /></div>
            <div>
              <p className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Total Project</p>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{merchantData.total_projects || 0}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-2xl"><Star size={28} /></div>
            <div>
              <p className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Rating</p>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">5.0 <span className="text-sm text-slate-400 dark:text-gray-500 font-medium">/ 5</span></p>
            </div>
          </div>
          {/* Box Gradient Biru tetap dipertahankan karena sudah cocok di kedua mode */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-lg shadow-blue-500/20 text-white flex flex-col justify-center">
            <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Status Profil</p>
            <p className="text-2xl font-extrabold mt-1">Aktif & Publik</p>
          </div>
        </div>

        {/* Form Pengaturan Jasa */}
        <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none space-y-8 transition-colors">
          <div className="border-b border-slate-100 dark:border-gray-800 pb-5">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Settings className="text-slate-400 dark:text-gray-500" size={24} /> Pengaturan Etalase Jasa
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Informasi ini akan ditampilkan ke calon klien di halaman utama.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Harga Mulai Dari (Rp)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 font-bold">Rp</span>
                <input 
                  type="number" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-semibold text-slate-800 dark:text-white"
                  value={merchantData.start_price}
                  onChange={(e) => setMerchantData({...merchantData, start_price: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Pengalaman (Tahun)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-semibold text-slate-800 dark:text-white"
                value={merchantData.experience_years}
                onChange={(e) => setMerchantData({...merchantData, experience_years: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Deskripsi Singkat Keahlian</label>
            <textarea 
              className="w-full p-4 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl h-36 outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-medium text-slate-700 dark:text-white resize-none"
              placeholder="Contoh: Saya adalah Fullstack Developer berpengalaman menggunakan Next.js, Golang, dan Supabase. Siap membantu membuat sistem skala besar..."
              value={merchantData.short_description}
              onChange={(e) => setMerchantData({...merchantData, short_description: e.target.value})}
            />
            <p className="text-xs text-slate-400 dark:text-gray-500 font-medium text-right">Maks. 300 karakter disarankan agar rapi di kartu.</p>
          </div>

          {/* Bagian Tombol dan Status Simpan */}
          <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
            <button 
              onClick={handleUpdateProfile}
              disabled={saveStatus === 'saving'}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saveStatus === 'saving' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saveStatus === 'saving' ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>

            {/* Indikator Status */}
            {saveStatus === 'success' && (
              <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 className="w-5 h-5" /> Profil berhasil diperbarui!
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-500/10 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle className="w-5 h-5" /> Gagal menyimpan perubahan.
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}