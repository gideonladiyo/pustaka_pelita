"use client";

import { useState } from "react";
import { cn, formatRupiah, formatRupiahCompact } from "@/lib/format";

/*
  Single-series column chart (no legend: the title names the series).
  Specs from the dataviz method: columns <= 24px wide, 4px rounded data end and square at the baseline,
  2px surface gap, hairline solid gridlines, per-bar hover/focus tooltip, one direct label (the peak),
  and a table view so the tooltip never gates a value.
*/

const dayLabel = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", timeZone: "UTC" });
const fullDay = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

function niceMax(v: number) {
  if (v <= 0) return 100_000;
  const step = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * step >= v) return m * step;
  return 10 * step;
}

export function RevenueChart({ data }: { data: { date: string; value: number }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.value)) * 1.08);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));
  const peak = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);

  return (
    <div>
      <div className="relative mt-3 flex h-60">
        {/* y axis */}
        <div className="relative w-16 shrink-0">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-3 -translate-y-1/2 text-[11px] text-ink-3 tabular"
              style={{ bottom: `${(t / max) * 100}%` }}
            >
              {t === 0 ? "0" : formatRupiahCompact(t)}
            </span>
          ))}
        </div>

        <div className="relative flex-1">
          {ticks.map((t) => (
            <div
              key={t}
              aria-hidden
              className={cn("absolute inset-x-0 h-px", t === 0 ? "bg-line-strong" : "bg-line")}
              style={{ bottom: `${(t / max) * 100}%` }}
            />
          ))}

          <div className="absolute inset-0 grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
            {data.map((d, i) => {
              const h = (d.value / max) * 100;
              const isActive = active === i;
              return (
                <button
                  key={d.date}
                  type="button"
                  className="group relative flex h-full items-end justify-center outline-none"
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive((a) => (a === i ? null : a))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((a) => (a === i ? null : a))}
                  aria-label={`${fullDay.format(new Date(d.date))}: ${formatRupiah(d.value)}`}
                >
                  <span
                    className={cn(
                      "block w-full max-w-6 rounded-t-[4px] bg-accent transition-opacity duration-150",
                      active !== null && !isActive && "opacity-45",
                      "group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent",
                    )}
                    style={{ height: `${Math.max(h, d.value > 0 ? 1.5 : 0)}%` }}
                  />
                  {i === peak && active === null ? (
                    <span
                      className="pointer-events-none absolute -translate-y-1.5 whitespace-nowrap text-[11px] font-semibold text-ink tabular"
                      style={{ bottom: `${h}%` }}
                    >
                      {formatRupiahCompact(d.value)}
                    </span>
                  ) : null}
                  {isActive ? (
                    <span
                      role="tooltip"
                      className={cn(
                        "pointer-events-none absolute z-10 mb-2 whitespace-nowrap rounded-ui bg-ink px-3 py-2 text-left shadow-panel",
                        i < 4 ? "left-0" : i > data.length - 5 ? "right-0" : "left-1/2 -translate-x-1/2",
                      )}
                      style={{ bottom: `${h}%` }}
                    >
                      <span className="block text-sm font-semibold text-paper tabular">{formatRupiah(d.value)}</span>
                      <span className="block text-[11px] text-paper/70">{fullDay.format(new Date(d.date))}</span>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* x axis: a label every 7 days plus the latest day */}
      <div className="ml-16 mt-2 grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((d, i) => (
          <span key={d.date} className="relative text-[11px] text-ink-3 tabular">
            {(i % 7 === 0 && i < data.length - 4) || i === data.length - 1 ? (
              <span className={cn("absolute whitespace-nowrap", i === data.length - 1 ? "right-0" : "left-0")}>
                {dayLabel.format(new Date(d.date))}
              </span>
            ) : null}
          </span>
        ))}
      </div>

      <details className="mt-8 text-sm">
        <summary className="inline-flex font-semibold text-accent-ink hover:underline">Lihat sebagai tabel</summary>
        <div className="mt-3 max-h-64 overflow-y-auto rounded-ui border border-line">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-paper-2 text-ink-2">
              <tr>
                <th className="px-4 py-2 font-semibold">Tanggal</th>
                <th className="px-4 py-2 text-right font-semibold">Omzet</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {[...data].reverse().map((d) => (
                <tr key={d.date} className="border-t border-line">
                  <td className="px-4 py-2 text-ink-2">{fullDay.format(new Date(d.date))}</td>
                  <td className="px-4 py-2 text-right text-ink">{formatRupiah(d.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
