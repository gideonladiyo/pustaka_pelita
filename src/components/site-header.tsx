"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ListIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@phosphor-icons/react/ssr";
import { Logo } from "./logo";
import { Dialog } from "./dialog";
import { useHydrated, useShop } from "@/lib/store";
import { cn } from "@/lib/format";

const NAV = [
  { href: "/ebook", label: "Katalog" },
  { href: "/tentang", label: "Penulis" },
  { href: "/cara-beli", label: "Cara Beli" },
  { href: "/faq", label: "Bantuan" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useShop((s) => s.cart.length);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = hydrated ? cartCount : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/85 backdrop-blur-md supports-[not(backdrop-filter:blur(0))]:bg-paper">
      <div className="page-x flex h-16 items-center gap-6">
        <Logo />
        <nav aria-label="Navigasi utama" className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-ui px-3 py-2 text-[0.9375rem] transition-colors",
                  active ? "font-semibold text-ink" : "text-ink-2 hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link href="/ebook#cari" className="btn btn-ghost btn-sm px-2.5" aria-label="Cari e-book">
            <MagnifyingGlassIcon size={21} />
          </Link>
          <Link
            href="/keranjang"
            className="btn btn-ghost btn-sm relative px-2.5"
            aria-label={`Keranjang, ${count} item`}
          >
            <ShoppingBagIcon size={21} />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] font-bold leading-[18px] text-accent-contrast tabular">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="btn btn-ghost btn-sm px-2.5 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
          >
            <ListIcon size={22} />
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <nav className="flex flex-col p-2" aria-label="Navigasi seluler">
          {[{ href: "/", label: "Beranda" }, ...NAV, { href: "/kirim-ulang", label: "Kirim Ulang Link Unduhan" }].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-ui px-4 py-3.5 font-serif text-[1.375rem] text-ink hover:bg-paper-2"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </Dialog>
    </header>
  );
}
