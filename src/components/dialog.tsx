"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/format";

/** Native <dialog> (focus trap, Esc, top layer for free) with CSS enter/exit transitions from globals.css */
export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  hideTitle,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  hideTitle?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Set when we close the element ourselves, so the native "close" event doesn't call onClose a second time
  const closingInternally = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    // Next.js keeps previous routes alive inside a hidden <Activity>; layout-effect cleanup still runs there,
    // so close here or a stale modal would leave the next page inert.
    return () => {
      if (el.open) {
        closingInternally.current = true;
        el.close();
      }
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn("sheet", className)}
      onClose={() => {
        if (closingInternally.current) {
          closingInternally.current = false;
          return;
        }
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="flex max-h-[inherit] flex-col">
        <div
          className={cn(
            "flex items-center justify-between gap-4 border-b border-line px-5 py-3.5",
            hideTitle && "border-b-0 pb-0",
          )}
        >
          <h2 className={cn("text-[0.9375rem] font-semibold", hideTitle && "sr-only")}>{title}</h2>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm -mr-2 ml-auto px-2" aria-label="Tutup">
            <XIcon size={20} />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
