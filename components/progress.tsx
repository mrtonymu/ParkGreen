"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";
import { PROGRESS } from "@/lib/content";

// Park Green broke ground in late 2024 (the earliest quarter we have photos
// for) and is expected to hand over in March 2029. The countdown + progress
// bar anchor urgency without us having to maintain string copy by hand.
const PROJECT_START = new Date(2024, 9, 1); // 2024-10-01 — Q4 2024 begins
const HANDOVER = new Date(2029, 2, 1); // 2029-03-01 — handover

// Live site-progress photos, by quarter (latest selected by default). A small
// coral pulse on the newest quarter pill keeps the "current" beat visible
// even after the buyer flips back to older quarters.
export function Progress() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const m = PROGRESS[active];

  // Compute on client to avoid SSR/hydration drift on a static build.
  const [monthsLeft, setMonthsLeft] = useState<number | null>(null);
  const [pctComplete, setPctComplete] = useState<number | null>(null);
  useEffect(() => {
    const now = new Date();
    const months =
      (HANDOVER.getFullYear() - now.getFullYear()) * 12 +
      (HANDOVER.getMonth() - now.getMonth());
    setMonthsLeft(Math.max(0, months));
    const total = HANDOVER.getTime() - PROJECT_START.getTime();
    const elapsed = now.getTime() - PROJECT_START.getTime();
    setPctComplete(
      Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)))
    );
  }, []);

  return (
    <section
      id="progress"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Construction Progress"
        subtitle="Rising on site — official photos through to handover March 2029."
      />

      {/* Countdown — big editorial number. Visible weight equal to the section
          title, not a quiet subtitle, so the months-to-handover lands as the
          one statistic worth remembering. */}
      {monthsLeft !== null && (
        <div className="mt-14 text-center">
          <span aria-hidden className="mx-auto block h-px w-12 bg-coral" />
          <p className="mt-7 font-display text-[clamp(4rem,11vw,7rem)] font-light leading-none text-espresso">
            {monthsLeft}
          </p>
          <p className="mt-4 text-[0.62rem] uppercase tracking-[0.32em] text-clay">
            Months to Handover · March 2029
          </p>
        </div>
      )}

      {/* Timeline progress bar — anchors the construction story between two
          fixed dates (Project start · Handover). Coral fill reflects elapsed
          time; the marker dot is where we are today. Updates each visit. */}
      {pctComplete !== null && (
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative h-1 bg-espresso/10">
            <div
              className="absolute left-0 top-0 h-full bg-coral transition-all duration-700"
              style={{ width: `${pctComplete}%` }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-coral bg-cream"
              style={{ left: `calc(${pctComplete}% - 7px)` }}
              aria-hidden
            />
          </div>
          <div className="mt-5 flex items-start justify-between gap-3 text-[0.6rem] uppercase tracking-[0.22em] text-espresso/55 sm:text-[0.62rem]">
            <div>
              <p className="font-semibold text-espresso/85">Q4 2024</p>
              <p>Project Start</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-coral">{pctComplete}% Complete</p>
              <p>Latest · {PROGRESS[0]?.label}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-espresso/85">March 2029</p>
              <p>Handover</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0" role="group" aria-label="Progress by quarter">
        {PROGRESS.map((q, i) => (
          <button
            key={q.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`relative h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-[2px] border px-5 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
              i === active
                ? "border-coral bg-coral text-espresso"
                : "border-espresso/20 text-espresso/70 hover:border-espresso/50"
            }`}
          >
            {q.label}
            {i === 0 && (
              <span
                aria-hidden
                title="Latest progress"
                className={`pulse-river absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${
                  i === active ? "bg-cream" : "bg-coral"
                }`}
              />
            )}
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
