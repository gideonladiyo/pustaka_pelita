// Semua nilai di file ini adalah DUMMY untuk prototype.
// Ganti dengan data asli klien (nama toko, nama pendeta, kontak) setelah Requirements Planning.

export const site = {
  name: "Pustaka Pelita",
  tagline: "Bacaan untuk bertumbuh dalam iman",
  description:
    "Toko e-book renungan, doa, dan studi Alkitab karya Pdt. Elia Wiranata. Bayar dengan QRIS, transfer bank, atau e-wallet, lalu e-book langsung terkirim ke email.",
  author: {
    name: "Pdt. Elia Wiranata",
    shortName: "Pdt. Elia",
    initials: "EW",
    role: "Gembala Sidang dan Penulis",
    shortBio:
      "Melayani sebagai gembala sidang selama lebih dari dua puluh tahun. Tulisannya lahir dari khotbah mingguan, kelas pemuridan, dan percakapan pastoral dengan jemaat.",
  },
  verse: {
    text: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
    ref: "Mazmur 119:105",
  },
  contact: {
    whatsapp: "6281234567890",
    whatsappDisplay: "0812-3456-7890",
    email: "halo@pustakapelita.id",
    hours: "Senin sampai Sabtu, 09.00 - 17.00 WIB",
  },
  downloadLimit: 5,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
