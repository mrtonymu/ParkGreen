"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { FLOOR_PLANS, PROJECT } from "@/lib/content";

const fmt = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});

export function FloorPlans() {
  const [active, setActive] = useState(0);
  const plan = FLOOR_PLANS[active];

  const [price, setPrice] = useState(1500000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(4.1);
  const [years, setYears] = useState(35);

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
        subtitle="Six sky semi-D layouts, 1,201 to 1,905 sq.ft. — with your monthly instalment, live."
      />

      <div className="mt-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Floor plan types">
        {FLOOR_PLANS.map((p, i) => (
          <button
            key={p.type}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`h-11 cursor-pointer rounded-[2px] border px-6 text-[0.74rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${
              i === active
                ? "border-coral bg-coral text-espresso"
                : "border-espresso/20 text-espresso/70 hover:border-espresso/50"
            }`}
          >
            Type {p.type}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-espresso/10 bg-paper">
          <Image
            src={plan.image}
            alt={`Park Green floor plan, Type ${plan.type}`}
            fill
            unoptimized
            className="object-contain p-6"
            sizes="(min-width:768px) 45vw, 90vw"
          />
        </div>

        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border border-clay/50 text-clay">
              <span className="text-[0.5rem] uppercase tracking-[0.16em]">Type</span>
              <span className="text-lg font-medium leading-none">{plan.type}</span>
            </span>
            <p className="text-sm text-espresso/60">
              {plan.sqft.toLocaleString()} sq.ft. built-up · {plan.block}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-espresso/10 bg-espresso/10">
            <Spec label="Bedrooms" value={plan.beds} />
            <Spec label="Bathrooms" value={String(plan.baths)} />
            <Spec label="From" value={plan.fromPrice} />
            <Spec label="Tenure" value={PROJECT.tenure} />
          </dl>

          <div className="mt-10">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Monthly instalment
            </h3>
            <p className="mt-3 text-[clamp(2.25rem,5vw,3.25rem)] font-light leading-none text-coral">
              {fmt.format(Math.round(monthly))}
              <span className="text-base text-espresso/50"> /mo</span>
            </p>

            <div className="mt-8 space-y-6">
              <Field label="Price" value={fmt.format(price)}>
                <input aria-label="Price" type="range" min={1200000} max={2600000} step={10000} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full cursor-pointer accent-coral" />
              </Field>
              <div className="grid grid-cols-3 gap-6">
                <Field label="Down" value={`${downPct}%`}>
                  <input aria-label="Down payment percent" type="range" min={5} max={30} step={1} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="w-full cursor-pointer accent-coral" />
                </Field>
                <Field label="Rate" value={`${rate.toFixed(1)}%`}>
                  <input aria-label="Interest rate percent" type="range" min={3} max={6} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full cursor-pointer accent-coral" />
                </Field>
                <Field label="Tenure" value={`${years} yr`}>
                  <input aria-label="Loan tenure years" type="range" min={10} max={35} step={1} value={years} onChange={(e) => setYears(+e.target.value)} className="w-full cursor-pointer accent-coral" />
                </Field>
              </div>
            </div>

            <p className="mt-6 text-xs text-espresso/45">
              Indicative only. From {PROJECT.fromPrice}; actual price varies by
              unit and block. Excludes legal fees, MRTA and stamp duty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream px-6 py-6">
      <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-espresso/45">{label}</dt>
      <dd className="mt-1 text-xl font-medium text-espresso">{value}</dd>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-xs">
        <span className="uppercase tracking-[0.16em] text-espresso/50">{label}</span>
        <span className="font-medium text-espresso">{value}</span>
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
