"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";
import { FLOOR_PLANS, PROJECT } from "@/lib/content";
import { waLink } from "@/lib/wa";

const fmt = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});

const sqmFmt = new Intl.NumberFormat("en-MY", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

// Floor Plans — cream / editorial. The page rhythm depends on Facilities (dark)
// → FloorPlans (light); don't flip this section to espresso.
//
// Desktop layout (lg+): info column (1/3) + big plan (2/3). Mobile reorders so
// the plan image leads (it's the actual decision driver), with VR + Keyplan
// after, and the calculator's secondary sliders collapsed behind a toggle.
export function FloorPlans() {
  const [active, setActive] = useState(0);
  const plan = FLOOR_PLANS[active];

  const [price, setPrice] = useState(1500000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(4.1);
  const [years, setYears] = useState(35);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const monthly = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, downPct, rate, years]);

  return (
    <section
      id="floor-plans"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Floor Plans"
        subtitle="Eight sky semi-D layouts, 1,201 to 1,905 sq.ft. — walk through in VR, then dial in your monthly instalment."
      />

      {/* Type pills — mobile: single-row horizontal scroll (8 pills wrapping
          to 3 rows ate too much vertical space). Desktop unchanged. */}
      <div
        className="mt-12 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Floor plan types"
      >
        {FLOOR_PLANS.map((p, i) => (
          <button
            key={p.type}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-[2px] border px-5 text-[0.74rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
              i === active
                ? "border-coral bg-coral text-espresso"
                : "border-espresso/20 text-espresso/70 hover:border-espresso/50"
            }`}
          >
            Type {p.type}
          </button>
        ))}
      </div>

      {/* Info (1/3) · Plan (2/3) on desktop. On mobile we reorder via `order-*`
          so the sequence reads: TypeHeader+Specs → Plan image → mid WA CTA →
          VR button → Keyplan. The plan image holds row 1-3 col 2-3 on desktop
          (lg:row-span-3 + lg:col-start-2) so VR + Keyplan stack neatly under
          TypeHeader in col 1. */}
      <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-12">
        {/* 1. Type header + specs */}
        <div className="order-1 lg:col-span-1 lg:col-start-1 lg:row-start-1">
          {/* Big Type letter with optional mirror suffix */}
          <div className="flex items-start gap-3">
            <span className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-espresso/40">
              Type
            </span>
            <span className="font-display text-7xl font-light leading-none text-espresso md:text-8xl">
              {plan.type}
            </span>
            {plan.mirror && (
              <span className="mb-2 self-end text-base font-light text-espresso/55 md:text-lg">
                / {plan.mirror}
              </span>
            )}
          </div>
          <p className="mt-5 text-sm font-light text-espresso/60">
            {plan.block}
          </p>

          {/* Specs — 2x2 grid, no boxes, just typography */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-espresso/45">
                Built-up
              </dt>
              <dd className="mt-2 text-lg font-medium leading-none text-espresso">
                {plan.sqft.toLocaleString()}
                <span className="text-xs font-normal text-espresso/55">
                  {" "}
                  sq.ft.
                </span>
              </dd>
              <dd className="mt-1 text-[0.7rem] text-espresso/45">
                {sqmFmt.format(plan.sqm)} sq.m.
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-espresso/45">
                Bed · Bath
              </dt>
              <dd className="mt-2 text-lg font-medium leading-none text-espresso">
                {plan.beds} · {plan.baths}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-espresso/45">
                From
              </dt>
              <dd className="mt-2 text-lg font-medium leading-none text-espresso">
                {plan.fromPrice}
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-espresso/45">
                Tenure
              </dt>
              <dd className="mt-2 text-lg font-medium leading-none text-espresso">
                {PROJECT.tenure}
              </dd>
            </div>
          </dl>
        </div>

        {/* 2. Big floor plan — tap-to-zoom on all sizes (mobile users couldn't
            read details before; desktop users get a clean full-screen view
            with pinch/scroll on touch laptops). */}
        <div className="order-2 lg:col-span-2 lg:col-start-2 lg:row-span-3 lg:row-start-1">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label={`Enlarge Type ${plan.type} floor plan`}
            className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-espresso/10 bg-paper"
          >
            <Image
              src={plan.image}
              alt={`Park Green floor plan, Type ${plan.type}${
                plan.mirror ? ` (also available as ${plan.mirror})` : ""
              }`}
              fill
              unoptimized
              className="object-contain p-6 md:p-10"
              sizes="(min-width:1024px) 60vw, 90vw"
            />
            {/* Tap-to-zoom hint — small, lives bottom-right so it doesn't
                fight the plan's title block (usually top-left of the SVG). */}
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-espresso/85 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm transition-opacity duration-200 group-hover:bg-espresso md:bottom-4 md:right-4">
              <ExpandIcon />
              Tap to enlarge
            </span>
          </button>
        </div>

        {/* 3. Mid WA CTA — mobile only. Buyers who decided "this layout works"
            after seeing the enlarged plan get an immediate WhatsApp out
            without scrolling past the calculator. */}
        <div className="order-3 lg:hidden">
          <a
            href={waLink({
              utm: "floor-plans",
              text: `Hi, I'm interested in Type ${plan.type} at Park Green. Could you share the full PDF + current VVIP price + payment scheme?`,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-[2px] border border-espresso/15 bg-espresso/[0.03] px-5 py-4 text-sm text-espresso transition-colors duration-200 hover:border-coral/60 hover:bg-coral/5"
          >
            <span>
              <span className="font-medium">Like Type {plan.type}?</span>
              <span className="ml-2 text-espresso/60">
                Get the PDF on WhatsApp
              </span>
            </span>
            <span aria-hidden className="text-coral">
              →
            </span>
          </a>
        </div>

        {/* 4. Virtual Tour button */}
        {plan.virtualTour && (
          <div className="order-4 lg:col-span-1 lg:col-start-1 lg:row-start-2">
            <a
              href={plan.virtualTour}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-coral px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-coral transition-colors duration-200 hover:bg-coral hover:text-cream focus-visible:bg-coral focus-visible:text-cream"
            >
              <VrCubeIcon />
              <span>Virtual Tour</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        )}

        {/* 5. Keyplan — small position diagram. SVG strokes are white, so
            the card must be dark for the floor outlines to read. */}
        <div className="order-5 lg:col-span-1 lg:col-start-1 lg:row-start-3">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-espresso/40">
            Keyplan — position on floor
          </p>
          <div className="mt-3 max-w-sm rounded-[2px] bg-espresso p-6">
            <Image
              src={plan.keyplan}
              alt={`Type ${plan.type} position on the floorplate`}
              width={300}
              height={220}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Monthly instalment — separated band, full width */}
      <div className="mt-20 border-t border-espresso/10 pt-14 md:mt-24 md:pt-16">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Monthly instalment
            </h3>
            <p className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-light leading-none text-coral">
              {fmt.format(Math.round(monthly))}
              <span className="text-base text-espresso/50"> /mo</span>
            </p>
          </div>

          <div className="space-y-6">
            <Field label="Price" value={fmt.format(price)}>
              <input
                aria-label="Price"
                type="range"
                min={1200000}
                max={2600000}
                step={10000}
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                className="w-full cursor-pointer accent-coral"
              />
            </Field>

            {/* Advanced sliders — mobile collapses behind a toggle since most
                buyers only care about Price → Monthly. Desktop always shows
                all three side-by-side (md:grid wins over `hidden`). */}
            <button
              type="button"
              onClick={() => setShowAdvanced((s) => !s)}
              aria-expanded={showAdvanced}
              className="flex w-full cursor-pointer items-center justify-between rounded-[2px] border border-espresso/15 px-4 py-3 text-xs uppercase tracking-[0.16em] text-espresso/60 transition-colors hover:border-espresso/40 md:hidden"
            >
              <span>
                {showAdvanced ? "Hide" : "Adjust"} down · rate · tenure
              </span>
              <span
                aria-hidden
                className={`transition-transform duration-200 ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>
            <div
              className={`grid-cols-1 gap-6 sm:grid-cols-3 md:!grid ${
                showAdvanced ? "grid" : "hidden"
              }`}
            >
              <Field label="Down" value={`${downPct}%`}>
                <input
                  aria-label="Down payment percent"
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={downPct}
                  onChange={(e) => setDownPct(+e.target.value)}
                  className="w-full cursor-pointer accent-coral"
                />
              </Field>
              <Field label="Rate" value={`${rate.toFixed(1)}%`}>
                <input
                  aria-label="Interest rate percent"
                  type="range"
                  min={3}
                  max={6}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(+e.target.value)}
                  className="w-full cursor-pointer accent-coral"
                />
              </Field>
              <Field label="Tenure" value={`${years} yr`}>
                <input
                  aria-label="Loan tenure years"
                  type="range"
                  min={10}
                  max={35}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(+e.target.value)}
                  className="w-full cursor-pointer accent-coral"
                />
              </Field>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-espresso/45">
          Indicative only. From {PROJECT.fromPrice}; actual price varies by unit
          and block. Excludes legal fees, MRTA and stamp duty.
        </p>

        {/* Reciprocity CTA — "8 plans + VVIP price + payment scheme" stacks
            three concrete deliverables so the WhatsApp ask reads as a value
            exchange, not a generic "contact us". */}
        <p className="mt-10 text-sm text-espresso/70">
          Want it on paper?{" "}
          <a
            href={waLink({
              utm: "floor-plans",
              text: "Hi, I'd like all 8 Park Green floor plan PDFs, the current VVIP price list and the latest payment scheme.",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-coral underline-offset-4 transition-colors hover:underline"
          >
            Get all 8 floor plans + VVIP price + payment scheme on WhatsApp{" "}
            <span aria-hidden className="arrow-wiggle">
              →
            </span>
          </a>
        </p>
      </div>

      {zoomOpen && (
        <Lightbox
          photos={[plan.image]}
          index={0}
          alt={`Park Green floor plan, Type ${plan.type}`}
          onClose={() => setZoomOpen(false)}
          onIndex={() => {}}
        />
      )}
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-xs">
        <span className="uppercase tracking-[0.16em] text-espresso/50">
          {label}
        </span>
        <span className="font-medium text-espresso">{value}</span>
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

// Same 3D cube glyph the official site uses for the Virtual Tour CTA — kept
// because it reads as "3D space" instantly.
function VrCubeIcon() {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11.8 9.4V4.6c0-.21-.06-.42-.16-.6a1.2 1.2 0 0 0-.44-.44L7 1.16a1.2 1.2 0 0 0-1.2 0L1.6 3.56A1.2 1.2 0 0 0 1 4.6v4.81c0 .43.23.82.6 1.03l4.2 2.4a1.2 1.2 0 0 0 1.2 0l4.2-2.4c.37-.21.6-.6.6-1.04Z" />
      <path d="M6.4 13V7" />
      <path d="M6.4 7l5.24-3.02" />
      <path d="M1.16 3.98L6.4 7" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
    </svg>
  );
}
