"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase"; // Pastikan path ini sesuai dengan letak folder lib-mu
import { Send, CheckCircle2, Code2, MonitorSmartphone } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);

    // Mengirim data ke tabel 'orders' di Supabase
    const { error } = await supabase.from("orders").insert([
      {
        name: formData.name,
        email: formData.email,
        description: formData.description,
      },
    ]);

    if (error) {
      alert("Gagal mengirim pesanan: " + error.message);
    } else {
      setIsSuccess(true);
      setFormData({ name: "", email: "", description: "" }); // Reset form
      setTimeout(() => setIsSuccess(false), 5000); // Sembunyikan pesan sukses setelah 5 detik
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Bagian Teks & Info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Wujudkan Website Impianmu Sekarang.
          </h1>
          <p className="text-lg text-gray-600">
            Platform pembuatan website profesional. Dari landing page hingga sistem kompleks, kami siap membantu membangun presensi digitalmu.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Code2 className="text-blue-600" />
              <span className="font-medium">Clean Code & High Performance</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MonitorSmartphone className="text-blue-600" />
              <span className="font-medium">Responsive di Semua Perangkat</span>
            </div>
          </div>
        </div>

        {/* Bagian Form Pesanan */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mulai Pesan Website</h2>
          
          {isSuccess ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6" />
              <p className="font-medium">Pesanan berhasil dikirim! Kami akan segera menghubungi Anda.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kebutuhan Website</label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Saya butuh website toko online dengan fitur..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? "Mengirim..." : "Kirim Pesanan"}
              {!isLoading && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}