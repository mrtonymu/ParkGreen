import { HIGHLIGHTS } from "@/lib/content";

// Seamless highlights marquee — pure CSS (duplicated track, hover-pauses,
// respects reduced-motion). Dark strip under the hero.
export function Highlights() {
  return (
    <section
      aria-label="Project highlights"
      className="relative w-full overflow-hidden border-t border-cream/10 bg-espresso py-4 sm:py-5"
    >
      {/* edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-espresso) 0%, transparent 6%, transparent 94%, var(--color-espresso) 100%)",
        }}
      />
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap sm:gap-12">
        {[...HIGHLIGHTS, ...HIGHLIGHTS].map((text, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10 sm:gap-12">
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-cream/85 sm:text-xs">
              {text}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {HIGHLIGHTS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
