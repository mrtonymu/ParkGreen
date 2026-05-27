"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { LOCATION_AMENITIES } from "@/lib/content";

export function Location() {
  // Single-open accordion; Transportation expanded by default.
  const [open, setOpen] = useState(0);

  return (
    <section
      id="location"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Location"
        subtitle="Bridged to Pavilion Bukit Jalil, framed by parks and golf — connected on every side."
      />

      <div className="mt-14 grid items-start gap-12 md:grid-cols-2 md:gap-16">
        {/* Official location map (vector), straight on the cream background */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- vector map scales best as a plain SVG */}
          <img
            src="/images/pg/location.svg"
            alt="Park Green location map across Bukit Jalil City"
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {LOCATION_AMENITIES.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div key={cat.group} className="rounded-[2px] border border-espresso/12">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors ${isOpen ? "text-coral" : "text-clay"}`}
                  >
                    {cat.group}
                  </span>
                  <PlusMinus open={isOpen} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-5 pb-5">
                      {cat.places.map((p) => (
                        <li key={p.label} className="flex gap-2 text-sm text-espresso/75">
                          <span className="font-semibold text-coral">{p.distance}</span>
                          <span>{p.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-coral"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        className={`origin-center transition-transform duration-300 ${open ? "scale-y-0" : ""}`}
      />
    </svg>
  );
}
