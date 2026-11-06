"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react/ssr";
import { books, categories } from "@/data/books";

export function CategoryManager() {
  const [rows, setRows] = useState(() =>
    categories.map((c) => ({ ...c, count: books.filter((b) => b.category === c.slug).length })),
  );
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
      <div className="rounded-ui border border-line bg-surface">
        <table className="w-full text-left text-[0.9375rem]">
          <thead className="text-[0.8125rem] text-ink-3">
            <tr>
              <th className="px-5 py-3 font-medium">Kategori</th>
              <th className="px-5 py-3 text-right font-medium">E-book</th>
              <th className="px-5 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.slug} className="border-t border-line">
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-[0.8125rem] text-ink-3">{c.description}</p>
                </td>
                <td className="px-5 py-3.5 text-right text-ink-2 tabular">{c.count}</td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm px-2"
                    aria-label={`Hapus ${c.name}`}
                    onClick={() => {
                      if (c.count > 0) {
                        toast.error("Kategori masih dipakai", { description: `Pindahkan ${c.count} e-book ke kategori lain dulu.` });
                        return;
                      }
                      setRows((r) => r.filter((x) => x.slug !== c.slug));
                      toast.success("Kategori dihapus", { description: c.name });
                    }}
                  >
                    <TrashIcon size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="space-y-4 self-start rounded-ui border border-line bg-surface p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const n = name.trim();
          if (n.length < 3) return setError("Nama kategori minimal 3 karakter.");
          if (rows.some((r) => r.name.toLowerCase() === n.toLowerCase())) return setError("Kategori dengan nama ini sudah ada.");
          const slug = n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          setRows((r) => [...r, { slug: slug as (typeof r)[number]["slug"], name: n, description: "Deskripsi belum diisi.", count: 0 }]);
          setName("");
          setError("");
          toast.success("Kategori ditambahkan", { description: n });
        }}
      >
        <h2 className="text-[0.9375rem] font-semibold text-ink">Tambah kategori</h2>
        <div className="space-y-2">
          <label htmlFor="cat-name" className="field-label">
            Nama kategori
          </label>
          <input
            id="cat-name"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            aria-invalid={error ? true : undefined}
          />
          {error ? <p className="field-error">{error}</p> : <p className="field-help">Contoh: Khotbah Tematik</p>}
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          <PlusIcon size={16} /> Tambah
        </button>
      </form>
    </div>
  );
}
