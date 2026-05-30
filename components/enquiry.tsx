"use client";

import { useState } from "react";
import { FLOOR_PLANS } from "@/lib/content";
import { waLink } from "@/lib/wa";

// Editorial register moment — clay band, the page's second warm chapter
// (Sustainability is the first). Sits between Highlights (dark) and Footer
// (dark) so it lands as a clear "now register" chapter break, not a fourth
// dark section that fuses into a single continuous block. No nested panel —
// the form sits directly on the clay, same editorial vocabulary as Hero /
// Facilities / BJC. Submits to WhatsApp; on success the content swaps to a
// Thank You view so the buyer knows their message went.

// Six unique sqft sizes — A and A1 share 1,201, B and B1 share 1,408. Buyers
// pick by size; agent clarifies layout variant in the WhatsApp follow-up.
const UNIT_SIZES = Array.from(
  new Map(
    FLOOR_PLANS.map((p) => [p.sqft, { sqft: p.sqft, fromPrice: p.fromPrice }])
  ).values()
).sort((a, b) => a.sqft - b.sqft);

export function Enquiry() {
  const [selected, setSelected] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pdpa, setPdpa] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (sqft: number) =>
    setSelected((s) =>
      s.includes(sqft) ? s.filter((x) => x !== sqft) : [...s, sqft]
    );

  const sizesText = selected
    .map((s) => `${s.toLocaleString()} sq.ft.`)
    .join(", ");
  const message = `Hi, I'm ${name || "(name)"} — interested in Park Green${
    sizesText ? ` (${sizesText})` : ""
  }. My contact: ${phone || "(phone)"}.`;

  const canSubmit =
    Boolean(name.trim()) &&
    Boolean(phone.trim()) &&
    selected.length > 0 &&
    pdpa;
  const sendUrl = waLink({ utm: "enquiry", text: message });

  const reset = () => {
    setSelected([]);
    setName("");
    setPhone("");
    setPdpa(false);
    setShowErrors(false);
    setSubmitted(false);
  };

  return (
    <section
      id="enquire"
      className="grain relative overflow-hidden bg-clay py-24 text-cream md:py-32"
    >
      <div className="relative mx-auto max-w-xl px-6 md:px-12">
        {/* Framed eyebrow — cream hairlines flanking (coral fades into clay,
            cream pops). Centered editorial chapter marker. */}
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-cream/40" />
          <p className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-cream md:text-[0.65rem]">
            The Final Piece <span className="opacity-60">·</span> Of Bukit Jalil City
          </p>
          <span aria-hidden className="h-px flex-1 bg-cream/40" />
        </div>

        {/* Coral diamond ornament under the framed eyebrow */}
        <div className="mt-6 flex justify-center">
          <svg
            className="h-2.5 w-2.5"
            viewBox="0 0 10 10"
            fill="#E3947A"
            aria-hidden
          >
            <path d="M5 0L9.94975 4.94975L5 9.89949L0.0502526 4.94975L5 0Z" />
          </svg>
        </div>

        {submitted ? (
          <ThankYou onReset={reset} />
        ) : (
          <RegisterForm
            selected={selected}
            toggle={toggle}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            pdpa={pdpa}
            setPdpa={setPdpa}
            canSubmit={canSubmit}
            sendUrl={sendUrl}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            onSubmit={() => setSubmitted(true)}
          />
        )}
      </div>
    </section>
  );
}

function RegisterForm({
  selected,
  toggle,
  name,
  setName,
  phone,
  setPhone,
  pdpa,
  setPdpa,
  canSubmit,
  sendUrl,
  showErrors,
  setShowErrors,
  onSubmit,
}: {
  selected: number[];
  toggle: (sqft: number) => void;
  name: string;
  setName: (s: string) => void;
  phone: string;
  setPhone: (s: string) => void;
  pdpa: boolean;
  setPdpa: (b: boolean) => void;
  canSubmit: boolean;
  sendUrl: string;
  showErrors: boolean;
  setShowErrors: (b: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <>
      {/* Big two-line headline — cream Cormorant, same vocabulary as Hero */}
      <div className="mt-8 text-center">
        <h2 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-light uppercase leading-[0.9] tracking-[0.06em] text-cream">
          Register
        </h2>
        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-cream/65 md:text-xs">
          Your Interest
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {/* Luxury Residences — multi-select sqft, plain labels (no cards) */}
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream/70">
            Luxury Residences *
          </p>
          <p className="mt-1 text-[0.62rem] text-cream/40">
            Pick every size you&apos;re open to.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {UNIT_SIZES.map((u) => {
              const isOn = selected.includes(u.sqft);
              return (
                <li key={u.sqft}>
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={() => toggle(u.sqft)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-coral"
                    />
                    <span className="flex flex-col leading-tight">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isOn ? "text-coral" : "text-cream"
                        }`}
                      >
                        {u.sqft.toLocaleString()} sq.ft.
                      </span>
                      <span className="mt-0.5 text-xs font-light text-cream/55">
                        From {u.fromPrice}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Name + Contact (stack mobile, 2-col md+) */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-8">
          <UnderlineInput
            id="name"
            label="Name *"
            value={name}
            onChange={setName}
            placeholder="Full name (as per NRIC / passport)"
          />
          <UnderlineInput
            id="phone"
            label="Contact Number *"
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder="+60 12 345 6789"
          />
        </div>

        {/* PDPA consent */}
        <label className="flex cursor-pointer items-start gap-3 text-[0.62rem] leading-relaxed text-cream/65">
          <input
            type="checkbox"
            checked={pdpa}
            onChange={(e) => setPdpa(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-coral"
          />
          <span>
            I consent to my data being used to respond to my enquiry
            about Park Green. See our{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream underline-offset-4 hover:underline"
            >
              Privacy Notice (PDPA)
            </a>
            .
          </span>
        </label>

        {/* Submit + trust line */}
        <div className="flex flex-col items-center">
          <a
            href={canSubmit ? sendUrl : "#"}
            target={canSubmit ? "_blank" : undefined}
            rel={canSubmit ? "noopener noreferrer" : undefined}
            aria-disabled={!canSubmit}
            onClick={(e) => {
              if (!canSubmit) {
                e.preventDefault();
                setShowErrors(true);
                return;
              }
              // Defer success-state flip so the WhatsApp deep-link actually
              // navigates first (some browsers cancel the open if state
              // re-renders before the click resolves).
              setTimeout(onSubmit, 100);
            }}
            className={`inline-flex h-12 items-center rounded-full border-2 px-10 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${
              canSubmit
                ? "border-coral bg-coral text-espresso hover:border-cream hover:bg-cream"
                : "cursor-not-allowed border-cream/25 bg-transparent text-cream/35"
            }`}
          >
            Send on WhatsApp
          </a>
          <p className="mt-5 text-[0.6rem] uppercase tracking-[0.32em] text-cream/55">
            Reply within an hour
          </p>

          {showErrors && !canSubmit && (
            <ul className="mt-5 list-none space-y-1 text-center text-[0.62rem] text-coral">
              {selected.length === 0 && (
                <li>Please select at least one size.</li>
              )}
              {!name.trim() && <li>Please enter your name.</li>}
              {!phone.trim() && (
                <li>Please enter your contact number.</li>
              )}
              {!pdpa && <li>Please accept the privacy notice.</li>}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function ThankYou({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-8 text-center">
      <h2 className="font-display text-[clamp(2.75rem,7vw,5rem)] font-light uppercase leading-[0.9] tracking-[0.06em] text-cream">
        Thank You
      </h2>
      <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-cream/65 md:text-xs">
        For Registering
      </p>

      <p className="mx-auto mt-12 max-w-sm text-sm font-light leading-relaxed text-cream/75">
        WhatsApp has opened in a new tab with your details ready to send.
        We&apos;ll reply within the hour.
      </p>

      <div className="mt-12 flex flex-col items-center gap-5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-12 items-center rounded-full border border-cream/40 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream/85 transition-colors hover:border-coral hover:text-coral"
        >
          Send another
        </button>
        <p className="text-[0.6rem] uppercase tracking-[0.28em] text-cream/40">
          If WhatsApp didn&apos;t open, check your popup blocker.
        </p>
      </div>
    </div>
  );
}

function UnderlineInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream/70">
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 block w-full border-0 border-b border-cream/25 bg-transparent pb-2 pt-1 text-sm font-light text-cream placeholder:text-cream/35 focus:border-coral focus:outline-none"
      />
    </label>
  );
}
