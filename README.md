# Pustaka Pelita: prototype toko e-book

Prototype yang bisa diklik untuk review klien (fase User Design, metode RAD).
Semua data masih **dummy** dan pembayaran **disimulasikan**. Dokumen PRD dan tracker ada di folder induk (`../docs`, `../TRACKER.md`), sengaja tidak ikut ter-deploy.

## Menjalankan di lokal

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # cek build produksi sebelum deploy
```

Butuh Node.js 20.9 atau lebih baru.

## Deploy ke Vercel

1. Push folder ini ke repository GitHub baru (root repo = folder `ebook-store`).
2. Di Vercel: **Add New > Project**, pilih repo tersebut. Framework otomatis terdeteksi sebagai Next.js, jadi pengaturan default tidak perlu diubah.
3. Tidak ada environment variable yang dibutuhkan untuk prototype.
4. Bagikan URL preview ke klien bersama `../docs/templates/form-feedback-prototype.md`.

Alternatif tanpa GitHub: `npx vercel` dari folder ini lalu ikuti petunjuknya.

> Toko final bersifat komersial, jadi production wajib memakai **Vercel Pro** (paket Hobby hanya untuk non-komersial). Prototype bebas dipasang di akun mana pun karena belum menerima transaksi nyata. Halaman sudah diberi `noindex` agar tidak muncul di Google.

## Peta halaman untuk review

| Halaman | URL | PRD |
|---|---|---|
| Beranda | `/` | CAT-01 |
| Katalog (cari, filter kategori, urutkan) | `/ebook` | CAT-02..04 |
| Detail e-book + cuplikan | `/ebook/berjalan-dalam-terang` | CAT-05..08 |
| Keranjang | `/keranjang` | CRT-01..02 |
| Checkout + voucher (`PELITA10`, `JEMAAT25`) | `/checkout` | CRT-03..07, PRM-02 |
| Simulasi pembayaran QRIS / VA / e-wallet | tombol **Bayar Sekarang** di checkout | PAY-01..02 |
| Status pesanan + unduh (contoh siap pakai) | `/pesanan/EB-DEMO` | PAY-05..06, DLV-02..04 |
| Kirim ulang link unduhan | `/kirim-ulang` | DLV-05 |
| Penulis, FAQ, Kontak, Cara Beli | `/tentang`, `/faq`, `/kontak`, `/cara-beli` | CNT-01..07 |
| Legal (draft) | `/syarat-ketentuan`, `/privasi`, `/refund` | CNT-03..05 |
| Admin: login (langsung klik Masuk) | `/admin` | ADP-01 |
| Admin: dashboard + grafik omzet | `/admin/dashboard` | ADO-01 |
| Admin: e-book (daftar, tambah, ubah) | `/admin/produk` | ADP-02..06 |
| Admin: kategori | `/admin/kategori` | ADP-05 |
| Admin: pesanan (filter, ekspor CSV, detail, refund) | `/admin/pesanan` | ADO-02..05 |
| Admin: voucher | `/admin/voucher` | PRM-01, PRM-03 |

Di halaman status pesanan ada **Panel demo** untuk mengganti status (Menunggu / Lunas / Kedaluwarsa) saat presentasi.

## Apa yang masih simulasi

| Bagian | Prototype | Versi final (Construction) |
|---|---|---|
| Data e-book | `src/data/books.ts` | Supabase + admin upload |
| Keranjang & pesanan pembeli | `localStorage` browser | Order dibuat di server (CRT-06) |
| Pembayaran | dialog simulasi | Midtrans Snap + webhook (PAY-01..04) |
| Unduh PDF | notifikasi saja | signed URL 60 detik dari storage privat (DLV-03) |
| Email | tidak dikirim | Resend (NTF-02..05) |
| Admin | data dummy, perubahan hilang saat reload | Supabase Auth + database |
| Sampul | sampul tipografis buatan kode | gambar sampul asli dari klien |

## Yang perlu diganti dengan data asli klien

- `src/data/site.ts`: nama toko, nama & bio pendeta, ayat utama, WhatsApp, email. **Semua masih fiktif.**
- `src/data/books.ts`: daftar e-book, harga, deskripsi, daftar isi, cuplikan.
- `src/components/author-portrait.tsx`: foto pendeta (rasio 4:5).
- `src/data/faq.ts` dan halaman legal: tinjau isi bersama klien.

## Design system

- Palet "Forest": kertas netral kehijauan, tinta hijau-hitam, satu aksen evergreen. Mode terang dan gelap mengikuti pengaturan perangkat.
- Tipografi: EB Garamond (judul & bacaan, tradisi huruf Alkitab cetak) + Plus Jakarta Sans (antarmuka).
- Radius: 6px untuk semua kontrol & panel, 2px untuk sampul buku.
- Token ada di `src/app/globals.css`.
