import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="page-x flex h-16 items-center">
        <Logo />
      </div>
      <main className="page-x grid flex-1 place-items-center pb-24">
        <div className="max-w-lg text-center">
          <p className="font-serif text-7xl text-ink-3">404</p>
          <h1 className="mt-4 font-serif text-4xl font-medium text-ink">Halaman tidak ditemukan</h1>
          <p className="mt-3 text-ink-2">Mungkin link-nya salah ketik, atau e-book tersebut sudah tidak dijual.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/ebook" className="btn btn-primary">
              Lihat Katalog
            </Link>
            <Link href="/" className="btn btn-secondary">
              Ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
