import Link from "next/link";
import { getCategory, type Book } from "@/data/books";
import { BookCover } from "./book-cover";
import { Price } from "./price";

export function BookCard({ book, showCategory = true }: { book: Book; showCategory?: boolean }) {
  return (
    <Link href={`/ebook/${book.slug}`} className="group block" prefetch={false}>
      <BookCover
        book={book}
        className="transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:shadow-book-lift"
      />
      <div className="mt-4 space-y-1">
        {showCategory ? <p className="text-[0.8125rem] text-ink-3">{getCategory(book.category)?.name}</p> : null}
        <h3 className="font-serif text-[1.3125rem] font-medium leading-[1.2] text-ink text-pretty decoration-1 underline-offset-4 group-hover:underline">
          {book.title}
        </h3>
        <Price price={book.price} comparePrice={book.comparePrice} size="sm" className="pt-1" />
      </div>
    </Link>
  );
}
