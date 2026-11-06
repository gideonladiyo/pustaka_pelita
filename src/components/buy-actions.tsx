"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpenTextIcon, CheckIcon, ShoppingBagIcon } from "@phosphor-icons/react/ssr";
import type { Book } from "@/data/books";
import { useHydrated, useShop } from "@/lib/store";
import { formatRupiah } from "@/lib/format";
import { Dialog } from "./dialog";

export function BuyActions({ slug, title }: { slug: string; title: string }) {
  const hydrated = useHydrated();
  const inCart = useShop((s) => s.cart.includes(slug));
  const addToCart = useShop((s) => s.addToCart);
  const router = useRouter();
  const showInCart = hydrated && inCart;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link href={`/checkout?item=${slug}`} className="btn btn-primary sm:min-w-48">
        Beli Sekarang
      </Link>
      {showInCart ? (
        <Link href="/keranjang" className="btn btn-secondary">
          <CheckIcon size={18} /> Ada di keranjang
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            addToCart(slug);
            toast.success("Ditambahkan ke keranjang", {
              description: title,
              action: { label: "Lihat", onClick: () => router.push("/keranjang") },
            });
          }}
        >
          <ShoppingBagIcon size={18} /> Tambah ke Keranjang
        </button>
      )}
    </div>
  );
}

export function MobileBuyBar({ slug, price }: { slug: string; price: number }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md md:hidden">
      <div className="page-x flex items-center justify-between gap-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <span className="text-lg font-semibold text-ink tabular">{formatRupiah(price)}</span>
        <Link href={`/checkout?item=${slug}`} className="btn btn-primary flex-1">
          Beli Sekarang
        </Link>
      </div>
    </div>
  );
}

export function SampleButton({ book }: { book: Pick<Book, "title" | "sample" | "slug"> }) {
  const [open, setOpen] = useState(false);
  if (!book.sample) return null;
  return (
    <>
      <button type="button" className="btn btn-secondary w-full" onClick={() => setOpen(true)}>
        <BookOpenTextIcon size={19} /> Baca Cuplikan
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title={`Cuplikan: ${book.title}`} className="!w-[min(100%-1.5rem,44rem)]">
        <article className="px-6 pb-8 pt-6 sm:px-12 sm:pb-12 sm:pt-10">
          <p className="text-sm text-ink-3">{book.title}</p>
          <h3 className="mt-2 font-serif text-[1.875rem] font-medium leading-tight text-ink">{book.sample.chapter}</h3>
          <div className="prose-reading mt-6">
            {book.sample.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-3">Cuplikan dari bagian awal buku.</p>
            <Link href={`/checkout?item=${book.slug}`} className="btn btn-primary">
              Beli Sekarang
            </Link>
          </div>
        </article>
      </Dialog>
    </>
  );
}
