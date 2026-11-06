"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CaretLeftIcon, CaretRightIcon, FileCsvIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { adminOrders, type AdminOrderStatus } from "@/data/orders";
import { StatusBadge, statusLabel } from "./ui";
import { cn, formatDateTime, formatRupiah } from "@/lib/format";

const TABS: { value: AdminOrderStatus | ""; label: string }[] = [
  { value: "", label: "Semua" },
  { value: "PAID", label: "Lunas" },
  { value: "PENDING", label: "Menunggu" },
  { value: "EXPIRED", label: "Kedaluwarsa" },
  { value: "REFUNDED", label: "Refund" },
];
const PAGE_SIZE = 20;

export function OrderTable() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const status = (params.get("status") ?? "") as AdminOrderStatus | "";
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return adminOrders.filter(
      (o) =>
        (!status || o.status === status) &&
        (!term || [o.code, o.customer.name, o.customer.email].some((f) => f.toLowerCase().includes(term))),
    );
  }, [status, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function exportCsv() {
    const header = ["Nomor pesanan", "Tanggal dibuat", "Tanggal dibayar", "Nama", "Email", "Item", "Subtotal", "Diskon", "Total", "Metode", "Status"];
    const esc = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
    const lines = filtered.map((o) =>
      [
        o.code,
        formatDateTime(o.createdAt),
        o.paidAt ? formatDateTime(o.paidAt) : "",
        o.customer.name,
        o.customer.email,
        o.items.map((i) => i.title).join("; "),
        o.subtotal,
        o.discount,
        o.total,
        o.method ?? "",
        statusLabel(o.status),
      ]
        .map(esc)
        .join(","),
    );
    const blob = new Blob(["﻿" + [header.map(esc).join(","), ...lines].join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: `pesanan-${status || "semua"}.csv` });
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filtered.length} pesanan diekspor ke CSV`);
  }

  return (
    <div className="rounded-ui border border-line bg-surface">
      <div className="flex flex-col gap-3 border-b border-line p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <div className="inline-flex overflow-hidden rounded-ui border border-line-strong" role="group" aria-label="Filter status">
            {TABS.map((t) => (
              <button
                key={t.value || "all"}
                type="button"
                aria-pressed={status === t.value}
                onClick={() => {
                  setPage(1);
                  router.replace(t.value ? `${pathname}?status=${t.value}` : pathname, { scroll: false });
                }}
                className={cn(
                  "whitespace-nowrap px-3.5 py-2 text-sm font-medium transition-colors",
                  status === t.value ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2",
                )}
              >
                {t.label}
                <span className="ml-1.5 tabular opacity-70">
                  {t.value ? adminOrders.filter((o) => o.status === t.value).length : adminOrders.length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <label className="relative flex-1 lg:w-72">
            <span className="sr-only">Cari pesanan</span>
            <MagnifyingGlassIcon size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              className="input h-10 pl-9 text-sm"
              placeholder="Nomor pesanan, nama, atau email"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <button type="button" className="btn btn-secondary btn-sm h-10" onClick={exportCsv}>
            <FileCsvIcon size={18} /> Ekspor
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-[0.9375rem]">
          <thead className="text-[0.8125rem] text-ink-3">
            <tr>
              <th className="px-4 py-3 font-medium">Pesanan</th>
              <th className="px-4 py-3 font-medium">Pembeli</th>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Metode</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.code} className="border-t border-line hover:bg-paper-2/40">
                <td className="px-4 py-3">
                  <Link href={`/admin/pesanan/${o.code}`} className="font-medium text-ink hover:underline tabular">
                    {o.code}
                  </Link>
                  <p className="text-[0.8125rem] text-ink-3">{formatDateTime(o.createdAt)}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-ink">{o.customer.name}</p>
                  <p className="text-[0.8125rem] text-ink-3">{o.customer.email}</p>
                </td>
                <td className="max-w-[220px] px-4 py-3">
                  <p className="truncate text-ink-2">{o.items[0].title}</p>
                  {o.items.length > 1 ? <p className="text-[0.8125rem] text-ink-3">+{o.items.length - 1} e-book lain</p> : null}
                </td>
                <td className="px-4 py-3 text-ink-2">{o.method ?? <span className="text-ink-3">Belum bayar</span>}</td>
                <td className="px-4 py-3 text-right text-ink tabular">{formatRupiah(o.total)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="px-4 py-12 text-center text-ink-3">Tidak ada pesanan yang cocok.</p> : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-ink-3">
        <span className="tabular">
          {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}-{Math.min(current * PAGE_SIZE, filtered.length)} dari {filtered.length}
        </span>
        <div className="flex gap-1">
          <button type="button" className="btn btn-ghost btn-sm px-2" disabled={current <= 1} onClick={() => setPage(current - 1)} aria-label="Halaman sebelumnya">
            <CaretLeftIcon size={16} />
          </button>
          <button type="button" className="btn btn-ghost btn-sm px-2" disabled={current >= pages} onClick={() => setPage(current + 1)} aria-label="Halaman berikutnya">
            <CaretRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
