import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <h1 className="font-serif text-5xl font-medium tracking-tight text-ink">Checkout</h1>
      <div className="mt-10">
        <Suspense fallback={<div className="h-[60dvh] animate-pulse rounded-ui bg-paper-2/60" aria-hidden />}>
          <CheckoutView />
        </Suspense>
      </div>
    </div>
  );
}
