import type { ReactNode } from "react";
import type { AdminOrderStatus } from "@/data/orders";
import { cn } from "@/lib/format";

export function PageTitle({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[1.75rem] font-semibold tracking-tight text-ink">{title}</h1>
        {description ? <p className="mt-1 text-[0.9375rem] text-ink-2">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

const STATUS: Record<AdminOrderStatus, { label: string; className: string }> = {
  PAID: { label: "Lunas", className: "bg-accent-soft text-accent-ink" },
  PENDING: { label: "Menunggu", className: "bg-warn-soft text-warn" },
  EXPIRED: { label: "Kedaluwarsa", className: "bg-paper-2 text-ink-3" },
  REFUNDED: { label: "Refund", className: "bg-danger-soft text-danger" },
};

export function StatusBadge({ status }: { status: AdminOrderStatus }) {
  const s = STATUS[status];
  return (
    <span className={cn("inline-flex items-center rounded-[4px] px-2 py-0.5 text-[0.75rem] font-semibold", s.className)}>
      {s.label}
    </span>
  );
}

export const statusLabel = (s: AdminOrderStatus) => STATUS[s].label;

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-ui border border-line bg-surface", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <h2 className="text-[0.9375rem] font-semibold text-ink">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors",
        checked ? "border-accent bg-accent" : "border-line-strong bg-paper-2",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full shadow-sm transition-transform duration-200",
          checked ? "translate-x-[19px] bg-accent-contrast" : "translate-x-[3px] bg-ink-3",
        )}
      />
    </button>
  );
}
