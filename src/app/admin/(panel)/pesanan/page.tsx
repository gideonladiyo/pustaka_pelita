import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle } from "@/components/admin/ui";
import { OrderTable } from "@/components/admin/order-table";

export const metadata: Metadata = { title: "Pesanan" };

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Pesanan" description="Cari pesanan, bantu pembeli, dan ekspor data untuk pembukuan." />
      <Suspense fallback={<div className="h-[70dvh] animate-pulse rounded-ui bg-paper-2/60" />}>
        <OrderTable />
      </Suspense>
    </div>
  );
}
