"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase"; // Sesuaikan path jika perlu
import { UserPlus, Code, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Daftarkan user ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      
      const userId = authData.user?.id;
      if (!userId) throw new Error("Gagal mendapatkan ID User");

      // 2. Simpan data ke tabel profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          full_name: formData.fullName,
          role: formData.role,
        },
      ]);

      if (profileError) throw profileError;

      // 3. Jika rolenya merchant, buatkan juga data kosong di tabel merchants
      if (formData.role === "merchant") {
        const { error: merchantError } = await supabase.from("merchants").insert([
          { id: userId },
        ]);
        if (merchantError) throw merchantError;
      }

      alert("Registrasi berhasil! Silakan login.");
      router.push("/login"); // Arahkan ke halaman login

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
          <p className="text-gray-500 text-sm mt-1">Bergabunglah dengan marketplace website kami</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Minimal 6 karakter" minLength={6} />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Saya mendaftar sebagai:</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border p-3 rounded-lg flex flex-col items-center cursor-pointer transition-all ${formData.role === 'user' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} className="hidden" />
                <User className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Pencari Jasa</span>
              </label>
              
              <label className={`border p-3 rounded-lg flex flex-col items-center cursor-pointer transition-all ${formData.role === 'merchant' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                <input type="radio" name="role" value="merchant" checked={formData.role === 'merchant'} onChange={handleChange} className="hidden" />
                <Code className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Developer</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors mt-4 disabled:opacity-70">
            {isLoading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun? <a href="/login" className="text-blue-600 font-semibold hover:underline">Login di sini</a>
        </p>
      </div>
    </div>
  );
}