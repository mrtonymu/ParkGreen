"use client";

// Scroll-aware fixed header. Over the hero it sits transparent with cream text;
// once the page scrolls it solidifies to a translucent cream bar with espresso
// text and a filled coral CTA (transition-all 500ms). A tiny scroll listener
// flips a single `scrolled` flag — no animation library.
//
// On <lg viewports the nav links are hidden behind a hamburger which opens a
// full-screen espresso overlay; on lg+ the links sit inline next to Register.

import { useEffect, useState } from "react";

const NAV = ["Location", "Facilities", "Floor Plans", "Gallery", "Bukit Jalil City"] as const;
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Body scroll lock + Esc-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-clay/15 bg-cream/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-5 sm:gap-4 sm:px-6 md:px-12">
          <a href="#top" aria-label="Park Green — Pavilion Bukit Jalil" className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- vector brand logo */}
            <img
              src={scrolled ? "/images/pg/logos/Logo-Park-Green-Pavilion.png" : "/images/pg/logos/logo-v2.svg"}
              alt="Park Green"
              className="h-10 w-auto md:h-11"
            />
          </a>

          <div className="flex items-center gap-3 sm:gap-6 lg:gap-9">
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              <ul className="flex gap-7 text-[0.7rem] font-medium uppercase tracking-[0.16em]">
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
            </nav>

            <a
              href="#enquire"
              className={`press-bounce whitespace-nowrap rounded-[2px] border px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 sm:px-5 ${
                scrolled
                  ? "border-coral bg-coral text-espresso hover:bg-coral/90"
                  : "border-cream/50 text-cream hover:bg-cream hover:text-espresso"
              }`}
            >
              Register
            </a>

            {/* Hamburger — only <lg. Three hairlines that flip to an × via the
                same animation when menu opens (handled by overlay below). */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 cursor-pointer place-items-center lg:hidden"
            >
              <span
                aria-hidden
                className={`block h-px w-6 transition-colors ${
                  scrolled ? "bg-espresso" : "bg-cream"
                }`}
              />
              <span
                aria-hidden
                className={`mt-1.5 block h-px w-6 transition-colors ${
                  scrolled ? "bg-espresso" : "bg-cream"
                }`}
              />
              <span
                aria-hidden
                className={`mt-1.5 block h-px w-6 transition-colors ${
                  scrolled ? "bg-espresso" : "bg-cream"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — full screen, espresso, editorial. Big serif
          links so it feels like a deliberate moment, not a hamburger dump. */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-espresso text-cream"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- vector brand logo */}
            <img
              src="/images/pg/logos/logo-v2.svg"
              alt="Park Green"
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 cursor-pointer place-items-center"
            >
              <span aria-hidden className="block h-px w-6 translate-y-px rotate-45 bg-cream" />
              <span aria-hidden className="block h-px w-6 -translate-y-px -rotate-45 bg-cream" />
            </button>
          </div>

          <nav
            className="flex grow flex-col justify-between px-6 pb-16 pt-10"
            aria-label="Primary mobile"
          >
            <ul className="space-y-7">
              {NAV.map((item, i) => (
                <li key={item}>
                  <a
                    href={`#${slug(item)}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 font-display text-3xl font-light text-cream transition-colors hover:text-coral"
                  >
                    <span className="text-[0.6rem] tabular-nums tracking-[0.22em] text-cream/35 group-hover:text-coral">
                      0{i + 1}
                    </span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#enquire"
              onClick={() => setMenuOpen(false)}
              className="mt-10 inline-flex h-12 items-center justify-center self-start rounded-[2px] bg-coral px-8 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-espresso transition-colors hover:bg-cream"
            >
              Register Interest
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
