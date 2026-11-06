import { InfoIcon } from "@phosphor-icons/react/ssr";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[68ch]">
        <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink">{title}</h1>
        <p className="mt-4 text-sm text-ink-3">Berlaku sejak {updated}</p>
        <div className="mt-8 flex gap-3 rounded-ui bg-warn-soft px-4 py-3 text-[0.875rem] leading-snug text-warn">
          <InfoIcon size={18} className="mt-0.5 shrink-0" />
          <p>Draft untuk prototype. Isi final akan ditinjau dan disetujui klien sebelum website diluncurkan.</p>
        </div>
        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold text-ink">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink-2">
                {s.body.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
