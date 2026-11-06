"use client";

// Prototype state: keranjang & pesanan disimpan di localStorage browser.
// Di versi final, pesanan dibuat di server (PRD CRT-06) dan statusnya dari webhook Midtrans (PAY-03).

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getBook } from "@/data/books";
import { site } from "@/data/site";

export type OrderStatus = "PENDING" | "PAID" | "EXPIRED";
export type PaymentMethod = "qris" | "va" | "ewallet";

export type Order = {
  code: string;
  token: string;
  items: { slug: string; title: string; price: number }[];
  customer: { name: string; email: string; phone?: string };
  subtotal: number;
  discount: number;
  voucher?: string;
  total: number;
  status: OrderStatus;
  method?: PaymentMethod;
  methodDetail?: string;
  createdAt: string;
  expiresAt: string;
  paidAt?: string;
  downloads: Record<string, number>;
};

type ShopState = {
  cart: string[];
  orders: Record<string, Order>;
  addToCart: (slug: string) => boolean;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  createOrder: (input: {
    slugs: string[];
    customer: Order["customer"];
    discount: number;
    voucher?: string;
  }) => Order;
  setOrderStatus: (code: string, status: OrderStatus, method?: PaymentMethod, methodDetail?: string) => void;
  registerDownload: (code: string, slug: string) => number;
};

const randomChars = (n: number, alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789") =>
  Array.from(crypto.getRandomValues(new Uint8Array(n)), (x) => alphabet[x % alphabet.length]).join("");

function makeOrderCode(date: Date) {
  const ymd = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `EB-${ymd}-${randomChars(4)}`;
}

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      orders: {},
      addToCart: (slug) => {
        if (get().cart.includes(slug)) return false;
        set((s) => ({ cart: [...s.cart, slug] }));
        return true;
      },
      removeFromCart: (slug) => set((s) => ({ cart: s.cart.filter((x) => x !== slug) })),
      clearCart: () => set({ cart: [] }),
      createOrder: ({ slugs, customer, discount, voucher }) => {
        const now = new Date();
        const items = slugs
          .map((slug) => getBook(slug))
          .filter((b) => b !== undefined)
          .map((b) => ({ slug: b.slug, title: b.title, price: b.price }));
        const subtotal = items.reduce((sum, i) => sum + i.price, 0);
        const order: Order = {
          code: makeOrderCode(now),
          token: randomChars(24, "abcdefghijkmnopqrstuvwxyz23456789"),
          items,
          customer,
          subtotal,
          discount,
          voucher,
          total: Math.max(0, subtotal - discount),
          status: "PENDING",
          createdAt: now.toISOString(),
          expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          downloads: Object.fromEntries(items.map((i) => [i.slug, 0])),
        };
        set((s) => ({ orders: { ...s.orders, [order.code]: order } }));
        return order;
      },
      setOrderStatus: (code, status, method, methodDetail) =>
        set((s) => {
          const o = s.orders[code];
          if (!o) return s;
          return {
            orders: {
              ...s.orders,
              [code]: {
                ...o,
                status,
                method: method ?? o.method,
                methodDetail: methodDetail ?? o.methodDetail,
                paidAt: status === "PAID" ? (o.paidAt ?? new Date().toISOString()) : undefined,
              },
            },
          };
        }),
      registerDownload: (code, slug) => {
        const o = get().orders[code];
        if (!o) return 0;
        const used = (o.downloads[slug] ?? 0) + 1;
        if (used > site.downloadLimit) return site.downloadLimit;
        set((s) => ({
          orders: { ...s.orders, [code]: { ...o, downloads: { ...o.downloads, [slug]: used } } },
        }));
        return used;
      },
    }),
    { name: "pustaka-pelita-prototype", version: 1 },
  ),
);

const emptySubscribe = () => () => {};

/** true only after the client has hydrated, so localStorage-driven UI never mismatches the server HTML */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
