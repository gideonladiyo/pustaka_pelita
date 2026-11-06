import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/format";

export function LogoMark({ className }: { className?: string }) {
  // Simple geometric mark: an arched window holding a small flame (pelita).
  return (
    <svg viewBox="0 0 24 30" aria-hidden className={cn("h-7 w-auto", className)}>
      <path d="M3 29V12a9 9 0 0 1 18 0v17" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11.5c-1.7 2.1-2.5 3.6-2.5 5a2.5 2.5 0 0 0 5 0c0-1.4-.8-2.9-2.5-5Z" fill="currentColor" />
      <path d="M8 24.5h8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5 text-ink", className)}>
      <LogoMark className="text-accent-ink" />
      <span className="font-serif text-[1.375rem] font-medium leading-none tracking-tight">{site.name}</span>
    </Link>
  );
}
