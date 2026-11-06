import type { Metadata } from "next";
import { PageTitle } from "@/components/admin/ui";
import { CategoryManager } from "@/components/admin/category-manager";

export const metadata: Metadata = { title: "Kategori" };

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Kategori" description="Kategori tampil sebagai filter di katalog toko." />
      <CategoryManager />
    </div>
  );
}
