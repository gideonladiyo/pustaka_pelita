import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { site } from "@/data/site";
import "./globals.css";

// EB Garamond: Garamond lineage is the type of printed Bibles and theology books, which is exactly this shop.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Plus Jakarta Sans: drawn by an Indonesian foundry, clear at small UI sizes.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  robots: { index: false, follow: false }, // prototype: jangan diindeks
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1411" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${garamond.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "!bg-ink !text-paper !border-0 !rounded-ui !font-sans !shadow-panel",
              description: "!text-paper/75",
              actionButton: "!bg-paper !text-ink",
            },
          }}
        />
      </body>
    </html>
  );
}
