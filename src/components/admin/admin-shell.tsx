"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowSquareOutIcon,
  BooksIcon,
  FolderSimpleIcon,
  ListIcon,
  ReceiptIcon,
  SignOutIcon,
  SquaresFourIcon,
  TicketIcon,
} from "@phosphor-icons/react/ssr";
import { Logo } from "@/components/logo";
import { Dialog } from "@/components/dialog";
import { cn } from "@/lib/format";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: SquaresFourIcon },
  { href: "/admin/produk", label: "E-book", icon: BooksIcon },
  { href: "/admin/kategori", label: "Kategori", icon: FolderSimpleIcon },
  { href: "/admin/pesanan", label: "Pesanan", icon: ReceiptIcon },
  { href: "/admin/voucher", label: "Voucher", icon: TicketIcon },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Menu admin">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-ui px-3 py-2.5 text-[0.9375rem] transition-colors",
              active ? "bg-paper-2 font-semibold text-ink" : "text-ink-2 hover:bg-paper-2/60 hover:text-ink",
            )}
          >
            <item.icon size={20} weight={active ? "fill" : "regular"} className={active ? "text-accent-ink" : ""} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-col gap-0.5 border-t border-line pt-4">
      <Link href="/" target="_blank" className="flex items-center gap-3 rounded-ui px-3 py-2.5 text-[0.9375rem] text-ink-2 hover:bg-paper-2/60 hover:text-ink">
        <ArrowSquareOutIcon size={20} /> Lihat toko
      </Link>
      <Link href="/admin" className="flex items-center gap-3 rounded-ui px-3 py-2.5 text-[0.9375rem] text-ink-2 hover:bg-paper-2/60 hover:text-ink">
        <SignOutIcon size={20} /> Keluar
      </Link>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface px-4 py-5 lg:flex">
        <div className="px-2">
          <Logo href="/admin/dashboard" />
          <p className="mt-1.5 text-[0.8125rem] text-ink-3">Panel admin</p>
        </div>
        <div className="mt-8 flex-1">
          <NavLinks />
        </div>
        <FooterLinks />
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur-md lg:hidden">
        <Logo href="/admin/dashboard" />
        <button type="button" className="btn btn-ghost btn-sm px-2" onClick={() => setOpen(true)} aria-label="Buka menu admin">
          <ListIcon size={22} />
        </button>
      </header>
      <Dialog open={open} onClose={() => setOpen(false)} title="Menu admin">
        <div className="space-y-4 p-3">
          <NavLinks onNavigate={() => setOpen(false)} />
          <FooterLinks />
        </div>
      </Dialog>

      <div className="min-w-0">
        <div className="border-b border-warn/20 bg-warn-soft px-5 py-2 text-[0.8125rem] text-warn md:px-8">
          Mode demo: data pesanan dummy dan perubahan tidak disimpan permanen.
        </div>
        <main className="px-5 pb-20 pt-8 md:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
