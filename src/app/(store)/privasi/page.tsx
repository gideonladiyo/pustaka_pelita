import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Kebijakan privasi" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Kebijakan privasi"
      updated="1 Desember 2026"
      sections={[
        {
          heading: "Data yang kami kumpulkan",
          body: [
            "Nama, alamat email, dan nomor WhatsApp (opsional) yang Anda isi saat checkout, serta riwayat pesanan dan unduhan.",
            "Kami tidak menerima maupun menyimpan data kartu atau rekening. Data pembayaran diproses langsung oleh payment gateway.",
          ],
        },
        {
          heading: "Penggunaan data",
          body: [
            "Data dipakai untuk memproses pesanan, mengirim e-book, menjawab pertanyaan Anda, dan memenuhi kewajiban pencatatan transaksi.",
            "Kami tidak mengirim email promosi tanpa persetujuan Anda dan tidak menjual data kepada pihak lain.",
          ],
        },
        {
          heading: "Penyimpanan dan keamanan",
          body: [
            "Data disimpan pada layanan cloud dengan akses terbatas dan koneksi terenkripsi. Data transaksi disimpan selama diperlukan untuk keperluan pembukuan.",
          ],
        },
        {
          heading: "Hak Anda",
          body: [
            `Sesuai UU Pelindungan Data Pribadi, Anda dapat meminta salinan, koreksi, atau penghapusan data pribadi dengan menghubungi ${site.contact.email}.`,
          ],
        },
      ]}
    />
  );
}
