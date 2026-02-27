// src/app/layout.tsx
import "./globals.css";
import NavbarWrapper from "@/components/navbar/NavbarWrapper"; // Memanggil otak pemilih navbar

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 pb-20 md:pb-0 md:pt-16">
        
        {/* Navbar dipanggil di sini. Dia akan mikir sendiri nampilin versi Merchant atau User */}
        <NavbarWrapper />

        {/* Konten Utama */}
        <main className="min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}