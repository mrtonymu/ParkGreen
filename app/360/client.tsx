"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsAppFab } from "@/components/whatsapp-fab";

const CLIP_TOP_PX = 100;

export function ThreeSixtyClient() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="fixed inset-0 bg-espresso text-cream">
      <iframe
        src="https://parkgreen.com.my/360/?embedded=1"
        title="Park Green — 360° walkthrough"
        loading="eager"
        allow="accelerometer; gyroscope; xr-spatial-tracking; fullscreen"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-fullscreen"
        onLoad={() => setLoaded(true)}
        style={{
          clipPath: `inset(${CLIP_TOP_PX}px 0 0 0)`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 600ms ease-out",
        }}
        className="absolute inset-0 h-full w-full border-0"
      />

      {/* Loading veil — covered once the iframe fires onLoad. Mirrors the
          editorial language so the wait feels intentional, not broken. */}
      {!loaded && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-espresso"
        >
          <span className="pulse-river inline-block h-2.5 w-2.5 rounded-full bg-coral" />
          <p className="mt-6 text-[0.62rem] uppercase tracking-[0.32em] text-cream/70">
            Loading the 360°
          </p>
          <p className="mt-2 text-xs text-cream/45">
            Streaming directly from the developer&apos;s server.
          </p>
        </div>
      )}

      {/* Sits in the strip we cropped off the iframe — always visible. */}
      <Link
        href="/#gallery"
        className="absolute left-6 top-6 z-10 inline-flex items-center gap-3 rounded-full border border-cream/30 bg-espresso/80 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur-sm transition-colors hover:border-coral hover:text-coral md:left-10 md:top-8"
      >
        <span aria-hidden>←</span>
        Back to Park Green
      </Link>

      <WhatsAppFab utm="fab-360" />
    </main>
  );
}
