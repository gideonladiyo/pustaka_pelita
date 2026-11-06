import Link from "next/link";
import {
  ArrowRightIcon,
  BooksIcon,
  DownloadSimpleIcon,
  QrCodeIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import {
  bestSellers,
  categories,
  countByCategory,
  getBook,
  getCategory,
  newestBooks,
  type Book,
} from "@/data/books";
import { homeFaq } from "@/data/faq";
import { site, whatsappLink } from "@/data/site";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { Price } from "@/components/price";
import { HeroBooks } from "@/components/hero-books";
import { Reveal } from "@/components/motion";
import { FaqList } from "@/components/faq-list";
import { AuthorPortrait } from "@/components/author-portrait";

export default function HomePage() {
  const heroBooks = [
    getBook("doa-yang-mengubah-hari")!,
    getBook("rumah-di-atas-batu")!,
    getBook("berjalan-dalam-terang")!,
  ] as [Book, Book, Book];
  const [top, ...rest] = bestSellers();
  const runnersUp = rest.slice(0, 3);
  const newest = newestBooks().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="page-x grid items-center gap-10 pb-16 pt-10 md:grid-cols-[1.15fr_1fr] md:gap-8 md:pb-24 md:pt-16">
        <div className="max-w-[40rem]">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.04] tracking-[-0.015em] text-ink sm:text-6xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem]">
            Bacaan untuk <em className="font-normal">bertumbuh</em>{" "}
            <span className="whitespace-nowrap">dalam iman</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2">
            E-book renungan, doa, dan studi Alkitab karya {site.author.name}. Bayar dengan QRIS, langsung terkirim ke
            email.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/ebook" className="btn btn-primary">
              Lihat Katalog
              <ArrowRightIcon size={18} />
            </Link>
            <Link href="#penulis" className="btn btn-secondary">
              Tentang Penulis
            </Link>
          </div>
        </div>
        <HeroBooks books={heroBooks} />
      </section>

      {/* Scripture */}
      <section className="bg-paper-2">
        <Reveal className="page-x py-20 text-center md:py-28">
          <blockquote>
            <p className="mx-auto max-w-[24ch] font-serif text-[2rem] italic leading-[1.25] text-ink text-balance md:text-[2.875rem]">
              &ldquo;{site.verse.text}&rdquo;
            </p>
            <footer className="mt-6 text-sm font-semibold text-ink-3">{site.verse.ref}</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* Best sellers: one focal book + three compact rows */}
      <section className="page-x py-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Paling banyak dibaca</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <Reveal className="grid gap-8 rounded-ui border border-line bg-surface p-6 sm:grid-cols-[0.8fr_1fr] sm:p-8">
            <Link href={`/ebook/${top.slug}`} className="mx-auto block w-full max-w-[220px] sm:max-w-none">
              <BookCover book={top} />
            </Link>
            <div className="flex flex-col">
              <p className="text-sm text-ink-3">{getCategory(top.category)?.name}</p>
              <h3 className="mt-2 font-serif text-3xl font-medium leading-[1.12] text-ink">{top.title}</h3>
              <p className="mt-1 text-ink-2">{top.subtitle}</p>
              <p className="mt-5 leading-relaxed text-ink-2">{top.blurb}</p>
              <div className="mt-auto pt-8">
                <Price price={top.price} comparePrice={top.comparePrice} size="lg" />
                <Link href={`/ebook/${top.slug}`} className="btn btn-primary mt-5 w-full sm:w-auto">
                  Lihat Detail
                </Link>
              </div>
            </div>
          </Reveal>
          <ul className="flex flex-col">
            {runnersUp.map((book, i) => (
              <Reveal as="li" key={book.slug} delay={0.08 * i} className="border-b border-line first:border-t">
                <Link href={`/ebook/${book.slug}`} className="group flex items-center gap-5 py-5">
                  <BookCover book={book} className="w-[76px] shrink-0" compact />
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] text-ink-3">{getCategory(book.category)?.name}</p>
                    <h3 className="mt-0.5 font-serif text-[1.375rem] font-medium leading-tight text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {book.title}
                    </h3>
                    <Price price={book.price} comparePrice={book.comparePrice} size="sm" className="mt-1.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Category index */}
      <section className="border-y border-line">
        <div className="page-x py-20 md:py-24">
          <Reveal>
            <h2 className="max-w-xl text-[1.0625rem] font-semibold text-ink">Pilih sesuai kebutuhan rohani Anda</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 md:gap-x-14 md:gap-y-6">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/ebook?kategori=${c.slug}`}
                    className="group inline-flex items-start gap-1.5 font-serif text-[2rem] leading-tight text-ink transition-colors hover:text-accent-ink md:text-[3.25rem]"
                  >
                    <span className="decoration-1 underline-offset-[6px] group-hover:underline">{c.name}</span>
                    <span className="mt-1 font-sans text-sm font-semibold text-ink-3 tabular md:mt-2">
                      {countByCategory(c.slug)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Author */}
      <section id="penulis" className="page-x grid items-center gap-10 py-20 md:grid-cols-[0.85fr_1fr] md:gap-16 md:py-28">
        <Reveal>
          <AuthorPortrait className="mx-auto w-full max-w-[420px]" />
        </Reveal>
        <Reveal delay={0.1} className="max-w-xl">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-accent-ink">Tentang penulis</p>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">{site.author.name}</h2>
          <p className="mt-2 text-ink-3">{site.author.role}</p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">{site.author.shortBio}</p>
          <blockquote className="mt-8 border-l-2 border-accent pl-5 font-serif text-[1.5rem] italic leading-snug text-ink">
            Saya menulis untuk jemaat yang rindu membaca Alkitab dengan setia, walau waktunya tidak banyak.
          </blockquote>
          <Link href="/tentang" className="link mt-8 inline-flex items-center gap-1.5 font-semibold">
            Kenali lebih jauh <ArrowRightIcon size={16} />
          </Link>
        </Reveal>
      </section>

      {/* How buying works */}
      <section className="bg-paper-2">
        <div className="page-x py-20 md:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Beli sekali, baca selamanya</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              Tidak perlu membuat akun. E-book dikirim otomatis dan bisa disimpan di HP, tablet, atau laptop.
            </p>
          </Reveal>
          <div className="relative mt-14">
          <div aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-line-strong md:block" />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              { icon: BooksIcon, title: "Pilih e-book", body: "Baca deskripsi, daftar isi, dan cuplikan sebelum membeli." },
              { icon: QrCodeIcon, title: "Bayar dengan QRIS", body: "Atau transfer virtual account dan e-wallet. Selesai dalam hitungan detik." },
              { icon: DownloadSimpleIcon, title: "Unduh dari email", body: "Link unduhan dikirim ke email dan bisa dipakai hingga 5 kali." },
            ].map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.1 * i} className="relative flex gap-5 md:block">
                <div className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-paper text-accent-ink">
                  <step.icon size={22} />
                </div>
                <div className="md:mt-6">
                  <h3 className="text-[1.125rem] font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* Newest */}
      <section className="page-x py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Baru terbit</h2>
          <Link href="/ebook" className="link inline-flex items-center gap-1.5 font-semibold">
            Lihat Katalog <ArrowRightIcon size={16} />
          </Link>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {newest.map((book, i) => (
            <Reveal key={book.slug} delay={0.06 * i}>
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="page-x grid gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Pertanyaan umum</h2>
            <p className="mt-4 max-w-[36ch] leading-relaxed text-ink-2">
              Belum terjawab? Kirim pesan, kami balas di jam kerja.
            </p>
            <a
              href={whatsappLink("Halo, saya ingin bertanya tentang e-book di Pustaka Pelita.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary mt-7"
            >
              <WhatsappLogoIcon size={20} />
              Tanya via WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={homeFaq} />
            <Link href="/faq" className="link mt-6 inline-flex items-center gap-1.5 font-semibold">
              Semua pertanyaan <ArrowRightIcon size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
