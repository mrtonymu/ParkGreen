import { BUKIT_JALIL_CITY, PROJECT } from "@/lib/content";

// Editorial Malton portfolio — chronological. Sorting ascending lets the
// reader trace the developer's growth: shop offices (2017–18) → high-rise
// residences (2019, 2021) → flagship mall (2021) → international hotel
// (2023) → Park Green as the closer (2029). Each row's year sits left,
// project + facts right, hairline divider between. No cards, no grid.
const TIMELINE = [...BUKIT_JALIL_CITY].sort(
  (a, b) => Number(a.year) - Number(b.year)
);

export function BukitJalilCity() {
  return (
    <section
      id="bukit-jalil-city"
      className="grain relative overflow-hidden bg-espresso py-24 text-cream md:py-32"
    >
      {/* fern motif — matches Facilities + 404 + Gallery dark sections */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img
        src="/images/pg/logos/fernleaf-horizontal.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-20 w-[520px] max-w-[55%] opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-5xl px-6 md:px-12">
        {/* Section head — same left-anchored language as Facilities */}
        <div className="max-w-xl">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-coral/80">
            Track Record
          </p>
          <h2 className="mt-5 font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight">
            Bukit Jalil City
          </h2>
          <p className="mt-5 text-sm font-light text-cream/65">
            Six projects delivered into one integrated township —
            shop-offices, residences, the flagship mall, an international
            hotel. Park Green is the seventh, completing the skyline Malton
            has spent a decade building.
          </p>
        </div>

        {/* Timeline rows — year on the left, project + facts right. The top
            of the list is bounded by a hairline; each row gets its own hairline. */}
        <ol className="mt-20 border-t border-cream/15">
          {TIMELINE.map((m) => (
            <li
              key={m.name}
              className="grid grid-cols-[5rem_1fr] gap-6 border-b border-cream/15 py-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10"
            >
              <span className="font-display text-2xl font-light leading-none text-cream/55 md:text-3xl">
                {m.year}
              </span>
              <div>
                <h3 className="font-display text-xl font-light leading-tight md:text-2xl">
                  {m.name}
                </h3>
                <ul className="mt-3 space-y-1 text-sm font-light text-cream/75">
                  {m.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          {/* Closer — Park Green as the chronological next entry. Coral
              year + bold project name flag this as the row the buyer came
              for. No explicit CTA — the timeline itself is the argument; the
              clay Enquiry band below is where the action lives. */}
          <li className="grid grid-cols-[5rem_1fr] gap-6 py-10 md:grid-cols-[8rem_1fr] md:gap-10 md:py-12">
            <span className="font-display text-2xl font-light leading-none text-coral md:text-3xl">
              2029
            </span>
            <div>
              <h3 className="font-display text-xl font-medium leading-tight text-cream md:text-2xl">
                {PROJECT.name}
                <span className="ml-2 text-sm font-light text-cream/55">
                  — completing the township
                </span>
              </h3>
              <p className="mt-3 max-w-md text-sm font-light text-cream/75">
                Freehold serviced residences, bridged directly to Pavilion
                Bukit Jalil. 453 family-sized layouts across two blocks.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
