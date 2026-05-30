"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Understated "Watch the Film" affordance for the hero. The YouTube iframe is
// only mounted on open, so it never weighs on first paint. The overlay is
// portalled to <body> so it can't be trapped by the hero's stacking context.
// Closes on backdrop click, the × button, or Escape; locks body scroll.
const VIDEO_ID = "qV6kGDwPoGU";

export function WatchFilm() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Park Green film"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/92 p-4 backdrop-blur-sm md:p-8"
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-espresso"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div
        className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-[2px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Park Green film"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 text-cream transition-colors duration-200 hover:text-coral"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/50 transition-colors duration-200 group-hover:border-coral">
          <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="text-[0.74rem] font-medium uppercase tracking-[0.16em]">
          Watch · 2m 40s
        </span>
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
