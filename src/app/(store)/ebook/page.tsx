import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogSkeleton, CatalogView } from "@/components/catalog-view";

export const metadata: Metadata = {
  title: "Katalog e-book",
  description: "Semua e-book renungan, doa, studi Alkitab, keluarga Kristen, dan pelayanan.",
};

export default function CatalogPage() {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <h1 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">Katalog</h1>
      <p className="mt-3 max-w-[52ch] text-[1.0625rem] text-ink-2">
        Semua e-book dalam format PDF, dikirim otomatis ke email setelah pembayaran.
      </p>
      <div className="mt-10">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogView />
        </Suspense>
      </div>
    </div>
  );
}
