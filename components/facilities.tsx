"use client";

import { useState } from "react";
import { FACILITY_LEVELS } from "@/lib/content";

// Editorial Facilities — left-anchored, no banner photo, no white card. The
// section is one breath: oversized title → plan as the hero artifact → bare
// list → other levels → soft CTA. Hover/tap a list item OR a pin to highlight
// across both. Same typographic language as the Hero ("Park Green" Cormorant
// + Inter meta lines).
const main = FACILITY_LEVELS.find((l) => l.plan)!;
const others = FACILITY_LEVELS.filter((l) => !l.plan);

export function Facilities() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="facilities"
      className="grain relative overflow-hidden bg-espresso py-24 text-cream md:py-32"
    >
      {/* fern motif — same vocabulary as other dark sections */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img
        src="/images/pg/logos/fernleaf-horizontal.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 w-[520px] max-w-[55%] rotate-180 opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Section head — left-anchored, mirrors Hero's rhythm */}
        <div className="max-w-xl">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-coral/80">
            16 Amenities · One Level
          </p>
          <h2 className="mt-5 font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight">
            Facilities
          </h2>
          <p className="mt-5 text-sm font-light text-cream/65">
            Level 11 — an entire deck given over to a 50-metre infinity pool,
            jacuzzi, gym, yoga, co-working, children&apos;s play and a BBQ
            terrace. Hover the plan, or read the room.
          </p>
        </div>

        {/* The plan — sits in the dark, no card, no padding. The SVG's own
            pale interior is the only light source in the section. */}
        <div
          id={`facilities-level-${main.level}`}
          className="mt-16 md:mt-20"
          onMouseLeave={() => setActive(null)}
        >
          <PlanWithPins active={active} setActive={setActive} />
        </div>

        {/* Bare amenity list — three columns on desktop, two on mobile.
            No bullets, no "01" prefix; numbers live on the plan only. */}
        <ul className="mt-14 grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-light md:mt-16 md:grid-cols-3 md:gap-y-4">
          {main.items.map((it, i) => {
            const n = i + 1;
            const isActive = active === n;
            return (
              <li
                key={it}
                onMouseEnter={() => setActive(n)}
                onFocus={() => setActive(n)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(isActive ? null : n)}
                tabIndex={0}
                aria-current={isActive ? "true" : undefined}
                className={`cursor-pointer border-b border-cream/10 pb-3 outline-none transition-colors duration-150 focus-visible:border-coral/60 ${
                  isActive ? "text-coral" : "text-cream/85 hover:text-cream"
                }`}
              >
                {it}
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-[0.62rem] italic text-cream/40 md:mt-12">
          Facility names are indicative and for marketing purposes; final
          naming and provision follow the Sale &amp; Purchase Agreement.
        </p>

        {/* Other levels — quiet sibling row */}
        <div className="mt-24 grid gap-12 border-t border-cream/10 pt-16 md:mt-32 md:grid-cols-2 md:gap-20">
          {others.map((lvl) => (
            <div
              key={lvl.level}
              id={`facilities-level-${lvl.level}`}
              className="flex flex-col gap-6 sm:flex-row sm:gap-10"
            >
              <LevelHead level={lvl.level} note={lvl.note} />
              <ul className="space-y-2 text-sm font-light text-cream/85 sm:border-l sm:border-cream/15 sm:pl-10">
                {lvl.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function LevelHead({ level, note }: { level: string; note?: string }) {
  return (
    <div className="shrink-0">
      <div className="flex items-start gap-2">
        <span className="mt-3 text-[0.6rem] uppercase tracking-[0.25em] text-cream/40">
          Level
        </span>
        <span className="font-display text-7xl font-light leading-none md:text-8xl">
          {level}
        </span>
      </div>
      {note && (
        <p className="mt-2 text-sm font-light text-cream/55">{note}</p>
      )}
    </div>
  );
}

function PlanWithPins({
  active,
  setActive,
}: {
  active: number | null;
  setActive: (n: number | null) => void;
}) {
  const pins = main.pins ?? [];
  const vb = main.planViewBox ?? { w: 831, h: 515 };

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- vector plan */}
      <img
        src={main.plan}
        alt={`Park Green facilities — Level ${main.level}`}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
      />
      <svg
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {pins.map(([cx, cy, n], i) => {
          const isActive = active === n;
          return (
            <g key={i}>
              {isActive && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="none"
                  stroke="#E3947A"
                  strokeWidth={1.5}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "pg-pulse 1.6s ease-out infinite",
                  }}
                />
              )}
              {isActive && (
                <>
                  <circle cx={cx} cy={cy} r={12} fill="#E3947A" />
                  <text
                    x={cx}
                    y={cy + 0.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize={11}
                    fontWeight={600}
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {n}
                  </text>
                </>
              )}
              <circle
                cx={cx}
                cy={cy}
                r={18}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(n)}
                onClick={() => setActive(isActive ? null : n)}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
