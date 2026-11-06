import type { Book, Motif } from "@/data/books";
import { cn } from "@/lib/format";

/*
  Placeholder cover, rendered typographically so the prototype has no stock imagery.
  Text sizes use container-query units (cqi) so one component works from 64px thumbnails to hero size.
  Replace with the client's real cover images (next/image) once assets arrive.
*/

function MotifMark({ motif }: { motif: Motif }) {
  switch (motif) {
    case "arch":
      return (
        <div className="relative h-[46cqi] w-[32cqi] rounded-t-full border-[0.7cqi] border-current opacity-80">
          <div className="absolute left-1/2 top-[42%] h-[7cqi] w-[4.6cqi] -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-current" />
        </div>
      );
    case "sun":
      return (
        <div className="grid size-[38cqi] place-items-center rounded-full border-[0.7cqi] border-current opacity-80">
          <div className="size-[13cqi] rounded-full bg-current" />
        </div>
      );
    case "lines":
      return (
        <div className="flex w-[44cqi] flex-col items-center gap-[2.6cqi] opacity-80">
          {[100, 86, 72, 58, 44, 30, 16].map((w) => (
            <div key={w} className="h-[0.7cqi] bg-current" style={{ width: `${w}%` }} />
          ))}
        </div>
      );
    case "cross":
      return (
        <div className="relative h-[44cqi] w-[26cqi] opacity-80">
          <div className="absolute left-1/2 top-0 h-full w-[0.7cqi] -translate-x-1/2 bg-current" />
          <div className="absolute left-0 top-[30%] h-[0.7cqi] w-full bg-current" />
        </div>
      );
    case "path":
      return (
        <div className="flex h-[46cqi] flex-col items-center opacity-80">
          <div className="size-[6cqi] rounded-full bg-current" />
          <div className="w-[0.7cqi] flex-1 bg-current" />
          <div className="size-[6cqi] rounded-full border-[0.7cqi] border-current" />
        </div>
      );
  }
}

type Props = {
  book: Pick<Book, "title" | "author" | "cover">;
  className?: string;
  /** visually hide text (for very small thumbnails) */
  compact?: boolean;
};

export function BookCover({ book, className, compact }: Props) {
  const { bg, fg, motif, layout, series } = book.cover;
  const authorLine = book.author.replace(/^Pdt\.\s*/, "Pdt. ");

  return (
    <div
      role="img"
      aria-label={`Sampul e-book ${book.title}`}
      className={cn("@container relative aspect-[2/3] overflow-hidden rounded-book shadow-book", className)}
      style={{ backgroundColor: bg, color: fg }}
    >
      {/* spine shading + page edge highlight */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-[7%] w-px bg-white/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-black/[0.08]" />

      {compact ? (
        <div className="absolute inset-0 grid place-items-center pl-[7%]">
          <MotifMark motif={motif} />
        </div>
      ) : layout === "classic" ? (
        <div className="absolute inset-0 flex flex-col items-center py-[11cqi] pl-[13cqi] pr-[10cqi] text-center">
          <div className="h-[5cqi] text-[3.6cqi] font-semibold uppercase tracking-[0.22em] opacity-75">
            {series ?? ""}
          </div>
          <div className="grid flex-1 place-items-center">
            <MotifMark motif={motif} />
          </div>
          <div className="font-serif text-[10cqi] font-medium leading-[1.08] text-balance">{book.title}</div>
          <div className="mt-[5cqi] text-[3.5cqi] font-semibold uppercase tracking-[0.18em] opacity-75">
            {authorLine}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col py-[11cqi] pl-[14cqi] pr-[10cqi]">
          {series ? (
            <div className="mb-[4cqi] text-[3.6cqi] font-semibold uppercase tracking-[0.22em] opacity-75">{series}</div>
          ) : null}
          <div className="font-serif text-[11.5cqi] font-medium leading-[1.04] text-balance">{book.title}</div>
          <div className="mt-[5cqi] h-[0.6cqi] w-[14cqi] bg-current opacity-60" />
          <div className="mt-auto flex items-end justify-between gap-[4cqi]">
            <div className="max-w-[48%] text-[3.5cqi] font-semibold uppercase leading-snug tracking-[0.18em] opacity-75">
              {authorLine}
            </div>
            <div className="origin-bottom-right scale-[0.72]">
              <MotifMark motif={motif} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
