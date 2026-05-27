"use client";

import { useState } from "react";
import { FLOOR_PLANS, PROJECT } from "@/lib/content";

// Clay registration band — the warm full-width form the live site closes with.
// Two-step capture that hands off to WhatsApp (no backend yet, but functional).
export function Enquiry() {
  const [step, setStep] = useState<1 | 2>(1);
  const [unit, setUnit] = useState(FLOOR_PLANS[0].type);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const message = `Hi, I'm ${name || "(name)"} — interested in Park Green, Type ${unit}. My contact: ${phone || "(phone)"}.`;
  const waLink = `https://wa.me/${PROJECT.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section id="enquire" className="bg-clay text-cream">
      <div className="reveal mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-cream/70">
          Register Interest
        </p>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-medium">
          Two steps, and we&apos;ll WhatsApp you the details.
        </h2>
        <div className="mx-auto mt-5 h-px w-12 bg-cream/40" />

        <div className="mt-10 text-left">
          {step === 1 ? (
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-cream/65">
                Step 1 / 2 — Which layout?
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FLOOR_PLANS.map((p) => (
                  <button
                    key={p.type}
                    type="button"
                    onClick={() => setUnit(p.type)}
                    className={`h-11 cursor-pointer rounded-[2px] border px-5 text-[0.74rem] font-medium uppercase tracking-[0.16em] transition-colors ${
                      unit === p.type
                        ? "border-cream bg-cream text-clay"
                        : "border-cream/40 text-cream/85 hover:border-cream"
                    }`}
                  >
                    {p.type} · {p.sqft.toLocaleString()} sf
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-10 h-12 cursor-pointer rounded-[2px] bg-espresso px-8 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-clay"
              >
                Continue
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-cream/65">
                Step 2 / 2 — Your details
              </p>
              <div className="mt-5 space-y-5">
                <Input id="name" label="Name" value={name} onChange={setName} />
                <Input id="phone" label="Contact number" value={phone} onChange={setPhone} type="tel" />
              </div>
              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-12 cursor-pointer rounded-[2px] border border-cream/40 px-6 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-cream/85 transition-colors hover:border-cream"
                >
                  Back
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-[2px] bg-espresso px-8 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-clay"
                >
                  Send on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.16em] text-cream/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full rounded-[2px] border border-cream/30 bg-cream/10 px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-cream"
      />
    </div>
  );
}
