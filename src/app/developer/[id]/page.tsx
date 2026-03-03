"use client";

import { useParams, useRouter } from "next/navigation";
import { User, ArrowLeft, MessageSquare, Briefcase, Star, Clock, ShieldCheck, Code2, CheckCircle2, Loader2, ShoppingCart } from "lucide-react";
// Import logika dari folder hooks
import { useDeveloperDetail } from "@/hooks/developer/useDeveloperDetail";

export default function DeveloperDetailPage() {
  const params = useParams();
  const router = useRouter();
  const developerId = params.id as string;

  // Panggil data dan fungsi dari custom hook
  const { developer, loading, isProcessing, handleChat, handleOrder } = useDeveloperDetail(developerId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1a56db]" />
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Developer tidak ditemukan</h1>
        <button onClick={() => router.back()} className="text-[#1a56db] hover:underline font-medium">Kembali</button>
      </div>
    );
  }

  const skills = ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Supabase", "UI/UX Design"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-6 pb-24 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group font-medium"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali ke Pencarian
        </button>

        <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>

          <div className="shrink-0 relative">
            <div className="w-32 h-32 rounded-2xl bg-linear-to-tr from-[#1a56db] to-indigo-500 p-1">
              <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
                {developer.avatar_url ? (
                  <img src={developer.avatar_url} alt={developer.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-gray-400">{developer.full_name?.charAt(0) || "D"}</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white dark:border-[#111111]" title="Developer Terverifikasi">
              <ShieldCheck size={18} />
            </div>
          </div>

          <div className="flex-1 space-y-4 z-10">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{developer.full_name}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 mt-1">
                <Code2 size={16} /> Fullstack Web Developer
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-800">
                <Star className="text-amber-400 fill-amber-400" size={16} />
                <span className="font-bold text-gray-900 dark:text-white">5.0 <span className="text-gray-400 font-normal">/ 5</span></span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-800">
                <Briefcase className="text-blue-500" size={16} />
                <span className="font-bold text-gray-900 dark:text-white">{developer.total_projects || 0} <span className="text-gray-400 font-normal">Proyek</span></span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-zinc-800">
                <Clock className="text-emerald-500" size={16} />
                <span className="font-bold text-gray-900 dark:text-white">{developer.experience_years || 0} Tahun <span className="text-gray-400 font-normal">Pengalaman</span></span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-5 border border-gray-100 dark:border-zinc-800 shrink-0 z-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tarif Mulai Dari</p>
              <p className="text-2xl font-extrabold text-[#1a56db] dark:text-blue-400">
                Rp {developer.start_price?.toLocaleString('id-ID') || 0}
              </p>
            </div>
            
            <div className="space-y-3 mt-6">
              <button 
                onClick={handleOrder}
                disabled={isProcessing}
                className="w-full bg-[#1a56db] hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-70"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart size={18} />} 
                {isProcessing ? "Memproses..." : "Pesan Jasa"}
              </button>
              
              <button 
                onClick={handleChat}
                disabled={isProcessing}
                className="w-full bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
              >
                <MessageSquare size={18} /> Chat Developer
              </button>
            </div>
          </div>

        </div>

        {/* Bawah: Deskripsi & Skill */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User size={20} className="text-[#1a56db]" /> Tentang Saya
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {developer.short_description || "Developer ini belum menuliskan deskripsi tentang jasanya. Namun, pengalamannya siap membantu mewujudkan proyek impianmu!"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#111111] rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Keahlian & Stack</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" /> {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}