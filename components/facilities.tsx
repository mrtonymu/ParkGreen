"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";
import { FACILITY_RENDERS } from "@/lib/content";

export function Facilities() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="facilities"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Facilities"
        subtitle="An entire level given over to resort-style facilities, gardens and lounges."
      />

      {/* Official facilities plan (vector) */}
      <div className="mt-12 overflow-hidden rounded-[2px] border border-espresso/10 bg-paper p-4 md:p-8">
        {/* eslint-disable-next-line @next/next/no-img-element -- vector plan scales best as a plain SVG */}
        <img
          src="/images/pg/facilities/facilities-level11.svg"
          alt="Park Green facilities plan"
          className="mx-auto h-auto w-full max-w-5xl"
          loading="lazy"
        />
      </div>

      {/* Renders */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {FACILITY_RENDERS.map((r, i) => (
          <button
            key={r.src}
            type="button"
            aria-label={`Enlarge: ${r.caption}`}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2px] border border-espresso/10"
          >
            <Image
              src={r.src}
              alt={`Park Green — ${r.caption}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(min-width:768px) 24vw, 45vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent px-3 pb-2 pt-8 text-left text-xs font-medium uppercase tracking-[0.12em] text-cream">
              {r.caption}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={FACILITY_RENDERS.map((r) => r.src)}
          index={open}
          alt={FACILITY_RENDERS[open].caption}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </section>
  );
}
