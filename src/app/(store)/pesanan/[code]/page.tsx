import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSkeleton, OrderView } from "@/components/order-view";
import { DEMO_CODE } from "@/lib/demo";

export const metadata: Metadata = { title: "Status pesanan", robots: { index: false } };

// Pesanan dibuat saat runtime. Satu contoh di-prerender agar route tervalidasi (syarat Cache Components).
export function generateStaticParams() {
  return [{ code: DEMO_CODE }];
}

export default function OrderPage({ params }: PageProps<"/pesanan/[code]">) {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <Suspense fallback={<OrderSkeleton />}>
        <OrderLoader params={params} />
      </Suspense>
    </div>
  );
}

async function OrderLoader({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <OrderView code={decodeURIComponent(code)} />;
}
