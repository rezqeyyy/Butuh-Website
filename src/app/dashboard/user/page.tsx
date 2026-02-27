// app/dashboard/user/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// GUNAKAN INI: Karena folder 'lib' sejajar dengan 'app'
import { supabase } from "../../../lib/supabase"; 
import { ShoppingBag, Clock, CheckCircle, User, LogOut, Home } from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserAndFetchOrders();
  }, []);

  const checkUserAndFetchOrders = async () => {
    // 1. Pastikan user sudah login
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Ambil nama user dari profil
    const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
    if (profile) setUserName(profile.full_name);

    // 2. Ambil riwayat pesanan
    const { data: ordersData, error } = await supabase
      .from("gig_orders")
      .select(`
        id, status, created_at,
        services ( title, price )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && ordersData) {
      setOrders(ordersData);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profil Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Halo, {userName}!</h1>
              <p className="text-gray-500">Selamat datang di Dashboard Pelanggan.</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-50 p-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>

        {/* Tabel Pesanan */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b flex items-center gap-2 bg-gray-50">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-bold text-gray-900">Riwayat Pesanan Saya</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                Kamu belum memesan jasa apapun. <br/>
                <a href="/" className="text-blue-600 hover:underline mt-2 inline-block font-semibold">Cari developer sekarang</a>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Order #{order.id} • {new Date(order.created_at).toLocaleDateString('id-ID')}
                    </p>
                    <h3 className="font-bold text-gray-900 text-lg">{order.services?.title}</h3>
                    <p className="font-bold text-blue-600 mt-1">
                      Rp {order.services?.price?.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 w-max ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      order.status === 'proses' ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {order.status === 'pending' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}