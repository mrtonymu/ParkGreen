import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found — Park Green",
};

// Branded 404 that keeps the editorial language and offers two cheap exits:
// the home page or a direct WhatsApp ping. No spinning donut, no stack trace,
// no Next.js default — just a quiet handoff.
export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-espresso px-6 py-16 text-cream md:px-12">
      {/* fern motif, faint, off-axis */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img
        src="/images/pg/logos/fernleaf-horizontal.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 top-16 w-[520px] max-w-[60%] rotate-180 opacity-[0.06]"
      />

      <div className="relative max-w-xl text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-coral/80">
          Page not found
        </p>
        <h1 className="mt-5 font-display text-[clamp(3rem,8vw,5.5rem)] font-light leading-[0.95] tracking-tight">
          404
        </h1>
        <p className="mt-6 text-sm font-light text-cream/70">
          The page you&apos;re looking for has moved, or never existed. Head
          back to the listing or reach us directly — we&apos;ll send you the
          full Park Green deck.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-[2px] bg-coral px-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-cream"
          >
            Back to Park Green
          </Link>
          <Link
            href="/#enquire"
            className="inline-flex h-11 items-center rounded-[2px] border border-cream/40 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-coral hover:text-coral"
          >
            Register Interest
          </Link>
        </div>
      </div>
    </main>
  );
}
