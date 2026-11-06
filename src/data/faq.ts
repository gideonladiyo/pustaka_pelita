// DUMMY FAQ (PRD CNT-02). Draft dari PM, perlu ditinjau klien.

export type Faq = { q: string; a: string };

export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "Pembelian & pembayaran",
    items: [
      {
        q: "Apakah saya harus membuat akun untuk membeli?",
        a: "Tidak perlu. Cukup isi nama dan alamat email saat checkout. E-book dan tanda terima dikirim ke email tersebut.",
      },
      {
        q: "Metode pembayaran apa saja yang bisa dipakai?",
        a: "QRIS (bisa dari m-banking atau e-wallet apa pun), transfer virtual account BCA, BNI, BRI, Mandiri, dan Permata, serta GoPay, OVO, DANA, dan ShopeePay.",
      },
      {
        q: "Berapa lama batas waktu pembayaran?",
        a: "Pesanan menunggu pembayaran selama 24 jam. Setelah itu pesanan otomatis dibatalkan dan Anda bisa memesan ulang.",
      },
    ],
  },
  {
    title: "Menerima & mengunduh e-book",
    items: [
      {
        q: "Kapan e-book saya terima?",
        a: "Biasanya kurang dari satu menit setelah pembayaran berhasil. Link unduhan muncul di halaman pesanan dan dikirim ke email Anda.",
      },
      {
        q: "Email tidak masuk, apa yang harus saya lakukan?",
        a: "Periksa folder Spam atau Promosi lebih dulu. Jika tetap tidak ada, gunakan halaman Kirim Ulang Link atau hubungi kami lewat WhatsApp.",
      },
      {
        q: "Berapa kali saya bisa mengunduh?",
        a: "Setiap e-book bisa diunduh hingga 5 kali tanpa batas waktu. Jika batas habis karena ganti HP, hubungi kami dan akan kami bantu.",
      },
      {
        q: "Bisa dibaca di perangkat apa?",
        a: "File berformat PDF, bisa dibuka di HP Android, iPhone, tablet, maupun laptop dengan aplikasi pembaca PDF bawaan.",
      },
    ],
  },
  {
    title: "Lain-lain",
    items: [
      {
        q: "Bolehkah e-book dibagikan atau dicetak untuk kelompok sel?",
        a: "E-book untuk pemakaian pribadi. Untuk kebutuhan kelompok atau gereja, hubungi kami untuk harga lisensi jemaat.",
      },
      {
        q: "Apakah bisa refund?",
        a: "Karena produk digital, refund hanya berlaku jika file rusak atau tidak terkirim dan tidak dapat kami perbaiki. Lihat Kebijakan Refund untuk detailnya.",
      },
    ],
  },
];

export const homeFaq: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[1].items[0],
  faqGroups[1].items[2],
  faqGroups[0].items[1],
];
