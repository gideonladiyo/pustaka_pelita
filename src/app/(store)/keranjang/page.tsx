import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = { title: "Keranjang" };

export default function CartPage() {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <h1 className="font-serif text-5xl font-medium tracking-tight text-ink">Keranjang</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
