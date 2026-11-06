import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Kebijakan refund" };

export default function RefundPage() {
  return (
    <LegalPage
      title="Kebijakan refund"
      updated="1 Desember 2026"
      sections={[
        {
          heading: "Prinsip umum",
          body: [
            "Karena e-book adalah produk digital yang langsung dapat diunduh, pembelian pada dasarnya tidak dapat dibatalkan setelah pembayaran berhasil.",
          ],
        },
        {
          heading: "Kondisi yang dapat direfund",
          body: [
            "File rusak atau tidak dapat dibuka, dan kami tidak dapat mengirimkan file pengganti dalam 3 hari kerja.",
            "E-book tidak terkirim sama sekali meskipun pembayaran sudah berhasil, dan masalah tidak dapat kami selesaikan.",
            "Terjadi pembayaran ganda untuk pesanan yang sama.",
          ],
        },
        {
          heading: "Cara mengajukan",
          body: [
            `Hubungi WhatsApp ${site.contact.whatsappDisplay} atau email ${site.contact.email} dengan menyertakan nomor pesanan. Refund diproses ke metode pembayaran semula dalam 7 sampai 14 hari kerja.`,
            "Setelah refund diproses, akses unduhan untuk pesanan tersebut akan dinonaktifkan.",
          ],
        },
      ]}
    />
  );
}
