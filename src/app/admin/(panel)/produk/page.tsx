import type { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { PageTitle } from "@/components/admin/ui";
import { ProductTable } from "@/components/admin/product-table";

export const metadata: Metadata = { title: "E-book" };

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="E-book"
        description="Kelola katalog, harga, dan status terbit."
        actions={
          <Link href="/admin/produk/baru" className="btn btn-primary btn-sm">
            <PlusIcon size={17} /> Tambah E-book
          </Link>
        }
      />
      <ProductTable />
    </div>
  );
}
