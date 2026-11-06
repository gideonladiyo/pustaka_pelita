"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MagnifyingGlassIcon, PencilSimpleIcon } from "@phosphor-icons/react/ssr";
import { books, getCategory } from "@/data/books";
import { BookCover } from "@/components/book-cover";
import { Switch } from "./ui";
import { cn, formatDate, formatRupiah } from "@/lib/format";

type Filter = "all" | "published" | "draft";

export function ProductTable() {
  // Prototype: toggles live in memory only
  const [rows, setRows] = useState(() => books.map((b) => ({ ...b })));
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter(
      (b) =>
        (filter === "all" || (filter === "published" ? b.isPublished : !b.isPublished)) &&
        (!term || b.title.toLowerCase().includes(term)),
    );
  }, [rows, q, filter]);

  function toggle(slug: string, key: "isPublished" | "featured", value: boolean) {
    setRows((r) => r.map((b) => (b.slug === slug ? { ...b, [key]: value } : b)));
    const title = rows.find((b) => b.slug === slug)?.title;
    toast.success(
      key === "isPublished" ? (value ? "E-book diterbitkan" : "E-book disembunyikan dari toko") : value ? "Ditandai unggulan" : "Dihapus dari unggulan",
      { description: title },
    );
  }

  const counts = {
    all: rows.length,
    published: rows.filter((b) => b.isPublished).length,
    draft: rows.filter((b) => !b.isPublished).length,
  };

  return (
    <div className="rounded-ui border border-line bg-surface">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex overflow-hidden rounded-ui border border-line-strong" role="group" aria-label="Filter status">
          {(
            [
              ["all", "Semua"],
              ["published", "Terbit"],
              ["draft", "Draft"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "px-3.5 py-2 text-sm font-medium transition-colors",
                filter === value ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper-2",
              )}
            >
              {label} <span className="tabular opacity-70">{counts[value]}</span>
            </button>
          ))}
        </div>
        <label className="relative sm:w-72">
          <span className="sr-only">Cari judul</span>
          <MagnifyingGlassIcon size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
          <input className="input h-10 pl-9 text-sm" placeholder="Cari judul" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-[0.9375rem]">
          <thead className="text-[0.8125rem] text-ink-3">
            <tr>
              <th className="px-4 py-3 font-medium">E-book</th>
              <th className="px-4 py-3 text-right font-medium">Harga</th>
              <th className="px-4 py-3 text-right font-medium">Terjual</th>
              <th className="px-4 py-3 font-medium">Terbit</th>
              <th className="px-4 py-3 font-medium">Unggulan</th>
              <th className="px-4 py-3 font-medium">Diperbarui</th>
              <th className="px-4 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.slug} className="border-t border-line align-middle hover:bg-paper-2/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <BookCover book={b} compact className="w-9 shrink-0 shadow-none" />
                    <div className="min-w-0">
                      <Link href={`/admin/produk/${b.slug}`} className="font-medium text-ink hover:underline">
                        {b.title}
                      </Link>
                      <p className="text-[0.8125rem] text-ink-3">{getCategory(b.category)?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-ink tabular">{formatRupiah(b.price)}</td>
                <td className="px-4 py-3 text-right text-ink-2 tabular">{b.sold}</td>
                <td className="px-4 py-3">
                  <Switch checked={b.isPublished} onChange={(v) => toggle(b.slug, "isPublished", v)} label={`Terbitkan ${b.title}`} />
                </td>
                <td className="px-4 py-3">
                  <Switch checked={!!b.featured} onChange={(v) => toggle(b.slug, "featured", v)} label={`Unggulan ${b.title}`} />
                </td>
                <td className="px-4 py-3 text-[0.8125rem] text-ink-3">{formatDate(b.publishedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/produk/${b.slug}`} className="btn btn-ghost btn-sm" aria-label={`Ubah ${b.title}`}>
                    <PencilSimpleIcon size={17} /> Ubah
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 ? (
          <p className="px-4 py-12 text-center text-ink-3">Tidak ada e-book yang cocok dengan filter ini.</p>
        ) : null}
      </div>
    </div>
  );
}
