import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Syarat & ketentuan" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Syarat & ketentuan"
      updated="1 Desember 2026"
      sections={[
        {
          heading: "Tentang layanan",
          body: [
            `${site.name} menjual e-book digital karya ${site.author.name}. Dengan melakukan pembelian, Anda menyetujui syarat dan ketentuan ini.`,
          ],
        },
        {
          heading: "Lisensi pemakaian",
          body: [
            "Setiap pembelian memberikan lisensi untuk pemakaian pribadi. E-book tidak boleh diperjualbelikan, diunggah ulang, atau dibagikan kepada pihak lain tanpa izin tertulis.",
            "Untuk pemakaian kelompok sel, persekutuan, atau gereja, silakan hubungi kami untuk lisensi jemaat.",
          ],
        },
        {
          heading: "Pembayaran",
          body: [
            "Pembayaran diproses oleh penyedia payment gateway berizin. Kami tidak menyimpan data kartu, rekening, maupun PIN Anda.",
            "Pesanan yang tidak dibayar dalam 24 jam akan dibatalkan otomatis.",
          ],
        },
        {
          heading: "Pengiriman e-book",
          body: [
            "Link unduhan tersedia di halaman pesanan dan dikirim ke email yang Anda masukkan saat checkout. Setiap e-book dapat diunduh hingga 5 kali.",
            "Kesalahan penulisan email menjadi tanggung jawab pembeli, namun kami akan membantu mengoreksinya bila dihubungi.",
          ],
        },
        {
          heading: "Perubahan ketentuan",
          body: ["Kami dapat memperbarui ketentuan ini sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini."],
        },
      ]}
    />
  );
}
