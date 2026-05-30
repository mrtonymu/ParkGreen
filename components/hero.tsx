// Hero — editorial, left-anchored brand lockup over the full-bleed render.
// Text sits in the calm left zone, clear of any baked-in signage; a directional
// scrim (dark-left → clear-right) keeps it legible without flattening the
// render. The top nav lives in the global <SiteHeader/>, fixed above this.
// Server component; the entrance (rise) and parallax are pure CSS. Background
// is Park Green's official golden-hour township aerial.

import Image from "next/image";
import heroRender from "@/public/images/pg/about_img_glow.jpg";
import { WatchFilm } from "@/components/watch-film";
import { PROJECT } from "@/lib/content";

export function Hero() {
  return (
    <header id="top" className="relative isolate flex min-h-svh flex-col bg-espresso text-cream">
      {/* Full-bleed render + directional scrim */}
      <div className="grain absolute inset-0 -z-10 overflow-hidden">
        <div className="parallax absolute -top-[15%] left-0 h-[130%] w-full">
          <Image
            src={heroRender}
            alt="Park Green, Bukit Jalil"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-left lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/65 to-espresso/35 sm:via-espresso/45 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/70 via-espresso/20 to-transparent" />
      </div>

      {/* Editorial lockup — left-anchored, vertically centered */}
      <div className="flex flex-1 flex-col items-start justify-center px-6 pt-24 md:px-12">
        <div className="max-w-xl">
          <div className="rise flex items-center gap-3">
            <span className="h-px w-8 bg-coral" aria-hidden />
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-cream/85">
              Now Registering · Completing 2029
            </span>
          </div>

          <p
            className="rise mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95]"
            style={{ animationDelay: "80ms" }}
          >
            Park Green
          </p>
          <p
            className="rise mt-3 text-[0.72rem] uppercase tracking-[0.42em] text-cream/80"
            style={{ animationDelay: "140ms" }}
          >
            Bukit Jalil City · Kuala Lumpur
          </p>

          <h1
            className="rise mt-6 font-display text-[clamp(1.4rem,3vw,2.25rem)] font-normal leading-snug text-cream/90"
            style={{ animationDelay: "220ms" }}
          >
            4 bedrooms, 50 storeys
            <br />
            one bridge to Pavilion.
          </h1>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <a
              href="#enquire"
              className="breathe-halo inline-flex h-12 items-center justify-center rounded-full bg-coral px-9 text-[0.74rem] font-medium uppercase tracking-[0.16em] text-espresso transition-colors duration-200 hover:bg-cream"
            >
              Get VVIP Price &amp; Floor Plans
            </a>
            <WatchFilm />
          </div>
        </div>
      </div>

      {/* Key facts — slim editorial strip, left-aligned */}
      <div className="rise px-6 pb-9 md:px-12" style={{ animationDelay: "420ms" }}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/15 pt-5 sm:gap-x-8">
          <Stat value={`From ${PROJECT.fromPrice}`} label="VVIP Open" accent />
          <Divider />
          <Stat value="Freehold" label="Tenure" />
          <Divider />
          <Stat value="By Malton" label="6 delivered in BJC" />
          <Divider />
          <Stat value="1,201–1,905" label="Sq.ft built-up" />
        </div>
      </div>
    </header>
  );
}

function Divider() {
  return <span aria-hidden className="hidden h-5 w-px bg-cream/20 sm:block" />;
}

function Stat({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`font-display text-lg font-semibold tracking-tight sm:text-xl ${accent ? "text-coral" : "text-cream"}`}
      >
        {value}
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/55">
        {label}
      </span>
    </div>
  );
}
