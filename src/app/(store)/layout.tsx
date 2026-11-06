import { InfoIcon } from "@phosphor-icons/react/ssr";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function StoreLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="bg-accent-soft text-[0.8125rem] text-ink-2">
        <div className="page-x flex items-center justify-center gap-2 py-2 text-center">
          <InfoIcon size={16} className="shrink-0 text-accent-ink" />
          <p>Prototype untuk review. Data, harga, dan pembayaran masih simulasi.</p>
        </div>
      </div>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
