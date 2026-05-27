"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";

// Park Green's nine official renders.
const SHOTS = [
  "/images/pg/gallery/gallery-1-v3.jpg",
  "/images/pg/gallery/gallery-3.jpg",
  "/images/pg/gallery/gallery-5.jpg",
  "/images/pg/gallery/gallery-2.jpg",
  "/images/pg/gallery/gallery-6.jpg",
  "/images/pg/gallery/gallery-9.jpeg",
  "/images/pg/gallery/gallery-7.jpg",
  "/images/pg/gallery/gallery-8-v2.jpg",
  "/images/pg/gallery/gallery-4.jpg",
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading title="Gallery" subtitle="Artist's impressions of the residences, facilities and township." />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHOTS.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Enlarge render ${i + 1}`}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2px]"
          >
            <Image
              src={src}
              alt={`Park Green — artist's impression ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={SHOTS}
          index={open}
          alt={`Park Green — artist's impression ${open + 1}`}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </section>
  );
}
