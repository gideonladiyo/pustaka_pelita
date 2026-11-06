import type { Book } from "@/data/books";
import { BookCover } from "./book-cover";
import { formatRupiah } from "@/lib/format";

export function OrderSummary({
  items,
  subtotal,
  discount,
  voucher,
}: {
  items: Book[];
  subtotal: number;
  discount: number;
  voucher?: string;
}) {
  const total = Math.max(0, subtotal - discount);
  return (
    <div>
      <ul className="space-y-4">
        {items.map((b) => (
          <li key={b.slug} className="flex items-center gap-4">
            <BookCover book={b} compact className="w-12 shrink-0 shadow-none" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-[1.0625rem] leading-tight text-ink">{b.title}</p>
              <p className="text-[0.8125rem] text-ink-3">PDF, {b.pages} halaman</p>
            </div>
            <span className="text-[0.9375rem] font-semibold text-ink tabular">{formatRupiah(b.price)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.9375rem] tabular">
        <div className="flex justify-between text-ink-2">
          <dt>Subtotal</dt>
          <dd>{formatRupiah(subtotal)}</dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-accent-ink">
            <dt>Voucher {voucher}</dt>
            <dd>-{formatRupiah(discount)}</dd>
          </div>
        ) : null}
        <div className="flex items-baseline justify-between border-t border-line pt-3.5">
          <dt className="font-semibold text-ink">Total</dt>
          <dd className="text-xl font-semibold tracking-tight text-ink">{formatRupiah(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
