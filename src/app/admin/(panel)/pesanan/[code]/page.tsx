import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { adminOrders, getAdminOrder } from "@/data/orders";
import { PageTitle } from "@/components/admin/ui";
import { OrderDetail } from "@/components/admin/order-detail";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Detail pesanan" };

export function generateStaticParams() {
  return adminOrders.slice(0, 20).map((o) => ({ code: o.code }));
}

export default function AdminOrderPage({ params }: PageProps<"/admin/pesanan/[code]">) {
  return (
    <Suspense fallback={<div className="h-[70dvh]" />}>
      <Detail params={params} />
    </Suspense>
  );
}

async function Detail({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const order = getAdminOrder(decodeURIComponent(code));
  if (!order) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/pesanan" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">
        <ArrowLeftIcon size={15} /> Daftar pesanan
      </Link>
      <PageTitle
        title={order.code}
        description={`Dibuat ${formatDateTime(order.createdAt)}`}
      />
      <OrderDetail initial={order} />
    </div>
  );
}
