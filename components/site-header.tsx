"use client";

// Scroll-aware fixed header. Over the hero it sits transparent with cream text;
// once the page scrolls it solidifies to a translucent cream bar with espresso
// text and a filled coral CTA (transition-all 500ms). A tiny scroll listener
// flips a single `scrolled` flag — no animation library.

import { useEffect, useState } from "react";

const NAV = ["Location", "Facilities", "Floor Plans", "Gallery", "Bukit Jalil City"] as const;
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: light up the link whose section is crossing the upper-middle
  // of the viewport (the thin band left by rootMargin).
  useEffect(() => {
    const els = NAV.map((item) =>
      document.getElementById(slug(item))
    ).filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onscreen = entries.filter((e) => e.isIntersecting);
        if (onscreen.length === 0) return;
        const top = onscreen.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-clay/15 bg-cream/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-12">
        <a href="#top" aria-label="Park Green — Pavilion Bukit Jalil" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- vector brand logo */}
          <img
            src={scrolled ? "/images/pg/logos/Logo-Park-Green-Pavilion.png" : "/images/pg/logos/logo-v2.svg"}
            alt="Park Green"
            className="h-10 w-auto md:h-11"
          />
        </a>

        <nav className="flex items-center gap-6 lg:gap-9" aria-label="Primary">
          <ul className="hidden gap-7 text-[0.7rem] font-medium uppercase tracking-[0.16em] lg:flex">
            {NAV.map((item) => {
              const id = slug(item);
              const isActive = active === id;
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative transition-colors duration-200 ${
                      scrolled
                        ? isActive
                          ? "text-espresso"
                          : "text-espresso/70 hover:text-espresso"
                        : isActive
                          ? "text-cream"
                          : "text-cream/75 hover:text-cream"
                    }`}
                  >
                    {item}
                    {/* coral underline: always on when active (scroll-spy),
                        otherwise wipes in from the left on hover */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-coral transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#enquire"
            className={`whitespace-nowrap rounded-[2px] border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
              scrolled
                ? "border-coral bg-coral text-espresso hover:bg-coral/90"
                : "border-cream/50 text-cream hover:bg-cream hover:text-espresso"
            }`}
          >
            Register
          </a>
        </nav>
      </div>
    </header>
  );
}
