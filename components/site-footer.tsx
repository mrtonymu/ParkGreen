import { PROJECT, DEVELOPER, AWARDS } from "@/lib/content";
import { WA_TEXT, waLink } from "@/lib/wa";

// Mirrors the SiteHeader NAV so internal links stay coherent (good for SEO
// crawlers and for buyers who reach the bottom and want to jump back).
const NAV = [
  ["Location", "#location"],
  ["Facilities", "#facilities"],
  ["Floor Plans", "#floor-plans"],
  ["Gallery", "#gallery"],
  ["Bukit Jalil City", "#bukit-jalil-city"],
  ["Register", "#enquire"],
] as const;

// Pretty-print +60169177882 → "+60 16-917 7882" for the footer Contact line.
function formatPhone(intl: string): string {
  if (!intl.startsWith("60")) return `+${intl}`;
  const local = intl.slice(2);
  return `+60 ${local.slice(0, 2)}-${local.slice(2, 5)} ${local.slice(5)}`;
}

// Malaysian local format: 60169177882 → "016-917 7882". Used in the
// professional attribution line (which follows Malaysian REN convention).
function formatPhoneLocal(intl: string): string {
  if (!intl.startsWith("60")) return intl;
  const local = "0" + intl.slice(2);
  return `${local.slice(0, 3)}-${local.slice(3, 6)} ${local.slice(6)}`;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const waHref = waLink({ utm: "footer", text: WA_TEXT.generic });
  const phonePretty = formatPhone(PROJECT.whatsapp);
  const phoneLocal = formatPhoneLocal(PROJECT.whatsapp);

  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 md:px-12">
        {/* Recognition strip — Malton's award-body affiliations, slim and
            below the radar. Each logo sits on a small paper plate so it reads
            against dark regardless of how the source PNG was exported. */}
        <div className="mb-16 border-b border-cream/10 pb-12">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-clay">
            Recognized By
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
            {AWARDS.map((a) => (
              <li
                key={a.label}
                title={a.label}
                className="rounded-[2px] bg-paper px-4 py-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- award-body logo */}
                <img
                  src={a.src}
                  alt={a.label}
                  className="h-7 w-auto object-contain md:h-8"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Brand · Visit · Explore */}
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element -- vector brand logo */}
            <img
              src="/images/pg/logos/logo-v2.svg"
              alt="Park Green"
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm text-cream/60">
              {PROJECT.location}. {PROJECT.tenure} {PROJECT.propertyType}{" "}
              within {PROJECT.township}.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- vector developer logo */}
              <img
                src="/images/pg/logos/malton.svg"
                alt="Malton Berhad"
                className="h-7 w-auto"
              />
            </div>
          </div>

          {/* Visit — Sales Gallery + Contact */}
          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Sales Gallery
            </h3>
            <p className="mt-4 text-sm text-cream/75">
              {DEVELOPER.salesGallery}
            </p>
            <p className="mt-2 text-sm text-cream/60">
              {DEVELOPER.projectAddress}
            </p>

            <h3 className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Contact
            </h3>
            <p className="mt-4 text-sm">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cream underline-offset-4 transition-colors hover:text-coral hover:underline"
              >
                WhatsApp {phonePretty}
              </a>
            </p>
            <p className="mt-2 text-[0.7rem] text-cream/45">
              Personal reply by Anderson <span className="opacity-60">·</span> Within the hour
            </p>
          </div>

          {/* Explore — internal nav, mirrors SiteHeader */}
          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-cream/75 underline-offset-4 transition-colors hover:text-coral hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclosure + sales-consultant attribution.
            KPKT/HDA 1966 requires developer licence, APDL, price range and
            Bumi discount on all property advertising — we satisfy that with
            the collapsible block (visible in the DOM, indexable, one tap to
            expand). The shorter "Official sales page…" line stays open
            because it speaks to the buyer, not the regulator. */}
        <div className="mt-16 border-t border-cream/15 pt-8 text-xs leading-relaxed text-cream/45">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-cream/55 transition-colors hover:text-cream/80 [&::-webkit-details-marker]:hidden">
              <span>Developer Disclosure &amp; Licence (KPKT)</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <p className="mt-4 text-cream/45">
              {PROJECT.name} — {DEVELOPER.propertyType}, {DEVELOPER.tenure}.
              Developed by {DEVELOPER.developer}, operated by{" "}
              {DEVELOPER.operator}. {DEVELOPER.blocks}. Developer&apos;s licence{" "}
              {DEVELOPER.license}; advertising &amp; sales permit{" "}
              {DEVELOPER.adPermit}, issued by {DEVELOPER.authority}. Expected
              completion {DEVELOPER.completion}. Selling price{" "}
              {DEVELOPER.priceRange}; Bumiputera discount{" "}
              {DEVELOPER.bumiDiscount}.
            </p>
          </details>
          <p className="mt-4">
            Official sales page. All renderings are artist&apos;s impressions.
            Prices, packages and unit details subject to the final signed SPA.
          </p>
        </div>

        {/* Bottom bar — Privacy + agent attribution (Malaysian REN convention) */}
        <div className="mt-10 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <a
            href="/privacy"
            className="underline-offset-4 hover:text-cream hover:underline"
          >
            Privacy Notice (PDPA)
          </a>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>&copy; {year} by Anderson Chen</span>
            <span aria-hidden className="opacity-50">|</span>
            <span>REN 35567</span>
            <span aria-hidden className="opacity-50">|</span>
            <span>Dignity Real Estate</span>
            <span aria-hidden className="opacity-50">|</span>
            <span>{phoneLocal}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
