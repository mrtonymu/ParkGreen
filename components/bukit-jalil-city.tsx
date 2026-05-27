import { SectionHeading } from "@/components/section-heading";
import { BUKIT_JALIL_CITY } from "@/lib/content";

// Replaces the construction-progress timeline: Park Green completes in 2029, so
// rather than show an empty site, we show the proven, award-winning township it
// completes — the strongest trust signal Malton carries here.
export function BukitJalilCity() {
  return (
    <section
      id="bukit-jalil-city"
      className="reveal mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32"
    >
      <SectionHeading
        title="Bukit Jalil City"
        subtitle="Park Green is the final piece of an integrated township already built, awarded and lived in."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-espresso/10 bg-espresso/10 sm:grid-cols-2 lg:grid-cols-3">
        {BUKIT_JALIL_CITY.map((m) => (
          <li key={m.name} className="flex flex-col bg-cream px-7 py-8">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-clay">
              Est. {m.year}
            </span>
            <h3 className="mt-2 font-display text-xl font-medium text-espresso">
              {m.name}
            </h3>
            <ul className="mt-4 space-y-2">
              {m.notes.map((n) => (
                <li
                  key={n}
                  className="flex gap-2.5 text-sm leading-snug text-espresso/70"
                >
                  <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-coral" />
                  {n}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
