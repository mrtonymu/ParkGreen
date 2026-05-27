"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";
import { PROGRESS } from "@/lib/content";

// Live site-progress photos, by quarter (latest selected by default).
export function Progress() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const m = PROGRESS[active];

  return (
    <section
      id="progress"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Construction Progress"
        subtitle="Rising on site in Bukit Jalil City — official updates through to completion in 2029."
      />

      <div className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0" role="group" aria-label="Progress by quarter">
        {PROGRESS.map((q, i) => (
          <button
            key={q.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-[2px] border px-5 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
              i === active
                ? "border-coral bg-coral text-espresso"
                : "border-espresso/20 text-espresso/70 hover:border-espresso/50"
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {m.photos.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Enlarge ${m.label} site photo ${i + 1}`}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] basis-[calc(50%-0.5rem)] cursor-pointer overflow-hidden rounded-[2px] border border-espresso/10 sm:basis-[calc(33.333%-0.667rem)]"
          >
            <Image
              src={src}
              alt={`Park Green construction — ${m.label}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={m.photos}
          index={open}
          alt={`Park Green construction — ${m.label}`}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </section>
  );
}
