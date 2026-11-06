import type { Metadata } from "next";
import { PageTitle } from "@/components/admin/ui";
import { VoucherManager } from "@/components/admin/voucher-manager";

export const metadata: Metadata = { title: "Voucher" };

export default function AdminVoucherPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Voucher" description="Kode potongan harga yang bisa dipakai pembeli saat checkout." />
      <VoucherManager />
    </div>
  );
}
