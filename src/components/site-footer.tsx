import Link from "next/link";
import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import { Logo } from "./logo";
import { site, whatsappLink } from "@/data/site";

const GROUPS = [
  {
    title: "Belanja",
    links: [
      { href: "/ebook", label: "Katalog e-book" },
      { href: "/cara-beli", label: "Cara pembelian" },
      { href: "/kirim-ulang", label: "Kirim ulang link unduhan" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { href: "/tentang", label: "Tentang penulis" },
      { href: "/faq", label: "Pertanyaan umum" },
      { href: "/kontak", label: "Kontak" },
    ],
  },
  {
    title: "Kebijakan",
    links: [
      { href: "/syarat-ketentuan", label: "Syarat & ketentuan" },
      { href: "/privasi", label: "Kebijakan privasi" },
      { href: "/refund", label: "Kebijakan refund" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-2/60">
      <div className="page-x grid gap-12 py-14 md:grid-cols-[1.3fr_2fr] md:py-16">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
            E-book renungan, doa, dan studi Alkitab karya {site.author.name}. Dibayar sekali, bisa dibaca kapan saja.
          </p>
          <a
            href={whatsappLink("Halo, saya ingin bertanya tentang e-book di Pustaka Pelita.")}
            className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-accent-ink hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappLogoIcon size={20} weight="fill" />
            {site.contact.whatsappDisplay}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="text-sm font-semibold text-ink">{g.title}</h2>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.9375rem] text-ink-2 hover:text-ink" prefetch={false}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="page-x flex flex-col gap-2 py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {site.name}</p>
          <p>Pembayaran melalui QRIS, transfer bank, dan e-wallet.</p>
        </div>
      </div>
    </footer>
  );
}
