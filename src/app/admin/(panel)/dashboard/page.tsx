import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRightIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { adminOrders, dailyRevenue, salesStats, TODAY } from "@/data/orders";
import { getBook } from "@/data/books";
import { BookCover } from "@/components/book-cover";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { PageTitle, Panel, StatusBadge } from "@/components/admin/ui";
import { cn, formatDate, formatDateTime, formatRupiah } from "@/lib/format";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const s = salesStats();
  const series = dailyRevenue(30);
  const delta = s.prevMonthToDateRevenue ? (s.monthRevenue - s.prevMonthToDateRevenue) / s.prevMonthToDateRevenue : 0;
  const up = delta >= 0;
  const recent = adminOrders.slice(0, 6);

  return (
    <div className="space-y-8">
      <PageTitle title="Dashboard" description={`Ringkasan penjualan per ${formatDate(TODAY.toISOString())}`} />

      <Panel>
        <div className="grid divide-y divide-line md:grid-cols-[1.4fr_1fr_1fr_1fr] md:divide-x md:divide-y-0">
          <div className="p-6">
            <p className="text-sm text-ink-2">Omzet bulan ini</p>
            <p className="mt-2 text-[3rem] font-semibold leading-none tracking-tight text-ink">{formatRupiah(s.monthRevenue)}</p>
            <p className={cn("mt-3 inline-flex items-center gap-1 text-sm font-semibold", up ? "text-accent-ink" : "text-danger")}>
              {up ? <ArrowUpRightIcon size={16} weight="bold" /> : <ArrowDownRightIcon size={16} weight="bold" />}
              {up ? "+" : ""}
              {(delta * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}%
              <span className="font-normal text-ink-3">vs periode sama bulan lalu</span>
            </p>
          </div>
          <Stat label="Omzet hari ini" value={formatRupiah(s.todayRevenue)} note={`${s.todayCount} pesanan`} />
          <Stat label="Pesanan lunas bulan ini" value={s.monthCount.toLocaleString("id-ID")} note={`30 hari: ${formatRupiah(s.last30Revenue)}`} />
          <Stat
            label="Menunggu pembayaran"
            value={s.pendingCount.toLocaleString("id-ID")}
            note={
              <Link href="/admin/pesanan?status=PENDING" className="link">
                Lihat pesanan
              </Link>
            }
          />
        </div>
      </Panel>

      <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
        <Panel title="Omzet harian, 30 hari terakhir">
          <div className="p-5 pt-6">
            <RevenueChart data={series} />
          </div>
        </Panel>

        <Panel title="E-book terlaris">
          <ul className="divide-y divide-line">
            {s.topBooks.map((b) => {
              const book = getBook(b.slug);
              return (
                <li key={b.slug} className="flex items-center gap-4 px-5 py-3.5">
                  {book ? <BookCover book={book} compact className="w-9 shrink-0 shadow-none" /> : null}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.9375rem] font-medium text-ink">{b.title}</p>
                    <p className="text-[0.8125rem] text-ink-3 tabular">{formatRupiah(b.revenue)}</p>
                  </div>
                  <span className="text-[0.9375rem] font-semibold text-ink tabular">{b.count}</span>
                </li>
              );
            })}
          </ul>
          <p className="border-t border-line px-5 py-3 text-[0.8125rem] text-ink-3">Jumlah terjual, 40 hari terakhir</p>
        </Panel>
      </div>

      <Panel
        title="Pesanan terbaru"
        action={
          <Link href="/admin/pesanan" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:underline">
            Semua pesanan <ArrowRightIcon size={14} />
          </Link>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[0.9375rem]">
            <thead className="text-[0.8125rem] text-ink-3">
              <tr>
                <th className="px-5 py-3 font-medium">Pesanan</th>
                <th className="px-5 py-3 font-medium">Pembeli</th>
                <th className="px-5 py-3 font-medium">Waktu</th>
                <th className="px-5 py-3 text-right font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.code} className="border-t border-line hover:bg-paper-2/50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/pesanan/${o.code}`} className="font-medium text-ink hover:underline tabular">
                      {o.code}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-ink-2">{o.customer.name}</td>
                  <td className="px-5 py-3 text-ink-3">{formatDateTime(o.createdAt)}</td>
                  <td className="px-5 py-3 text-right text-ink tabular">{formatRupiah(o.total)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: React.ReactNode }) {
  return (
    <div className="p-6">
      <p className="text-sm text-ink-2">{label}</p>
      <p className="mt-2 text-[1.75rem] font-semibold leading-none tracking-tight text-ink">{value}</p>
      <p className="mt-3 text-sm text-ink-3">{note}</p>
    </div>
  );
}
