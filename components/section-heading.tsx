import type { ReactNode } from "react";

// Centered, uppercase, letter-spaced title with a clay diamond ornament —
// the section-title treatment used throughout the live site.
export function SectionHeading({
  title,
  subtitle,
  tone = "light",
  className = "",
}: {
  title: ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const head = tone === "dark" ? "text-cream" : "text-clay";
  const sub = tone === "dark" ? "text-cream/70" : "text-espresso/60";
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={`font-display font-medium uppercase tracking-[0.14em] text-[clamp(2rem,4.2vw,3rem)] ${head}`}
      >
        {title}
      </h2>
      <div className="ornament mt-5" aria-hidden>
        <span className="block h-1.5 w-1.5 rotate-45 bg-clay" />
      </div>
      {subtitle && (
        <p className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed ${sub}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
