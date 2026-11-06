"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  BankIcon,
  CaretRightIcon,
  CopyIcon,
  InfoIcon,
  QrCodeIcon,
  WalletIcon,
} from "@phosphor-icons/react/ssr";
import type { Order, PaymentMethod } from "@/lib/store";
import { cn, formatRupiah } from "@/lib/format";
import { Dialog } from "./dialog";

/*
  SIMULASI halaman pembayaran untuk prototype.
  Di versi final, pembeli membayar di popup Midtrans Snap (PRD PAY-01/PAY-02); status dikonfirmasi lewat webhook.
*/

const BANKS = ["BCA", "BNI", "BRI", "Mandiri", "Permata"];
const WALLETS = ["GoPay", "OVO", "DANA", "ShopeePay"];

type Step = { kind: "choose" } | { kind: "qris" } | { kind: "va"; bank: string } | { kind: "ewallet"; wallet: string };

function vaNumber(code: string, bank: string) {
  let h = 0;
  for (const ch of code + bank) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `8808 ${String(h).padStart(10, "0").slice(0, 4)} ${String(h * 7).slice(-4).padStart(4, "0")} ${String(h % 9973).padStart(4, "0")}`;
}

export function Countdown({ until, className }: { until: string; className?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, new Date(until).getTime() - now);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return <span className={cn("tabular", className)}>{`${pad(h)}:${pad(m)}:${pad(s)}`}</span>;
}

export function PaymentDialog({
  order,
  open,
  onClose,
  onPaid,
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
  onPaid: (method: PaymentMethod, detail: string) => void;
}) {
  const [step, setStep] = useState<Step>({ kind: "choose" });

  function close() {
    setStep({ kind: "choose" });
    onClose();
  }

  function pay() {
    if (step.kind === "choose") return;
    const method: PaymentMethod = step.kind === "qris" ? "qris" : step.kind === "va" ? "va" : "ewallet";
    const detail = step.kind === "qris" ? "QRIS" : step.kind === "va" ? `Virtual Account ${step.bank}` : step.wallet;
    setStep({ kind: "choose" });
    onPaid(method, detail);
  }

  return (
    <Dialog open={open} onClose={close} title="Pembayaran" className="!w-[min(100%-1.5rem,30rem)]">
      <div className="border-b border-line bg-paper-2/60 px-5 py-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-ink-3">Total pembayaran</span>
          <span className="text-2xl font-semibold tracking-tight text-ink tabular">{formatRupiah(order.total)}</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-4 text-[0.8125rem] text-ink-3">
          <span className="tabular">{order.code}</span>
          <span>
            Bayar dalam <Countdown until={order.expiresAt} className="font-semibold text-ink" />
          </span>
        </div>
      </div>

      <div className="flex gap-2.5 bg-warn-soft px-5 py-3 text-[0.8125rem] leading-snug text-warn">
        <InfoIcon size={18} className="shrink-0" />
        <p>Simulasi prototype. Di versi final, langkah ini memakai halaman pembayaran Midtrans.</p>
      </div>

      <div className="p-5">
        {step.kind === "choose" ? (
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setStep({ kind: "qris" })}
              className="flex w-full items-center gap-4 rounded-ui border border-accent bg-accent-soft/50 p-4 text-left transition-colors hover:bg-accent-soft"
            >
              <QrCodeIcon size={28} className="shrink-0 text-accent-ink" />
              <span className="flex-1">
                <span className="block font-semibold text-ink">QRIS</span>
                <span className="block text-[0.8125rem] text-ink-2">Scan dari m-banking atau e-wallet apa pun</span>
              </span>
              <span className="rounded-[4px] bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-contrast">Disarankan</span>
            </button>

            <MethodGroup icon={<BankIcon size={20} />} title="Transfer Virtual Account">
              {BANKS.map((bank) => (
                <MethodRow key={bank} label={bank} onClick={() => setStep({ kind: "va", bank })} />
              ))}
            </MethodGroup>

            <MethodGroup icon={<WalletIcon size={20} />} title="E-wallet">
              {WALLETS.map((wallet) => (
                <MethodRow key={wallet} label={wallet} onClick={() => setStep({ kind: "ewallet", wallet })} />
              ))}
            </MethodGroup>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink"
              onClick={() => setStep({ kind: "choose" })}
            >
              <ArrowLeftIcon size={16} /> Ganti metode
            </button>

            {step.kind === "qris" ? (
              <div className="text-center">
                <div className="mx-auto w-fit rounded-ui border border-line bg-white p-4">
                  <QRCodeSVG value={`PROTOTYPE-PUSTAKAPELITA-${order.code}-${order.total}`} size={196} level="M" />
                </div>
                <p className="mt-4 text-[0.9375rem] text-ink-2">
                  Buka aplikasi m-banking atau e-wallet, pilih <strong className="text-ink">Scan QR</strong>, lalu pindai kode
                  di atas.
                </p>
              </div>
            ) : null}

            {step.kind === "va" ? (
              <div>
                <p className="text-sm text-ink-3">Nomor Virtual Account {step.bank}</p>
                <div className="mt-2 flex items-center justify-between gap-3 rounded-ui border border-line bg-paper px-4 py-3.5">
                  <span className="text-xl font-semibold tracking-wide text-ink tabular">{vaNumber(order.code, step.bank)}</span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      navigator.clipboard?.writeText(vaNumber(order.code, step.bank).replaceAll(" ", ""));
                      toast.success("Nomor VA disalin");
                    }}
                  >
                    <CopyIcon size={17} /> Salin
                  </button>
                </div>
                <ol className="mt-5 list-decimal space-y-1.5 pl-5 text-[0.9375rem] text-ink-2">
                  <li>Buka m-banking atau ATM {step.bank}.</li>
                  <li>Pilih menu Transfer ke Virtual Account.</li>
                  <li>Masukkan nomor di atas, pastikan nominal {formatRupiah(order.total)}.</li>
                </ol>
              </div>
            ) : null}

            {step.kind === "ewallet" ? (
              <div className="rounded-ui border border-line bg-paper p-5 text-center">
                <WalletIcon size={30} className="mx-auto text-accent-ink" />
                <p className="mt-3 text-[0.9375rem] text-ink-2">
                  Di HP, tombol di bawah akan membuka aplikasi <strong className="text-ink">{step.wallet}</strong> untuk
                  konfirmasi pembayaran.
                </p>
              </div>
            ) : null}

            <button type="button" className="btn btn-primary mt-6 w-full" onClick={pay}>
              Simulasikan Pembayaran Berhasil
            </button>
            <p className="mt-3 text-center text-[0.8125rem] text-ink-3">
              Tombol ini hanya ada di prototype untuk melanjutkan alur.
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
}

function MethodGroup({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-2">
        {icon}
        {title}
      </h3>
      <div className="mt-2 overflow-hidden rounded-ui border border-line">{children}</div>
    </div>
  );
}

function MethodRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between border-b border-line px-4 py-3 text-left text-[0.9375rem] text-ink last:border-b-0 hover:bg-paper-2"
    >
      {label}
      <CaretRightIcon size={16} className="text-ink-3" />
    </button>
  );
}
