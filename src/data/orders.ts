// DUMMY pesanan untuk panel admin prototype. Dibangkitkan deterministik (seeded) agar server & client selalu sama.
import { books } from "./books";

export type AdminOrderStatus = "PAID" | "PENDING" | "EXPIRED" | "REFUNDED";

export type AdminOrder = {
  code: string;
  createdAt: string;
  paidAt?: string;
  customer: { name: string; email: string; phone?: string };
  items: { slug: string; title: string; price: number; downloads: number }[];
  subtotal: number;
  discount: number;
  voucher?: string;
  total: number;
  status: AdminOrderStatus;
  method?: string;
};

/** Tanggal acuan tetap untuk prototype, supaya halaman bisa di-prerender statis. */
export const TODAY = new Date("2026-11-06T15:00:00+07:00");

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = ["Maria", "Yosua", "Debora", "Christian", "Ruth", "Samuel", "Grace", "Kevin", "Febriani", "Agustinus", "Lidya", "Imanuel", "Natalia", "Yohana", "Steven", "Elisabeth", "Andreas", "Martha", "Daniel", "Priskila", "Timotius", "Ester", "Yakobus", "Hana", "Markus", "Sarah", "Filipus", "Rebeka"];
const LAST = ["Siahaan", "Pangemanan", "Lumbantobing", "Wenas", "Sembiring", "Tanod", "Rumondor", "Sitorus", "Manurung", "Laoh", "Pattiasina", "Tampubolon", "Rantetana", "Simatupang", "Kaunang", "Sihombing", "Wuwungan", "Nainggolan", "Latuheru", "Ginting", "Hutapea", "Mandagi", "Tarigan", "Sumampouw"];
const DOMAINS = ["gmail.com", "gmail.com", "gmail.com", "yahoo.co.id", "outlook.com", "gmail.com"];
const METHODS = ["QRIS", "QRIS", "QRIS", "QRIS", "QRIS", "VA BCA", "VA BCA", "VA Mandiri", "VA BRI", "VA BNI", "GoPay", "DANA", "OVO", "ShopeePay"];
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generate(): AdminOrder[] {
  const rand = mulberry32(20261106);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
  const weighted = books.filter((b) => b.isPublished).flatMap((b) => Array(Math.max(1, Math.round(b.sold / 40))).fill(b));
  const out: AdminOrder[] = [];
  const DAY = 86_400_000;

  for (let d = 40; d >= 0; d--) {
    const dayStart = TODAY.getTime() - d * DAY;
    const weekday = new Date(dayStart).getUTCDay();
    // Busier on Sundays (after church) and Mondays; ramp up slightly toward the present
    const base = weekday === 0 ? 7 : weekday === 1 ? 5 : 3;
    const count = Math.max(1, Math.round(base + rand() * 3 - (d > 20 ? 1 : 0)));
    for (let i = 0; i < count; i++) {
      const created = new Date(dayStart - Math.floor(rand() * 14 * 3_600_000));
      if (created > TODAY) continue;
      const first = pick(FIRST);
      const last = pick(LAST);
      const nItems = rand() < 0.68 ? 1 : rand() < 0.75 ? 2 : 3;
      const chosen = new Map<string, (typeof books)[number]>();
      while (chosen.size < nItems) {
        const b = pick(weighted);
        chosen.set(b.slug, b);
      }
      const items = [...chosen.values()].map((b) => ({ slug: b.slug, title: b.title, price: b.price, downloads: 0 }));
      const subtotal = items.reduce((s, it) => s + it.price, 0);
      const useVoucher = rand() < 0.18;
      const discount = useVoucher ? Math.round(subtotal * 0.1) : 0;

      const ageHours = (TODAY.getTime() - created.getTime()) / 3_600_000;
      const roll = rand();
      let status: AdminOrderStatus = "PAID";
      if (ageHours < 24 && roll < 0.35) status = "PENDING";
      else if (ageHours >= 24 && roll < 0.1) status = "EXPIRED";
      else if (roll > 0.993) status = "REFUNDED";

      const paidAt = status === "PAID" || status === "REFUNDED" ? new Date(created.getTime() + (1 + rand() * 25) * 60_000) : undefined;
      if (status === "PAID") items.forEach((it) => (it.downloads = Math.min(5, Math.floor(rand() * 3) + (rand() < 0.08 ? 3 : 1))));

      const ymd = created.toISOString().slice(0, 10).replaceAll("-", "");
      const suffix = Array.from({ length: 4 }, () => ALPHA[Math.floor(rand() * ALPHA.length)]).join("");
      out.push({
        code: `EB-${ymd}-${suffix}`,
        createdAt: created.toISOString(),
        paidAt: paidAt?.toISOString(),
        customer: {
          name: `${first} ${last}`,
          email: `${first}.${last}${rand() < 0.4 ? Math.floor(rand() * 90 + 10) : ""}@${pick(DOMAINS)}`.toLowerCase(),
          phone: rand() < 0.6 ? `08${Math.floor(1e9 + rand() * 8.9e9)}`.slice(0, 12) : undefined,
        },
        items,
        subtotal,
        discount,
        voucher: useVoucher ? "PELITA10" : undefined,
        total: subtotal - discount,
        status,
        method: status === "PAID" || status === "REFUNDED" ? pick(METHODS) : undefined,
      });
    }
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const adminOrders: AdminOrder[] = generate();
export const getAdminOrder = (code: string) => adminOrders.find((o) => o.code === code);

const jakartaDay = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date(iso));

export function dailyRevenue(days = 30) {
  const map = new Map<string, number>();
  for (let d = days - 1; d >= 0; d--) map.set(jakartaDay(new Date(TODAY.getTime() - d * 86_400_000).toISOString()), 0);
  for (const o of adminOrders) {
    if (o.status !== "PAID" || !o.paidAt) continue;
    const k = jakartaDay(o.paidAt);
    if (map.has(k)) map.set(k, map.get(k)! + o.total);
  }
  return [...map.entries()].map(([date, value]) => ({ date, value }));
}

export function salesStats() {
  const paid = adminOrders.filter((o) => o.status === "PAID");
  const today = jakartaDay(TODAY.toISOString());
  const month = today.slice(0, 7);
  const prevMonthDate = new Date(TODAY);
  prevMonthDate.setUTCMonth(prevMonthDate.getUTCMonth() - 1);
  const prevMonth = jakartaDay(prevMonthDate.toISOString()).slice(0, 7);
  // Compare month-to-date with the same number of days last month
  const dayOfMonth = Number(today.slice(8, 10));
  const sum = (list: AdminOrder[]) => list.reduce((s, o) => s + o.total, 0);

  const todayOrders = paid.filter((o) => jakartaDay(o.paidAt!) === today);
  const monthOrders = paid.filter((o) => jakartaDay(o.paidAt!).startsWith(month));
  const prevMonthToDate = paid.filter((o) => {
    const k = jakartaDay(o.paidAt!);
    return k.startsWith(prevMonth) && Number(k.slice(8, 10)) <= dayOfMonth;
  });
  const last30 = dailyRevenue(30).reduce((s, d) => s + d.value, 0);

  const sold = new Map<string, { title: string; count: number; revenue: number }>();
  for (const o of paid)
    for (const it of o.items) {
      const cur = sold.get(it.slug) ?? { title: it.title, count: 0, revenue: 0 };
      cur.count += 1;
      cur.revenue += it.price;
      sold.set(it.slug, cur);
    }

  return {
    todayRevenue: sum(todayOrders),
    todayCount: todayOrders.length,
    monthRevenue: sum(monthOrders),
    monthCount: monthOrders.length,
    prevMonthToDateRevenue: sum(prevMonthToDate),
    last30Revenue: last30,
    pendingCount: adminOrders.filter((o) => o.status === "PENDING").length,
    topBooks: [...sold.entries()]
      .map(([slug, v]) => ({ slug, ...v }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  };
}
