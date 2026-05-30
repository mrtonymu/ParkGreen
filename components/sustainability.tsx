import { PRIVILEGES, PROJECT } from "@/lib/content";

// Clay signature band — a calm, centered statement (the breather after the
// left-aligned hero), anchored by a Freehold · Bukit Jalil City chip and the
// project's headline privileges as a row of line-icon pillars.

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Ordered to match PRIVILEGES: bridge · concierge bell · home · park leaf.
const ICONS = [
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M2 17h20" />
    <path d="M3 17v-3M21 17v-3" />
    <path d="M3 14c3-6 15-6 18 0" />
    <path d="M8 13.2V17M16 13.2V17M12 11.4V17" />
  </svg>,
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M4 18h16" />
    <path d="M5.5 18a6.5 6.5 0 0 1 13 0" />
    <path d="M12 5.5V4" />
    <path d="M10.5 20h3" />
  </svg>,
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M4 11l8-6 8 6" />
    <path d="M6 9.7V19h12V9.7" />
    <path d="M10 19v-5h4v5" />
  </svg>,
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M11 20A7 7 0 0 1 4 13C4 7.5 10.5 4 20 4c0 9-3.5 16-9 16Z" />
    <path d="M19 5C12 11 9.5 14 8 20" />
  </svg>,
];

export function Sustainability() {
  return (
    <section className="grain relative overflow-hidden bg-clay text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(247,244,242,0.10),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-cream/70">
          A Symbol of Privilege
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.05rem)] font-medium leading-snug">
          An address bridged to Pavilion Bukit Jalil, wrapped in 80 acres of
          green, and served like a private club.
        </p>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-cream/85">
          <span className="h-1.5 w-1.5 rotate-45 bg-coral" aria-hidden />
          {PROJECT.tenure} · {PROJECT.township}
        </div>

        {/* line-icon privilege pillars — 2×2 on mobile, 4-up with dividers on desktop */}
        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-y-10 lg:grid-cols-4">
          {PRIVILEGES.map((p, i) => (
            <li
              key={p.title}
              className="flex flex-col items-center px-4 text-center lg:border-l lg:border-cream/15 lg:first:border-l-0"
            >
              <span className="text-cream/90 [&>svg]:h-7 [&>svg]:w-7" aria-hidden>
                {ICONS[i]}
              </span>
              <span className="mt-4 font-display text-base font-medium text-cream">
                {p.title}
              </span>
              <span className="mt-2 max-w-[22ch] text-[0.78rem] leading-snug text-cream/70">
                {p.body}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
