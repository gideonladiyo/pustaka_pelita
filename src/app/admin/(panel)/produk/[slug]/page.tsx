import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/ssr";
import { books, getBook } from "@/data/books";
import { PageTitle } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Ubah e-book" };

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default function EditProductPage({ params }: PageProps<"/admin/produk/[slug]">) {
  return (
    <Suspense fallback={<div className="h-[70dvh]" />}>
      <EditProduct params={params} />
    </Suspense>
  );
}

async function EditProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/produk" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">
        <ArrowLeftIcon size={15} /> Daftar e-book
      </Link>
      <PageTitle
        title={book.title}
        description={`Terjual ${book.sold} kali`}
        actions={
          <Link href={`/ebook/${book.slug}`} target="_blank" className="btn btn-secondary btn-sm">
            <ArrowSquareOutIcon size={16} /> Lihat di toko
          </Link>
        }
      />
      <ProductForm book={book} />
    </div>
  );
}
