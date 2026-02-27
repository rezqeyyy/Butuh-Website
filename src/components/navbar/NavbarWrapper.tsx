"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Ganti jadi "../../lib/supabase" kalau error
import UserNavbar from "./UserNavbar";
import MerchantNavbar from "./MerchantNavbar";

export default function NavbarWrapper() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Cek dia rolenya apa di tabel profiles
        const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        setRole(data?.role || 'user');
      } else {
        // Kalau belum login, kasih navbar user biasa
        setRole('user');
      }
      setIsLoading(false);
    };

    checkUserRole();
  }, []);

  if (isLoading) return null; // Jangan render apa-apa selama ngecek

  return role === 'merchant' ? <MerchantNavbar /> : <UserNavbar />;
}