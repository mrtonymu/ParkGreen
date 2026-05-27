import { PROJECT, DEVELOPER } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element -- vector brand logo */}
            <img src="/images/pg/logos/logo-v2.svg" alt="Park Green" className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-sm text-cream/60">
              {PROJECT.location}. {PROJECT.tenure} {PROJECT.propertyType} within{" "}
              {PROJECT.township}.
            </p>
            <div className="mt-6 flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- vector developer logo */}
              <img src="/images/pg/logos/malton.svg" alt="Malton Berhad" className="h-7 w-auto" />
            </div>
          </div>
          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Sales Gallery
            </h3>
            <p className="mt-4 text-sm text-cream/75">{DEVELOPER.salesGallery}</p>
            <p className="mt-2 text-sm text-cream/60">{DEVELOPER.projectAddress}</p>
          </div>
          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Developer
            </h3>
            <p className="mt-4 text-sm text-cream/75">{DEVELOPER.developer}</p>
            <p className="mt-2 text-sm text-cream/60">
              Operated by {DEVELOPER.operator}
            </p>
            <p className="mt-2 text-xs text-cream/45">{DEVELOPER.blocks}</p>
          </div>
        </div>
        <div className="mt-16 border-t border-cream/15 pt-8 text-xs leading-relaxed text-cream/45">
          <p>
            {PROJECT.name} — {DEVELOPER.propertyType}, {DEVELOPER.tenure}.
            Developer&apos;s licence {DEVELOPER.license}; advertising &amp; sales
            permit {DEVELOPER.adPermit}, issued by {DEVELOPER.authority}. Expected
            completion {DEVELOPER.completion}. Selling price{" "}
            {DEVELOPER.priceRange}; Bumiputera discount {DEVELOPER.bumiDiscount}.
            All figures are indicative and subject to the sale &amp; purchase
            agreement. Renders are artist&apos;s impressions.
          </p>
        </div>
      </div>
    </footer>
  );
}
