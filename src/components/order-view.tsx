"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowClockwiseIcon,
  CheckCircleIcon,
  DownloadSimpleIcon,
  HourglassMediumIcon,
  MagnifyingGlassIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import { getBook } from "@/data/books";
import { site, whatsappLink } from "@/data/site";
import { useHydrated, useShop, type Order, type OrderStatus } from "@/lib/store";
import { cn, formatDateTime, formatRupiah } from "@/lib/format";
import { DEMO_CODE } from "@/lib/demo";
import { BookCover } from "./book-cover";
import { Countdown, PaymentDialog } from "./payment-dialog";


function demoOrder(): Order {
  const now = Date.now();
  return {
    code: DEMO_CODE,
    token: "demo",
    items: ["berjalan-dalam-terang", "doa-yang-mengubah-hari"].map((slug) => {
      const b = getBook(slug)!;
      return { slug, title: b.title, price: b.price };
    }),
    customer: { name: "Maria Siahaan", email: "maria.siahaan@gmail.com" },
    subtotal: 104000,
    discount: 10400,
    voucher: "PELITA10",
    total: 93600,
    status: "PAID",
    method: "qris",
    methodDetail: "QRIS",
    createdAt: new Date(now - 3 * 60_000).toISOString(),
    expiresAt: new Date(now + 24 * 3_600_000).toISOString(),
    paidAt: new Date(now - 2 * 60_000).toISOString(),
    downloads: { "berjalan-dalam-terang": 1, "doa-yang-mengubah-hari": 0 },
  };
}

export function OrderView({ code }: { code: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const hydrated = useHydrated();
  const order = useShop((s) => s.orders[code]);
  const setOrderStatus = useShop((s) => s.setOrderStatus);
  const registerDownload = useShop((s) => s.registerDownload);
  const addToCart = useShop((s) => s.addToCart);
  const [payOpen, setPayOpen] = useState(false);

  // Seed a shareable demo order so /pesanan/EB-DEMO always works in client reviews
  useEffect(() => {
    if (code === DEMO_CODE && !useShop.getState().orders[DEMO_CODE]) {
      useShop.setState((s) => ({ orders: { ...s.orders, [DEMO_CODE]: demoOrder() } }));
    }
  }, [code]);

  if (!hydrated || (code === DEMO_CODE && !order)) return <OrderSkeleton />;

  const token = params.get("t");
  if (!order || (order.code !== DEMO_CODE && order.token !== token)) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper-2 text-ink-3">
          <MagnifyingGlassIcon size={26} />
        </div>
        <h1 className="mt-5 font-serif text-[2rem] text-ink">Pesanan tidak ditemukan</h1>
        <p className="mt-3 text-ink-2">
          Link pesanan mungkin tidak lengkap. Buka link dari email Anda, atau minta kami mengirim ulang.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/kirim-ulang" className="btn btn-primary">
            Kirim Ulang Link
          </Link>
          <Link href={`/pesanan/${DEMO_CODE}`} className="btn btn-secondary">
            Lihat contoh pesanan
          </Link>
        </div>
      </div>
    );
  }

  const header = {
    PENDING: {
      icon: <HourglassMediumIcon size={28} />,
      tone: "bg-warn-soft text-warn",
      title: "Menunggu pembayaran",
      body: (
        <>
          Selesaikan pembayaran sebelum <strong className="text-ink">{formatDateTime(order.expiresAt)}</strong>. Sisa waktu{" "}
          <Countdown until={order.expiresAt} className="font-semibold text-ink" />.
        </>
      ),
    },
    PAID: {
      icon: <CheckCircleIcon size={28} />,
      tone: "bg-accent-soft text-accent-ink",
      title: "Pembayaran berhasil",
      body: (
        <>
          Terima kasih, {order.customer.name.split(" ")[0]}. Link unduhan juga sudah dikirim ke{" "}
          <strong className="text-ink">{order.customer.email}</strong>.
        </>
      ),
    },
    EXPIRED: {
      icon: <WarningCircleIcon size={28} />,
      tone: "bg-danger-soft text-danger",
      title: "Pesanan kedaluwarsa",
      body: <>Batas waktu pembayaran sudah lewat dan pesanan dibatalkan otomatis. Anda bisa memesan ulang kapan saja.</>,
    },
  }[order.status];

  function download(slug: string, title: string) {
    const used = order!.downloads[slug] ?? 0;
    if (used >= site.downloadLimit) return;
    registerDownload(order!.code, slug);
    toast.success(`Mengunduh ${title}.pdf`, { description: "Simulasi. Di versi final file PDF asli akan terunduh." });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className={cn("grid size-14 place-items-center rounded-full", header.tone)}>{header.icon}</div>
      <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-tight tracking-tight text-ink md:text-5xl">
        {header.title}
      </h1>
      <p className="mt-3 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-2">{header.body}</p>

      {order.status === "PENDING" ? (
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => setPayOpen(true)}>
            Lanjutkan Pembayaran
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toast("Belum ada pembayaran masuk", { description: "Status diperbarui otomatis setelah Anda membayar." })}
          >
            <ArrowClockwiseIcon size={17} /> Cek Status
          </button>
        </div>
      ) : null}

      {order.status === "EXPIRED" ? (
        <button
          type="button"
          className="btn btn-primary mt-7"
          onClick={() => {
            order.items.forEach((i) => addToCart(i.slug));
            router.push("/keranjang");
          }}
        >
          Pesan Ulang
        </button>
      ) : null}

      <section className="mt-12">
        <h2 className="text-[0.9375rem] font-semibold text-ink">
          {order.status === "PAID" ? "E-book Anda" : "Isi pesanan"}
        </h2>
        <ul className="mt-4 border-t border-line">
          {order.items.map((item) => {
            const book = getBook(item.slug);
            const used = order.downloads[item.slug] ?? 0;
            const left = site.downloadLimit - used;
            return (
              <li key={item.slug} className="flex flex-col gap-4 border-b border-line py-5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-4">
                  {book ? <BookCover book={book} compact className="w-14 shrink-0" /> : null}
                  <div className="min-w-0">
                    <p className="font-serif text-[1.25rem] leading-tight text-ink">{item.title}</p>
                    <p className="mt-0.5 text-sm text-ink-3">
                      {order.status === "PAID"
                        ? `PDF, ${book?.fileSizeMb.toLocaleString("id-ID")} MB. Sisa unduhan ${left} dari ${site.downloadLimit}.`
                        : formatRupiah(item.price)}
                    </p>
                  </div>
                </div>
                {order.status === "PAID" ? (
                  left > 0 ? (
                    <button type="button" className="btn btn-primary btn-sm sm:w-auto" onClick={() => download(item.slug, item.title)}>
                      <DownloadSimpleIcon size={17} /> Unduh PDF
                    </button>
                  ) : (
                    <a
                      href={whatsappLink(`Halo, batas unduhan pesanan ${order.code} untuk "${item.title}" sudah habis.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <WhatsappLogoIcon size={17} /> Batas habis, hubungi kami
                    </a>
                  )
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10 grid gap-6 rounded-ui border border-line bg-surface p-6 sm:grid-cols-2">
        <dl className="space-y-3 text-[0.9375rem]">
          <Row label="Nomor pesanan" value={order.code} />
          <Row label="Dibuat" value={formatDateTime(order.createdAt)} />
          {order.paidAt ? <Row label="Dibayar" value={formatDateTime(order.paidAt)} /> : null}
          {order.methodDetail ? <Row label="Metode" value={order.methodDetail} /> : null}
        </dl>
        <dl className="space-y-3 text-[0.9375rem] tabular sm:border-l sm:border-line sm:pl-6">
          <Row label="Subtotal" value={formatRupiah(order.subtotal)} />
          {order.discount > 0 ? <Row label={`Voucher ${order.voucher ?? ""}`} value={`-${formatRupiah(order.discount)}`} /> : null}
          <div className="flex justify-between border-t border-line pt-3">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="font-semibold text-ink">{formatRupiah(order.total)}</dd>
          </div>
        </dl>
      </section>

      {order.status === "PAID" ? (
        <p className="mt-6 text-[0.9375rem] text-ink-2">
          Email belum masuk? Periksa folder Spam atau Promosi, atau{" "}
          <Link href="/kirim-ulang" className="link">
            kirim ulang link unduhan
          </Link>
          .
        </p>
      ) : null}

      <DemoPanel status={order.status} onChange={(s) => setOrderStatus(order.code, s, s === "PAID" ? "qris" : undefined, s === "PAID" ? "QRIS" : undefined)} />

      {order.status === "PENDING" ? (
        <PaymentDialog
          order={order}
          open={payOpen}
          onClose={() => setPayOpen(false)}
          onPaid={(method, detail) => {
            setOrderStatus(order.code, "PAID", method, detail);
            setPayOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-3">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

/** Prototype-only control so the client can preview every order state during review */
function DemoPanel({ status, onChange }: { status: OrderStatus; onChange: (s: OrderStatus) => void }) {
  const options: { value: OrderStatus; label: string }[] = [
    { value: "PENDING", label: "Menunggu" },
    { value: "PAID", label: "Lunas" },
    { value: "EXPIRED", label: "Kedaluwarsa" },
  ];
  return (
    <div className="mt-14 rounded-ui border border-dashed border-line-strong p-4">
      <p className="text-[0.8125rem] font-semibold text-ink-2">Panel demo (hanya di prototype)</p>
      <p className="mt-0.5 text-[0.8125rem] text-ink-3">Ganti status untuk melihat tampilan setiap kondisi pesanan.</p>
      <div className="mt-3 inline-flex overflow-hidden rounded-ui border border-line-strong" role="group" aria-label="Status pesanan demo">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={status === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "px-3.5 py-2 text-sm font-medium transition-colors",
              status === o.value ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className="mx-auto max-w-3xl" aria-hidden>
      <div className="size-14 rounded-full bg-paper-2" />
      <div className="mt-6 h-12 w-2/3 rounded bg-paper-2" />
      <div className="mt-4 h-5 w-full max-w-md rounded bg-paper-2" />
      <div className="mt-12 h-40 rounded-ui bg-paper-2/70" />
    </div>
  );
}
