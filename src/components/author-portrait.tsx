import { site } from "@/data/site";
import { cn } from "@/lib/format";

// TODO(klien): ganti dengan foto asli pendeta, rasio 4:5, minimal 1200x1500 px.
export function AuthorPortrait({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-ui bg-paper-2">
        <div className="absolute inset-[8%] rounded-t-full border border-line-strong/70" />
        <span className="font-serif text-[clamp(4rem,12vw,8rem)] font-medium tracking-tight text-ink-3/60">
          {site.author.initials}
        </span>
      </div>
      <figcaption className="mt-3 text-[0.8125rem] text-ink-3">Foto {site.author.shortName} menyusul.</figcaption>
    </figure>
  );
}
