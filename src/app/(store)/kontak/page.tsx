import type { Metadata } from "next";
import { ClockIcon, EnvelopeSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = { title: "Kontak" };

export default function ContactPage() {
  const rows = [
    {
      icon: WhatsappLogoIcon,
      label: "WhatsApp",
      value: site.contact.whatsappDisplay,
      href: whatsappLink("Halo, saya ingin bertanya tentang e-book di Pustaka Pelita."),
    },
    { icon: EnvelopeSimpleIcon, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: ClockIcon, label: "Jam layanan", value: site.contact.hours },
  ];
  return (
    <div className="page-x pb-24 pt-12 md:pt-20">
      <h1 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">Kontak</h1>
      <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-2">
        Untuk pertanyaan pesanan, lisensi kelompok sel atau gereja, maupun undangan pelayanan.
      </p>
      <dl className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-ui border border-line bg-line sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="bg-surface p-6">
            <r.icon size={24} className="text-accent-ink" />
            <dt className="mt-4 text-sm text-ink-3">{r.label}</dt>
            <dd className="mt-1 font-semibold text-ink">
              {r.href ? (
                <a href={r.href} className="hover:underline" target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
