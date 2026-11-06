import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cara pembelian" };

const STEPS = [
  {
    title: "Pilih e-book",
    body: "Buka katalog, baca deskripsi dan daftar isinya. Sebagian e-book menyediakan cuplikan bab pertama. Klik Beli Sekarang, atau tambahkan beberapa e-book ke keranjang.",
  },
  {
    title: "Isi nama dan email",
    body: "Tidak perlu membuat akun. Pastikan email benar karena e-book dikirim ke alamat tersebut. Punya kode voucher? Masukkan di halaman checkout.",
  },
  {
    title: "Bayar",
    body: "Pilih QRIS, transfer virtual account (BCA, BNI, BRI, Mandiri, Permata), atau e-wallet (GoPay, OVO, DANA, ShopeePay). Batas waktu pembayaran 24 jam.",
  },
  {
    title: "Unduh",
    body: "Setelah pembayaran berhasil, tombol unduh langsung muncul dan link yang sama dikirim ke email Anda. Setiap e-book bisa diunduh hingga 5 kali.",
  },
];

export default function HowToBuyPage() {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <h1 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">Cara pembelian</h1>
      <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-2">
        Dari memilih sampai membaca biasanya tidak sampai lima menit.
      </p>
      <ol className="mt-14 max-w-3xl">
        {STEPS.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-5 border-t border-line py-8 md:grid-cols-[5rem_1fr]">
            <span className="font-serif text-4xl leading-none text-ink-3 md:text-5xl">{i + 1}</span>
            <div>
              <h2 className="text-xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-2 max-w-[60ch] leading-relaxed text-ink-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/ebook" className="btn btn-primary">
          Lihat Katalog
        </Link>
        <Link href="/faq" className="btn btn-secondary">
          Pertanyaan umum
        </Link>
      </div>
    </div>
  );
}
