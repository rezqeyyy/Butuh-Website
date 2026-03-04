// --- DUMMY DATA UNTUK JUALAN WEBSITE ---
const DUMMY_WEBSITES = [
    { id: 'w1', title: 'Website Company Profile', desc: 'Cocok untuk perusahaan korporat dengan desain elegan, SEO friendly, dan sangat responsif.', price: 1500000, type: 'Landing Page', color: 'from-indigo-500 to-purple-600' },
    { id: 'w2', title: 'Toko Online / E-Commerce', desc: 'Sistem keranjang belanja lengkap, integrasi payment gateway lokal, dan dashboard admin.', price: 3500000, type: 'Full Web App', color: 'from-emerald-400 to-teal-600' },
    { id: 'w3', title: 'Undangan Pernikahan Digital', desc: 'Desain romantis dengan fitur RSVP tamu, galeri pre-wedding, peta lokasi, dan musik latar.', price: 500000, type: 'Mini Web', color: 'from-rose-400 to-red-500' },
    { id: 'w4', title: 'Website Edukasi', desc: 'Desain modern untuk platform edukasi dengan fitur video, materi, dan sistem ujian.', price: 2500000, type: 'Full Web App', color: 'from-emerald-400 to-teal-800' },
    { id: 'w5', title: 'Website Judi Online', desc: 'Responsif dengan popup yang menyala, membangkitkan gairah judi dan mentalitas all in', price: 1500000, type: 'Landing Page', color: 'from-indigo-500 to-purple-600' },
    { id: 'w6', title: 'Website Streaming', desc: 'Cocok untuk perusahaan korporat dengan desain elegan, SEO friendly, dan sangat responsif.', price: 3500000, type: 'Landing Page', color: 'from-rose-400 to-red-500' },
];

export const MoreWebsiteService = {
  // Ambil semua data website
  async getAllWebsite() {
    return DUMMY_WEBSITES;
  },

  async getWebsiteById(id: string) {
    const website = DUMMY_WEBSITES.find((website) => website.id === id);
    return website || null;
  }
};