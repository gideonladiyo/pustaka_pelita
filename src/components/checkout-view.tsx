"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LockIcon, TicketIcon, XIcon } from "@phosphor-icons/react/ssr";
import { getBook, type Book } from "@/data/books";
import { applyVoucher } from "@/data/vouchers";
import { useHydrated, useShop, type Order } from "@/lib/store";
import { OrderSummary } from "./order-summary";
import { PaymentDialog } from "./payment-dialog";

type Errors = Partial<Record<"name" | "email" | "phone" | "terms", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function CheckoutView() {
  const params = useSearchParams();
  const router = useRouter();
  const hydrated = useHydrated();
  const cart = useShop((s) => s.cart);
  const createOrder = useShop((s) => s.createOrder);
  const setOrderStatus = useShop((s) => s.setOrderStatus);
  const clearCart = useShop((s) => s.clearCart);

  const directSlug = params.get("item");
  const [form, setForm] = useState({ name: "", email: "", phone: "", terms: false });
  const [errors, setErrors] = useState<Errors>({});
  const [voucherInput, setVoucherInput] = useState("");
  const [voucher, setVoucher] = useState<{ code: string; discount: number } | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  if (!hydrated) return <div className="h-[60dvh] animate-pulse rounded-ui bg-paper-2/60" aria-hidden />;

  const slugs = directSlug ? [directSlug] : cart;
  const items = slugs.map(getBook).filter((b): b is Book => !!b && b.isPublished);
  const subtotal = items.reduce((s, b) => s + b.price, 0);
  // Re-evaluate voucher against the current subtotal (mirrors server-side recalculation, PRD CRT-06)
  const voucherResult = voucher ? applyVoucher(voucher.code, subtotal) : null;
  const discount = voucherResult?.ok ? voucherResult.discount : 0;

  if (items.length === 0 && !order) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <h2 className="font-serif text-[1.75rem] text-ink">Belum ada e-book untuk dibayar</h2>
        <p className="mt-2 text-ink-2">Pilih e-book dari katalog terlebih dahulu.</p>
        <Link href="/ebook" className="btn btn-primary mt-7">
          Lihat Katalog
        </Link>
      </div>
    );
  }

  function validate(): Errors {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Isi nama lengkap Anda.";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Format email belum benar, contoh: nama@gmail.com";
    if (form.phone && !/^(\+62|62|0)8[0-9]{7,12}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Nomor WhatsApp diawali 08 atau +62.";
    if (!form.terms) e.terms = "Centang persetujuan untuk melanjutkan.";
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const created = createOrder({
      slugs: items.map((b) => b.slug),
      customer: { name: form.name.trim(), email: form.email.trim().toLowerCase(), phone: form.phone || undefined },
      discount,
      voucher: voucherResult?.ok ? voucherResult.voucher.code : undefined,
    });
    if (created.total === 0) {
      setOrderStatus(created.code, "PAID", undefined, "Voucher 100%");
      if (!directSlug) clearCart();
      router.push(`/pesanan/${created.code}?t=${created.token}`);
      return;
    }
    setOrder(created);
  }

  function applyCode() {
    const r = applyVoucher(voucherInput, subtotal);
    if (r.ok) {
      setVoucher({ code: r.voucher.code, discount: r.discount });
      setVoucherError("");
      setVoucherInput("");
    } else {
      setVoucherError(r.message);
    }
  }

  const field = (key: "name" | "email" | "phone") => ({
    id: `f-${key}`,
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
    },
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": `f-${key}-msg`,
  });

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <form onSubmit={submit} noValidate className="space-y-10">
          <fieldset>
            <legend className="font-serif text-[1.75rem] font-medium text-ink">Data pembeli</legend>
            <p className="mt-1 text-[0.9375rem] text-ink-2">Tidak perlu membuat akun.</p>
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="f-name" className="field-label">
                  Nama lengkap
                </label>
                <input {...field("name")} className="input" autoComplete="name" />
                <p id="f-name-msg" className="field-error" role="alert">
                  {errors.name}
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="f-email" className="field-label">
                  Email
                </label>
                <input {...field("email")} type="email" inputMode="email" className="input" autoComplete="email" />
                {errors.email ? (
                  <p id="f-email-msg" className="field-error" role="alert">
                    {errors.email}
                  </p>
                ) : (
                  <p id="f-email-msg" className="field-help">
                    E-book dikirim ke alamat ini. Pastikan tidak salah ketik.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="f-phone" className="field-label">
                  Nomor WhatsApp <span className="font-normal text-ink-3">(opsional)</span>
                </label>
                <input {...field("phone")} type="tel" inputMode="tel" className="input" autoComplete="tel" />
                {errors.phone ? (
                  <p id="f-phone-msg" className="field-error" role="alert">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="f-phone-msg" className="field-help">
                    Hanya dipakai jika ada kendala pengiriman.
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="field-label">Kode voucher</legend>
            {voucher && voucherResult?.ok ? (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-ui border border-accent bg-accent-soft/50 px-4 py-3">
                <span className="flex items-center gap-2 text-[0.9375rem] text-ink">
                  <TicketIcon size={19} className="text-accent-ink" />
                  <strong>{voucher.code}</strong> dipakai
                </span>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setVoucher(null)}>
                  <XIcon size={15} /> Lepas
                </button>
              </div>
            ) : (
              <>
                <div className="mt-2 flex gap-2">
                  <input
                    className="input uppercase placeholder:normal-case"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        applyCode();
                      }
                    }}
                    placeholder="Contoh: PELITA10"
                    aria-label="Kode voucher"
                    aria-invalid={voucherError ? true : undefined}
                  />
                  <button type="button" className="btn btn-secondary" onClick={applyCode}>
                    Pakai
                  </button>
                </div>
                {voucherError ? <p className="field-error mt-2">{voucherError}</p> : null}
                {voucher && voucherResult && !voucherResult.ok ? (
                  <p className="field-error mt-2">{voucherResult.message}</p>
                ) : null}
              </>
            )}
          </fieldset>

          <div>
            <label className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
              <input
                id="f-terms"
                type="checkbox"
                checked={form.terms}
                onChange={(e) => {
                  setForm((f) => ({ ...f, terms: e.target.checked }));
                  if (errors.terms) setErrors((x) => ({ ...x, terms: undefined }));
                }}
                className="mt-1 size-[18px] shrink-0 accent-[var(--accent)]"
              />
              <span>
                Saya setuju dengan{" "}
                <Link href="/syarat-ketentuan" target="_blank" className="link">
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link href="/refund" target="_blank" className="link">
                  Kebijakan Refund
                </Link>
                . E-book untuk pemakaian pribadi.
              </span>
            </label>
            {errors.terms ? <p className="field-error mt-2 pl-[30px]">{errors.terms}</p> : null}
          </div>

          <div>
            <button type="submit" className="btn btn-primary h-12 w-full text-base">
              <LockIcon size={18} /> Bayar Sekarang
            </button>
            <p className="mt-3 text-center text-[0.8125rem] text-ink-3">
              QRIS, virtual account, dan e-wallet. Data pembayaran diproses oleh payment gateway berizin.
            </p>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-ui border border-line bg-surface p-6">
            <h2 className="text-[0.9375rem] font-semibold text-ink">Ringkasan pesanan</h2>
            <div className="mt-5">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                discount={discount}
                voucher={voucherResult?.ok ? voucherResult.voucher.code : undefined}
              />
            </div>
          </div>
        </aside>
      </div>

      {order ? (
        <PaymentDialog
          order={order}
          open
          onClose={() => {
            // Closed without paying: order stays PENDING, buyer can continue from the order page
            setOrder(null);
            if (!directSlug) clearCart();
            router.push(`/pesanan/${order.code}?t=${order.token}`);
          }}
          onPaid={(method, detail) => {
            setOrderStatus(order.code, "PAID", method, detail);
            setOrder(null);
            if (!directSlug) clearCart();
            router.push(`/pesanan/${order.code}?t=${order.token}`);
          }}
        />
      ) : null}
    </>
  );
}
