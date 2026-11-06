import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { PageTitle } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Tambah e-book" };

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/produk" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">
        <ArrowLeftIcon size={15} /> Daftar e-book
      </Link>
      <PageTitle title="Tambah e-book" description="E-book baru disimpan sebagai draft sampai Anda menerbitkannya." />
      <ProductForm />
    </div>
  );
}
