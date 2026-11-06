import type { Metadata } from "next";
import { ResendForm } from "@/components/resend-form";

export const metadata: Metadata = { title: "Kirim ulang link unduhan" };

export default function ResendPage() {
  return (
    <div className="page-x grid gap-12 pb-24 pt-12 md:grid-cols-[1fr_1fr] md:gap-20 md:pt-20">
      <div>
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink">Kirim ulang link unduhan</h1>
        <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2">
          Masukkan email yang Anda pakai saat membeli. Kami akan mengirim ulang link untuk semua pesanan yang sudah dibayar.
        </p>
      </div>
      <ResendForm />
    </div>
  );
}
