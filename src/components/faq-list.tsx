import { PlusIcon } from "@phosphor-icons/react/ssr";
import type { Faq } from "@/data/faq";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold text-ink">
            <span>{item.q}</span>
            <PlusIcon
              size={20}
              className="mt-0.5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-[62ch] pb-6 pr-10 leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
