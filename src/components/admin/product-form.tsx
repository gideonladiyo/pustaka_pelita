"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { FilePdfIcon, ImageIcon, TrashIcon, UploadSimpleIcon } from "@phosphor-icons/react/ssr";
import { categories, type Book } from "@/data/books";
import { site } from "@/data/site";
import { BookCover } from "@/components/book-cover";
import { Price } from "@/components/price";
import { Switch } from "./ui";
import { cn } from "@/lib/format";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type Errors = Partial<Record<"title" | "price" | "comparePrice" | "file", string>>;

export function ProductForm({ book }: { book?: Book }) {
  const router = useRouter();
  const isEdit = !!book;
  const [v, setV] = useState({
    title: book?.title ?? "",
    subtitle: book?.subtitle ?? "",
    slug: book?.slug ?? "",
    author: book?.author ?? site.author.name,
    category: book?.category ?? categories[0].slug,
    price: book ? String(book.price) : "",
    comparePrice: book?.comparePrice ? String(book.comparePrice) : "",
    blurb: book?.blurb ?? "",
    description: book?.description.join("\n\n") ?? "",
    toc: book?.toc.join("\n") ?? "",
    benefits: book?.benefits.join("\n") ?? "",
    pages: book ? String(book.pages) : "",
    isPublished: book?.isPublished ?? false,
    featured: book?.featured ?? false,
  });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [ebookFile, setEbookFile] = useState<{ name: string; size: number } | null>(
    book ? { name: `${book.slug}.pdf`, size: book.fileSizeMb * 1024 * 1024 } : null,
  );
  const [sampleFile, setSampleFile] = useState<{ name: string; size: number } | null>(
    book?.sample ? { name: `cuplikan-${book.slug}.pdf`, size: 420 * 1024 } : null,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => () => void (coverUrl && URL.revokeObjectURL(coverUrl)), [coverUrl]);

  const set = <K extends keyof typeof v>(k: K, value: (typeof v)[K]) => {
    setV((s) => ({ ...s, [k]: value, ...(k === "title" && !slugTouched ? { slug: slugify(String(value)) } : {}) }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const preview: Pick<Book, "title" | "author" | "cover"> = {
    title: v.title || "Judul e-book",
    author: v.author,
    cover: book?.cover ?? { bg: "#2c4a3e", fg: "#ece7d8", motif: "arch", layout: "classic" },
  };

  function save(e: React.FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (v.title.trim().length < 3) err.title = "Judul minimal 3 karakter.";
    const price = Number(v.price);
    if (!price || price < 10000) err.price = "Harga minimal Rp10.000.";
    if (v.comparePrice && Number(v.comparePrice) <= price) err.comparePrice = "Harga coret harus lebih tinggi dari harga jual.";
    if (!ebookFile) err.file = "Unggah file e-book (PDF).";
    setErrors(err);
    if (Object.keys(err).length) {
      toast.error("Periksa kembali isian yang ditandai.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success(isEdit ? "Perubahan disimpan" : "E-book ditambahkan", {
        description: `${v.title}${v.isPublished ? " sudah tampil di toko." : " disimpan sebagai draft."} (simulasi)`,
      });
      router.push("/admin/produk");
    }, 600);
  }

  return (
    <form onSubmit={save} noValidate className="grid gap-8 xl:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <Section title="Informasi utama">
          <Field label="Judul" error={errors.title}>
            {(id) => (
              <input id={id} className="input" value={v.title} onChange={(e) => set("title", e.target.value)} aria-invalid={!!errors.title || undefined} />
            )}
          </Field>
          <Field label="Subjudul" optional>
            {(id) => <input id={id} className="input" value={v.subtitle} onChange={(e) => set("subtitle", e.target.value)} />}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Alamat halaman" help={`/ebook/${v.slug || "judul-ebook"}`}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  value={v.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugify(e.target.value));
                  }}
                />
              )}
            </Field>
            <Field label="Kategori">
              {(id) => (
                <select id={id} className="input" value={v.category} onChange={(e) => set("category", e.target.value as Book["category"])}>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
            <Field label="Penulis">
              {(id) => <input id={id} className="input" value={v.author} onChange={(e) => set("author", e.target.value)} />}
            </Field>
            <Field label="Jumlah halaman">
              {(id) => <input id={id} className="input tabular" inputMode="numeric" value={v.pages} onChange={(e) => set("pages", e.target.value.replace(/\D/g, ""))} />}
            </Field>
          </div>
        </Section>

        <Section title="Harga">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Harga jual" error={errors.price} help="Minimal Rp10.000">
              {(id) => (
                <RupiahInput id={id} value={v.price} onChange={(x) => set("price", x)} invalid={!!errors.price} />
              )}
            </Field>
            <Field label="Harga coret" optional error={errors.comparePrice} help="Tampil dicoret sebagai harga normal">
              {(id) => (
                <RupiahInput id={id} value={v.comparePrice} onChange={(x) => set("comparePrice", x)} invalid={!!errors.comparePrice} />
              )}
            </Field>
          </div>
        </Section>

        <Section title="File">
          <div className="grid gap-5 md:grid-cols-[180px_1fr]">
            <div>
              <span className="field-label">Sampul</span>
              <label className="mt-2 block cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setCoverUrl(URL.createObjectURL(f));
                  }}
                />
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverUrl} alt="Pratinjau sampul" className="aspect-[2/3] w-full rounded-book object-cover shadow-book" />
                ) : (
                  <div className="relative">
                    <BookCover book={preview} />
                    <span className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-1.5 rounded-ui bg-ink/80 py-1.5 text-[0.75rem] font-semibold text-paper">
                      <ImageIcon size={15} /> Ganti sampul
                    </span>
                  </div>
                )}
              </label>
              <p className="field-help mt-2">JPG/PNG/WebP, rasio 2:3, maks 2 MB</p>
            </div>
            <div className="space-y-5">
              <FileDrop label="File e-book" hint="PDF, maks 50 MB. Disimpan privat, hanya bisa diunduh pembeli." file={ebookFile} onFile={setEbookFile} error={errors.file} />
              <FileDrop label="Cuplikan" hint="PDF beberapa halaman awal, boleh dibaca siapa saja." file={sampleFile} onFile={setSampleFile} optional />
            </div>
          </div>
        </Section>

        <Section title="Deskripsi">
          <Field label="Ringkasan singkat" help="1-2 kalimat, tampil di bawah judul dan di hasil pencarian Google">
            {(id) => <textarea id={id} rows={2} className="input" value={v.blurb} onChange={(e) => set("blurb", e.target.value)} />}
          </Field>
          <Field label="Tentang buku ini" help="Pisahkan paragraf dengan baris kosong">
            {(id) => <textarea id={id} rows={6} className="input" value={v.description} onChange={(e) => set("description", e.target.value)} />}
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Yang Anda dapatkan" help="Satu poin per baris">
              {(id) => <textarea id={id} rows={5} className="input" value={v.benefits} onChange={(e) => set("benefits", e.target.value)} />}
            </Field>
            <Field label="Daftar isi" help="Satu bab per baris">
              {(id) => <textarea id={id} rows={5} className="input" value={v.toc} onChange={(e) => set("toc", e.target.value)} />}
            </Field>
          </div>
        </Section>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
        <div className="rounded-ui border border-line bg-surface p-5">
          <h2 className="text-[0.9375rem] font-semibold text-ink">Status</h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between gap-4 text-[0.9375rem] text-ink-2">
              <span>
                <span className="block font-medium text-ink">Terbitkan</span>
                <span className="text-[0.8125rem] text-ink-3">{v.isPublished ? "Tampil di toko" : "Disimpan sebagai draft"}</span>
              </span>
              <Switch checked={v.isPublished} onChange={(x) => set("isPublished", x)} label="Terbitkan" />
            </label>
            <label className="flex items-center justify-between gap-4 text-[0.9375rem] text-ink-2">
              <span>
                <span className="block font-medium text-ink">Unggulan</span>
                <span className="text-[0.8125rem] text-ink-3">Tampil di beranda</span>
              </span>
              <Switch checked={v.featured} onChange={(x) => set("featured", x)} label="Unggulan" />
            </label>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan E-book"}
            </button>
            <Link href="/admin/produk" className="btn btn-ghost">
              Batal
            </Link>
          </div>
        </div>

        <div className="rounded-ui border border-line bg-surface p-5">
          <h2 className="text-[0.9375rem] font-semibold text-ink">Pratinjau di toko</h2>
          <div className="mx-auto mt-4 w-40">
            {coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverUrl} alt="" className="aspect-[2/3] w-full rounded-book object-cover shadow-book" />
            ) : (
              <BookCover book={preview} />
            )}
            <p className="mt-3 font-serif text-[1.125rem] leading-tight text-ink">{preview.title}</p>
            {Number(v.price) > 0 ? (
              <Price price={Number(v.price)} comparePrice={Number(v.comparePrice) || undefined} size="sm" className="mt-1" />
            ) : (
              <p className="mt-1 text-sm text-ink-3">Harga belum diisi</p>
            )}
          </div>
        </div>
      </aside>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-ui border border-line bg-surface p-5 md:p-6">
      <legend className="sr-only">{title}</legend>
      <h2 className="text-[0.9375rem] font-semibold text-ink">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  help,
  error,
  optional,
  children,
}: {
  label: string;
  help?: string;
  error?: string;
  optional?: boolean;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="field-label">
        {label} {optional ? <span className="font-normal text-ink-3">(opsional)</span> : null}
      </label>
      {children(id)}
      {error ? <p className="field-error">{error}</p> : help ? <p className="field-help">{help}</p> : null}
    </div>
  );
}

function RupiahInput({ id, value, onChange, invalid }: { id: string; value: string; onChange: (v: string) => void; invalid?: boolean }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[0.9375rem] text-ink-3">Rp</span>
      <input
        id={id}
        className="input pl-10 tabular"
        inputMode="numeric"
        value={value ? Number(value).toLocaleString("id-ID") : ""}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        aria-invalid={invalid || undefined}
      />
    </div>
  );
}

function FileDrop({
  label,
  hint,
  file,
  onFile,
  error,
  optional,
}: {
  label: string;
  hint: string;
  file: { name: string; size: number } | null;
  onFile: (f: { name: string; size: number } | null) => void;
  error?: string;
  optional?: boolean;
}) {
  const id = useId();
  const [over, setOver] = useState(false);
  return (
    <div>
      <span className="field-label">
        {label} {optional ? <span className="font-normal text-ink-3">(opsional)</span> : null}
      </span>
      {file ? (
        <div className="mt-2 flex items-center gap-3 rounded-ui border border-line bg-paper px-4 py-3">
          <FilePdfIcon size={26} className="shrink-0 text-accent-ink" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.9375rem] font-medium text-ink">{file.name}</p>
            <p className="text-[0.8125rem] text-ink-3 tabular">{(file.size / 1024 / 1024).toLocaleString("id-ID", { maximumFractionDigits: 1 })} MB</p>
          </div>
          <label htmlFor={id} className="btn btn-ghost btn-sm cursor-pointer">
            Ganti
          </label>
          <button type="button" className="btn btn-ghost btn-sm px-2" onClick={() => onFile(null)} aria-label={`Hapus ${label}`}>
            <TrashIcon size={17} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile({ name: f.name, size: f.size });
          }}
          className={cn(
            "mt-2 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-ui border border-dashed px-4 py-7 text-center transition-colors",
            error ? "border-danger" : over ? "border-accent bg-accent-soft/40" : "border-line-strong hover:border-ink-3",
          )}
        >
          <UploadSimpleIcon size={22} className="text-ink-3" />
          <span className="text-[0.9375rem] font-medium text-ink">Tarik file ke sini atau klik untuk memilih</span>
          <span className="text-[0.8125rem] text-ink-3">{hint}</span>
        </label>
      )}
      <input
        id={id}
        type="file"
        accept="application/pdf"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile({ name: f.name, size: f.size });
        }}
      />
      {error ? <p className="field-error mt-2">{error}</p> : null}
    </div>
  );
}
