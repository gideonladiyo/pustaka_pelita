import { cn, discountPercent, formatRupiah } from "@/lib/format";

export function Price({
  price,
  comparePrice,
  size = "md",
  className,
}: {
  price: number;
  comparePrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pct = discountPercent(price, comparePrice);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular", className)}>
      <span
        className={cn(
          "font-semibold text-ink",
          size === "sm" && "text-[0.9375rem]",
          size === "md" && "text-base",
          size === "lg" && "text-[1.75rem] tracking-tight",
        )}
      >
        {formatRupiah(price)}
      </span>
      {pct > 0 ? (
        <>
          <s className={cn("text-ink-3", size === "lg" ? "text-base" : "text-sm")}>{formatRupiah(comparePrice!)}</s>
          <span className={cn("font-semibold text-accent-ink", size === "lg" ? "text-sm" : "text-xs")}>
            Hemat {pct}%
          </span>
        </>
      ) : null}
    </div>
  );
}
