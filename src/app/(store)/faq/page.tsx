import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { faqGroups } from "@/data/faq";
import { site, whatsappLink } from "@/data/site";
import { FaqList } from "@/components/faq-list";

export const metadata: Metadata = { title: "Pertanyaan umum" };

export default function FaqPage() {
  return (
    <div className="page-x grid gap-12 pb-24 pt-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:pt-16">
      <div className="md:sticky md:top-24 md:self-start">
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink">Pertanyaan umum</h1>
        <p className="mt-5 max-w-[38ch] leading-relaxed text-ink-2">
          Tidak menemukan jawabannya? Kami membalas pesan WhatsApp {site.contact.hours.toLowerCase()}.
        </p>
        <a
          href={whatsappLink("Halo, saya ingin bertanya tentang e-book di Pustaka Pelita.")}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary mt-7"
        >
          <WhatsappLogoIcon size={20} /> Tanya via WhatsApp
        </a>
        <p className="mt-6 text-[0.9375rem] text-ink-2">
          Sudah membeli tapi link hilang?{" "}
          <Link href="/kirim-ulang" className="link">
            Kirim ulang link
          </Link>
        </p>
      </div>
      <div className="space-y-14">
        {faqGroups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-2 font-serif text-[1.75rem] font-medium text-ink">{g.title}</h2>
            <FaqList items={g.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
