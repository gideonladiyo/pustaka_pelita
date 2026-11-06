"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Book } from "@/data/books";
import { BookCover } from "./book-cover";

// Three covers set like books on a table. Entry motion tells the eye "these are the products".
const PLACEMENT = [
  { className: "left-[2%] top-[14%] w-[38%] z-10", rotate: -7 },
  { className: "right-[2%] top-[10%] w-[38%] z-10", rotate: 6 },
  { className: "left-1/2 top-[2%] w-[47%] -translate-x-1/2 z-20", rotate: 0 },
];

export function HeroBooks({ books }: { books: [Book, Book, Book] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[1.05] w-full max-w-[560px]">
      <div className="absolute inset-x-[6%] bottom-[4%] h-[10%] rounded-[50%] bg-[rgb(var(--shadow-rgb)/0.12)] blur-2xl" />
      {books.map((book, i) => {
        const p = PLACEMENT[i];
        return (
          <div key={book.slug} className={`absolute ${p.className}`}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: p.rotate }}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -8, transition: { duration: 0.4 } }}
            >
              <Link href={`/ebook/${book.slug}`} aria-label={book.title} className="block">
                <BookCover book={book} className="shadow-book-lift" />
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
