import type { Metadata } from "next";
import { books } from "@/data/books";
import { site } from "@/data/site";
import { AuthorPortrait } from "@/components/author-portrait";
import { BookCard } from "@/components/book-card";

export const metadata: Metadata = { title: `Tentang ${site.author.name}` };

// DUMMY biografi. Ganti dengan profil asli dari klien (PRD CNT-01).
export default function AboutPage() {
  const byAuthor = books.filter((b) => b.isPublished).slice(0, 4);
  return (
    <div className="page-x pb-24 pt-12 md:pt-16">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <AuthorPortrait className="w-full max-w-[420px] md:sticky md:top-24 md:self-start" />
        <div className="max-w-[62ch]">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">{site.author.name}</h1>
          <p className="mt-3 text-lg text-ink-3">{site.author.role}</p>
          <div className="prose-reading mt-10 text-ink-2">
            <p>
              {site.author.shortName} melayani sebagai gembala sidang sejak awal tahun 2000-an. Sebelum masuk sekolah teologi,
              ia bekerja beberapa tahun sebagai guru, pengalaman yang membentuk caranya menjelaskan firman Tuhan dengan
              sederhana dan runtut.
            </p>
            <p>
              Sebagian besar tulisannya lahir dari khotbah Minggu, kelas katekisasi, dan pendampingan keluarga jemaat.
              Banyak jemaat meminta catatan khotbah itu dibukukan, dan dari situlah e-book di toko ini berasal.
            </p>
            <p>
              Ia menikah dengan Ruth Wiranata, rekan sepelayanan yang juga menulis beberapa buku tentang keluarga. Mereka
              dikaruniai tiga orang anak.
            </p>
          </div>
          <blockquote className="mt-12 border-l-2 border-accent pl-6">
            <p className="font-serif text-[1.75rem] italic leading-snug text-ink">
              Buku yang baik tidak menggantikan Alkitab. Ia hanya menemani kita membukanya setiap hari.
            </p>
          </blockquote>
        </div>
      </div>

      <section className="mt-24 border-t border-line pt-14">
        <h2 className="font-serif text-4xl font-medium tracking-tight text-ink">Tulisan {site.author.shortName}</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {byAuthor.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
