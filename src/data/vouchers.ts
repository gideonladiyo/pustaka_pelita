// DUMMY voucher untuk prototype (PRD modul PRM).

export type Voucher = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minPurchase: number;
  quota: number | null;
  used: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
};

export const vouchers: Voucher[] = [
  { code: "PELITA10", type: "percent", value: 10, minPurchase: 0, quota: 200, used: 87, startsAt: "2026-10-01", endsAt: "2026-12-31", isActive: true },
  { code: "JEMAAT25", type: "fixed", value: 25000, minPurchase: 100000, quota: 100, used: 23, startsAt: "2026-10-15", endsAt: "2026-12-25", isActive: true },
  { code: "PASKAH26", type: "percent", value: 20, minPurchase: 50000, quota: 150, used: 150, startsAt: "2026-03-20", endsAt: "2026-04-10", isActive: false },
];

export type VoucherResult =
  | { ok: true; voucher: Voucher; discount: number }
  | { ok: false; message: string };

export function applyVoucher(rawCode: string, subtotal: number): VoucherResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, message: "Masukkan kode voucher." };
  const v = vouchers.find((x) => x.code === code);
  if (!v) return { ok: false, message: "Kode voucher tidak ditemukan." };
  if (!v.isActive) return { ok: false, message: "Voucher ini sudah tidak berlaku." };
  if (v.quota !== null && v.used >= v.quota) return { ok: false, message: "Kuota voucher sudah habis." };
  if (subtotal < v.minPurchase)
    return { ok: false, message: `Minimal belanja Rp${v.minPurchase.toLocaleString("id-ID")} untuk voucher ini.` };
  const discount = v.type === "percent" ? Math.round((subtotal * v.value) / 100) : Math.min(v.value, subtotal);
  return { ok: true, voucher: v, discount };
}
