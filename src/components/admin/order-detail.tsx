"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowCounterClockwiseIcon,
  CopyIcon,
  EnvelopeSimpleIcon,
  ReceiptXIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { AdminOrder } from "@/data/orders";
import { getBook } from "@/data/books";
import { site } from "@/data/site";
import { BookCover } from "@/components/book-cover";
import { Dialog } from "@/components/dialog";
import { Panel, StatusBadge } from "./ui";
import { formatDateTime, formatRupiah } from "@/lib/format";

type Event = { at: string; text: string };

export function OrderDetail({ initial }: { initial: AdminOrder }) {
  const [order, setOrder] = useState(initial);
  const [refundOpen, setRefundOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [extraEvents, setExtraEvents] = useState<Event[]>([]);

  const events: Event[] = [
    { at: order.createdAt, text: "Pesanan dibuat" },
    ...(order.paidAt
      ? [
          { at: order.paidAt, text: `Pembayaran diterima via ${order.method}` },
          { at: new Date(new Date(order.paidAt).getTime() + 20_000).toISOString(), text: `Email link unduhan terkirim ke ${order.customer.email}` },
        ]
      : []),
    ...(order.status === "EXPIRED"
      ? [{ at: new Date(new Date(order.createdAt).getTime() + 86_400_000).toISOString(), text: "Batas pembayaran lewat, pesanan dibatalkan otomatis" }]
      : []),
    ...extraEvents,
  ].sort((a, b) => b.at.localeCompare(a.at));

  const log = (text: string) => setExtraEvents((e) => [...e, { at: new Date().toISOString(), text }]);
  const paid = order.status === "PAID";

  return (
    <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
      <div className="space-y-8">
        <Panel title="E-book dalam pesanan">
          <ul className="divide-y divide-line">
            {order.items.map((it) => {
              const book = getBook(it.slug);
              return (
                <li key={it.slug} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-4">
                    {book ? <BookCover book={book} compact className="w-10 shrink-0 shadow-none" /> : null}
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{it.title}</p>
                      <p className="text-[0.8125rem] text-ink-3 tabular">
                        {formatRupiah(it.price)}
                        {paid ? `, diunduh ${it.downloads} dari ${site.downloadLimit} kali` : ""}
                      </p>
                    </div>
                  </div>
                  {paid ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={it.downloads === 0}
                      onClick={() => {
                        setOrder((o) => ({ ...o, items: o.items.map((x) => (x.slug === it.slug ? { ...x, downloads: 0 } : x)) }));
                        log(`Batas unduhan "${it.title}" direset oleh admin`);
                        toast.success("Batas unduhan direset", { description: it.title });
                      }}
                    >
                      <ArrowCounterClockwiseIcon size={16} /> Reset unduhan
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <dl className="space-y-2 border-t border-line px-5 py-4 text-[0.9375rem] tabular">
            <div className="flex justify-between text-ink-2">
              <dt>Subtotal</dt>
              <dd>{formatRupiah(order.subtotal)}</dd>
            </div>
            {order.discount ? (
              <div className="flex justify-between text-ink-2">
                <dt>Voucher {order.voucher}</dt>
                <dd>-{formatRupiah(order.discount)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between font-semibold text-ink">
              <dt>Total</dt>
              <dd>{formatRupiah(order.total)}</dd>
            </div>
          </dl>
        </Panel>

        <Panel title="Riwayat">
          <ol className="px-5 py-4">
            {events.map((e, i) => (
              <li key={`${e.at}-${i}`} className="relative flex gap-4 pb-5 last:pb-0">
                {i < events.length - 1 ? <span aria-hidden className="absolute left-[5px] top-4 h-full w-px bg-line" /> : null}
                <span aria-hidden className="relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-surface bg-ink-3 ring-1 ring-line-strong" />
                <div>
                  <p className="text-[0.9375rem] text-ink">{e.text}</p>
                  <p className="text-[0.8125rem] text-ink-3">{formatDateTime(e.at)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <div className="space-y-8">
        <Panel title="Status">
          <dl className="space-y-3 px-5 py-4 text-[0.9375rem]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-ink-3">Status</dt>
              <dd aria-live="polite">
                <StatusBadge status={order.status} />
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Metode</dt>
              <dd className="text-ink">{order.method ?? "Belum dibayar"}</dd>
            </div>
            {order.paidAt ? (
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Dibayar</dt>
                <dd className="text-right text-ink">{formatDateTime(order.paidAt)}</dd>
              </div>
            ) : null}
          </dl>
        </Panel>

        <Panel title="Pembeli">
          <dl className="space-y-3 px-5 py-4 text-[0.9375rem]">
            <div>
              <dt className="text-[0.8125rem] text-ink-3">Nama</dt>
              <dd className="text-ink">{order.customer.name}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] text-ink-3">Email</dt>
              <dd className="break-all text-ink">{order.customer.email}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] text-ink-3">WhatsApp</dt>
              <dd className="text-ink">
                {order.customer.phone ? (
                  <a
                    className="inline-flex items-center gap-1.5 hover:underline"
                    href={`https://wa.me/62${order.customer.phone.slice(1)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsappLogoIcon size={16} /> {order.customer.phone}
                  </a>
                ) : (
                  <span className="text-ink-3">Tidak diisi</span>
                )}
              </dd>
            </div>
          </dl>
        </Panel>

        <Panel title="Tindakan">
          <div className="flex flex-col gap-2 p-5">
            <button
              type="button"
              className="btn btn-secondary justify-start"
              disabled={!paid}
              onClick={() => {
                log(`Email link unduhan dikirim ulang ke ${order.customer.email}`);
                toast.success("Email dikirim ulang", { description: order.customer.email });
              }}
            >
              <EnvelopeSimpleIcon size={18} /> Kirim ulang email unduhan
            </button>
            <button
              type="button"
              className="btn btn-secondary justify-start"
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}/pesanan/${order.code}?t=contoh-token`);
                toast.success("Link pesanan disalin", { description: "Bisa ditempel ke chat WhatsApp pembeli." });
              }}
            >
              <CopyIcon size={18} /> Salin link pesanan
            </button>
            <button type="button" className="btn btn-ghost justify-start text-danger hover:!text-danger" disabled={!paid} onClick={() => setRefundOpen(true)}>
              <ReceiptXIcon size={18} /> Tandai refund
            </button>
            {!paid ? <p className="mt-1 text-[0.8125rem] text-ink-3">Sebagian tindakan hanya tersedia untuk pesanan lunas.</p> : null}
          </div>
        </Panel>
      </div>

      <Dialog open={refundOpen} onClose={() => setRefundOpen(false)} title="Tandai pesanan sebagai refund">
        <form
          className="space-y-5 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (reason.trim().length < 5) return;
            setOrder((o) => ({ ...o, status: "REFUNDED" }));
            log(`Ditandai refund: ${reason.trim()}`);
            setRefundOpen(false);
            toast.success("Pesanan ditandai refund", { description: "Akses unduhan pembeli dinonaktifkan." });
          }}
        >
          <p className="text-[0.9375rem] leading-relaxed text-ink-2">
            Akses unduhan untuk <strong className="text-ink">{order.code}</strong> akan dinonaktifkan. Pengembalian dana tetap
            diproses manual di dashboard payment gateway.
          </p>
          <div className="space-y-2">
            <label htmlFor="refund-reason" className="field-label">
              Alasan
            </label>
            <textarea
              id="refund-reason"
              rows={3}
              className="input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: file tidak bisa dibuka di perangkat pembeli"
            />
            <p className="field-help">Minimal 5 karakter, tercatat di riwayat pesanan.</p>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={() => setRefundOpen(false)}>
              Batal
            </button>
            <button type="submit" className="btn btn-danger" disabled={reason.trim().length < 5}>
              Tandai Refund
            </button>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
