"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BooksIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react/ssr";
import { categories, getCategory, publishedBooks, type CategorySlug } from "@/data/books";
import { BookCard } from "./book-card";
import { cn } from "@/lib/format";

const SORTS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "terlaris", label: "Terlaris" },
  { value: "termurah", label: "Harga terendah" },
  { value: "termahal", label: "Harga tertinggi" },
] as const;
type Sort = (typeof SORTS)[number]["value"];

export function CatalogView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const kategori = (params.get("kategori") ?? "") as CategorySlug | "";
  const urut = (SORTS.some((s) => s.value === params.get("urut")) ? params.get("urut") : "terbaru") as Sort;
  const qParam = params.get("q") ?? "";
  const [query, setQuery] = useState(qParam);

  function update(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  // Debounce the search box into the URL so results are shareable
  useEffect(() => {
    if (query === qParam) return;
    const t = setTimeout(() => update({ q: query.trim() }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const results = useMemo(() => {
    const q = qParam.trim().toLowerCase();
    let list = publishedBooks();
    if (kategori) list = list.filter((b) => b.category === kategori);
    if (q)
      list = list.filter((b) =>
        [b.title, b.subtitle, b.author, getCategory(b.category)?.name ?? ""].some((f) => f.toLowerCase().includes(q)),
      );
    return [...list].sort((a, b) => {
      if (urut === "terlaris") return b.sold - a.sold;
      if (urut === "termurah") return a.price - b.price;
      if (urut === "termahal") return b.price - a.price;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [kategori, qParam, urut]);

  const activeCategory = kategori ? getCategory(kategori) : undefined;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="cari" className="relative flex-1">
          <span className="sr-only">Cari e-book</span>
          <MagnifyingGlassIcon size={19} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            id="cari"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau topik, misalnya: doa, keluarga, Roma"
            className="input pl-11"
            autoComplete="off"
          />
        </label>
        <label className="flex items-center gap-3 sm:w-60">
          <span className="shrink-0 text-sm text-ink-3">Urutkan</span>
          <select className="input" value={urut} onChange={(e) => update({ urut: e.target.value === "terbaru" ? "" : e.target.value })}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="-mx-5 mt-5 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Filter kategori">
        <div className="flex gap-2 md:flex-wrap">
          {[{ slug: "", name: "Semua" }, ...categories].map((c) => {
            const active = kategori === c.slug;
            return (
              <button
                key={c.slug || "semua"}
                type="button"
                aria-pressed={active}
                onClick={() => update({ kategori: c.slug })}
                className={cn(
                  "h-9 shrink-0 rounded-ui border px-3.5 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line-strong text-ink-2 hover:border-ink hover:text-ink",
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <p className="text-sm text-ink-3" aria-live="polite">
          <span className="font-semibold text-ink tabular">{results.length}</span> e-book
          {activeCategory ? ` di ${activeCategory.name}` : ""}
          {qParam ? ` untuk "${qParam}"` : ""}
        </p>
        {kategori || qParam ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:underline"
            onClick={() => {
              setQuery("");
              update({ kategori: "", q: "" });
            }}
          >
            <XIcon size={14} /> Hapus filter
          </button>
        ) : null}
      </div>

      {activeCategory ? <p className="mt-4 max-w-[60ch] text-ink-2">{activeCategory.description}</p> : null}

      {results.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {results.map((book) => (
            <BookCard key={book.slug} book={book} showCategory={!kategori} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-16 max-w-md text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper-2 text-ink-3">
            <BooksIcon size={26} />
          </div>
          <h2 className="mt-5 font-serif text-2xl text-ink">Belum ada e-book yang cocok</h2>
          <p className="mt-2 text-ink-2">Coba kata kunci lain atau lihat kategori berikut.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.slice(0, 4).map((c) => (
              <button
                key={c.slug}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setQuery("");
                  update({ kategori: c.slug, q: "" });
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div aria-hidden>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="h-[46px] flex-1 rounded-ui bg-paper-2" />
        <div className="h-[46px] rounded-ui bg-paper-2 sm:w-60" />
      </div>
      <div className="mt-5 flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-9 w-28 rounded-ui bg-paper-2" />
        ))}
      </div>
      <div className="mt-[4.5rem] grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-[2/3] animate-pulse rounded-book bg-paper-2" />
            <div className="mt-4 h-4 w-1/2 rounded bg-paper-2" />
            <div className="mt-2 h-5 w-4/5 rounded bg-paper-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
