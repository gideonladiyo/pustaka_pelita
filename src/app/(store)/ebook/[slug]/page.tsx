import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  CaretRightIcon,
  CheckIcon,
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  InfinityIcon,
} from "@phosphor-icons/react/ssr";
import { books, getBook, getCategory, relatedBooks } from "@/data/books";
import { BookCover } from "@/components/book-cover";
import { BookCard } from "@/components/book-card";
import { Price } from "@/components/price";
import { BuyActions, MobileBuyBar, SampleButton } from "@/components/buy-actions";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ebook/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "E-book tidak ditemukan" };
  return { title: book.title, description: book.blurb };
}

export default function BookPage({ params }: PageProps<"/ebook/[slug]">) {
  return (
    <Suspense fallback={<div className="page-x min-h-[70dvh]" />}>
      <BookDetail params={params} />
    </Suspense>
  );
}

async function BookDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book || !book.isPublished) notFound();
  const category = getCategory(book.category)!;
  const related = relatedBooks(book);

  const facts = [
    { label: "Halaman", value: `${book.pages}` },
    { label: "Format", value: book.format },
    { label: "Ukuran", value: `${book.fileSizeMb.toLocaleString("id-ID")} MB` },
    { label: "Terbit", value: formatDate(book.publishedAt) },
  ];

  return (
    <>
      <div className="page-x pb-16 pt-8 md:pb-24">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-3">
          <Link href="/ebook" className="hover:text-ink">
            Katalog
          </Link>
          <CaretRightIcon size={12} />
          <Link href={`/ebook?kategori=${category.slug}`} className="hover:text-ink">
            {category.name}
          </Link>
          <CaretRightIcon size={12} />
          <span className="truncate text-ink-2" aria-current="page">
            {book.title}
          </span>
        </nav>

        <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="md:sticky md:top-24 md:self-start">
            <BookCover book={book} className="mx-auto w-full max-w-[260px] shadow-book-lift sm:max-w-[400px]" />
            <div className="mx-auto mt-6 max-w-[260px] sm:max-w-[400px]">
              <SampleButton book={book} />
            </div>
          </div>

          <div className="min-w-0">
            <Link href={`/ebook?kategori=${category.slug}`} className="text-sm font-semibold text-accent-ink hover:underline">
              {category.name}
            </Link>
            <h1 className="mt-3 font-serif text-[2.5rem] font-medium leading-[1.06] tracking-[-0.01em] text-ink text-balance md:text-[3.25rem]">
              {book.title}
            </h1>
            <p className="mt-3 text-lg text-ink-2">{book.subtitle}</p>
            <p className="mt-2 text-[0.9375rem] text-ink-3">oleh {book.author}</p>

            <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-2">{book.blurb}</p>

            <div className="mt-8 border-t border-line pt-8">
              <Price price={book.price} comparePrice={book.comparePrice} size="lg" />
              <div className="mt-5">
                <BuyActions slug={book.slug} title={book.title} />
              </div>
              <ul className="mt-7 space-y-3 text-[0.9375rem] text-ink-2">
                <li className="flex gap-3">
                  <EnvelopeSimpleIcon size={20} className="shrink-0 text-accent-ink" />
                  Dikirim otomatis ke email setelah pembayaran berhasil
                </li>
                <li className="flex gap-3">
                  <DeviceMobileIcon size={20} className="shrink-0 text-accent-ink" />
                  PDF, nyaman dibaca di HP, tablet, dan laptop
                </li>
                <li className="flex gap-3">
                  <InfinityIcon size={20} className="shrink-0 text-accent-ink" />
                  Bisa diunduh ulang hingga 5 kali, tanpa batas waktu
                </li>
              </ul>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-ui border border-line bg-line sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-paper px-4 py-4">
                  <dt className="text-[0.8125rem] text-ink-3">{f.label}</dt>
                  <dd className="mt-1 font-semibold text-ink tabular">{f.value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-14">
              <h2 className="font-serif text-[1.875rem] font-medium text-ink">Tentang buku ini</h2>
              <div className="mt-4 max-w-[62ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-2">
                {book.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <blockquote className="mt-8 max-w-[56ch] border-l-2 border-accent pl-5">
                <p className="font-serif text-[1.375rem] italic leading-snug text-ink">&ldquo;{book.verse.text}&rdquo;</p>
                <footer className="mt-2 text-sm font-semibold text-ink-3">{book.verse.ref}</footer>
              </blockquote>
            </section>

            <section className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
              <div>
                <h2 className="font-serif text-[1.875rem] font-medium text-ink">Yang Anda dapatkan</h2>
                <ul className="mt-5 space-y-3.5">
                  {book.benefits.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-ink-2">
                      <CheckIcon size={20} weight="bold" className="mt-0.5 shrink-0 text-accent-ink" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-[1.875rem] font-medium text-ink">Daftar isi</h2>
                <ol className="mt-5 space-y-2.5 font-serif text-[1.1875rem] leading-snug text-ink">
                  {book.toc.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-24 border-t border-line pt-14">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-ink">Mungkin Anda juga suka</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {related.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      </div>
      <MobileBuyBar slug={book.slug} price={book.price} />
    </>
  );
}
