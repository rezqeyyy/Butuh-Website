"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { User, Camera, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({ full_name: "" });

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from("profiles").select("*").eq("id", user?.id).single();
      setProfile(data);
    };
    getProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profil Akun</h1>
        <Settings className="text-gray-400" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden text-white">
             {profile.avatar_url ? <img src={profile.avatar_url} /> : <User size={56} />}
          </div>
          <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-gray-100 hover:text-blue-600 transition-all">
            <Camera size={18} />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{profile.full_name || "Memuat..."}</h2>
      </div>

      <div className="space-y-4 pt-4">
        <div className="bg-white p-4 rounded-2xl border shadow-sm">
           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
           <input className="w-full mt-1 font-medium outline-none text-gray-800" value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})} />
        </div>
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
          Simpan Perubahan
        </button>
        <button onClick={handleLogout} className="w-full border-2 border-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all mt-8">
          <LogOut size={18} /> Logout Akun
        </button>
      </div>
    </div>
  );
}