"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { FAQS } from "@/lib/content";

// Objection handler — sits between Highlights and Enquiry to remove the
// last five "what about…" hesitations before the buyer hits the form.
// Editorial accordion (one open at a time, first open by default); cream
// chapter break between the dark BJC stack and the clay Enquiry band below.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="reveal mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Common Questions"
        subtitle="The five things buyers ask before they register. The rest, we cover on WhatsApp."
      />

      <ul className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li
              key={f.q}
              className="rounded-[2px] border border-espresso/12"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span
                  className={`text-base font-medium leading-snug transition-colors ${
                    isOpen ? "text-coral" : "text-espresso"
                  }`}
                >
                  {f.q}
                </span>
                <PlusMinus open={isOpen} />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-espresso/75 md:px-6 md:pb-6">
                    {f.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 h-5 w-5 shrink-0 text-coral"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        className={`origin-center transition-transform duration-300 ${
          open ? "scale-y-0" : ""
        }`}
      />
    </svg>
  );
}
