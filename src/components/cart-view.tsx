"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ShoppingBagIcon, TrashIcon } from "@phosphor-icons/react/ssr";
import { getBook, type Book } from "@/data/books";
import { useHydrated, useShop } from "@/lib/store";
import { formatRupiah } from "@/lib/format";
import { BookCover } from "./book-cover";

export function CartView() {
  const hydrated = useHydrated();
  const cart = useShop((s) => s.cart);
  const remove = useShop((s) => s.removeFromCart);
  const addToCart = useShop((s) => s.addToCart);

  if (!hydrated) return <CartSkeleton />;

  const items = cart.map(getBook).filter((b): b is Book => !!b && b.isPublished);
  const subtotal = items.reduce((s, b) => s + b.price, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper-2 text-ink-3">
          <ShoppingBagIcon size={26} />
        </div>
        <h2 className="mt-5 font-serif text-[1.75rem] text-ink">Keranjang masih kosong</h2>
        <p className="mt-2 text-ink-2">Pilih e-book dari katalog. Anda bisa membeli beberapa sekaligus dalam satu pembayaran.</p>
        <Link href="/ebook" className="btn btn-primary mt-7">
          Lihat Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <ul className="border-t border-line">
        {items.map((b) => (
          <li key={b.slug} className="flex gap-5 border-b border-line py-6">
            <Link href={`/ebook/${b.slug}`} className="w-20 shrink-0 sm:w-24">
              <BookCover book={b} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link href={`/ebook/${b.slug}`} className="font-serif text-[1.375rem] leading-tight text-ink hover:underline">
                {b.title}
              </Link>
              <p className="mt-1 text-sm text-ink-3">
                {b.author}, PDF {b.pages} halaman
              </p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                <span className="font-semibold text-ink tabular">{formatRupiah(b.price)}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm -mr-2"
                  onClick={() => {
                    remove(b.slug);
                    toast("Dihapus dari keranjang", {
                      description: b.title,
                      action: { label: "Urungkan", onClick: () => addToCart(b.slug) },
                    });
                  }}
                >
                  <TrashIcon size={17} /> Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-ui border border-line bg-surface p-6">
          <h2 className="text-[0.9375rem] font-semibold text-ink">Ringkasan</h2>
          <dl className="mt-5 space-y-2.5 text-[0.9375rem] tabular">
            <div className="flex justify-between text-ink-2">
              <dt>{items.length} e-book</dt>
              <dd>{formatRupiah(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3.5">
              <dt className="font-semibold text-ink">Subtotal</dt>
              <dd className="text-xl font-semibold tracking-tight text-ink">{formatRupiah(subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[0.8125rem] text-ink-3">Kode voucher bisa dimasukkan di langkah berikutnya.</p>
          <Link href="/checkout" className="btn btn-primary mt-6 w-full">
            Lanjut ke Checkout
          </Link>
          <Link href="/ebook" className="btn btn-ghost mt-2 w-full">
            Tambah e-book lain
          </Link>
        </div>
      </aside>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]" aria-hidden>
      <div className="space-y-6 border-t border-line pt-6">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-5">
            <div className="aspect-[2/3] w-24 animate-pulse rounded-book bg-paper-2" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-6 w-2/3 rounded bg-paper-2" />
              <div className="h-4 w-1/3 rounded bg-paper-2" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-64 rounded-ui bg-paper-2" />
    </div>
  );
}
