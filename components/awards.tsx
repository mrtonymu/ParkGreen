import { SectionHeading } from "@/components/section-heading";
import { AWARDS } from "@/lib/content";

// Recognition strip — award-body logos in uniform paper cards on the cream band.
export function Awards() {
  return (
    <section
      id="awards"
      className="reveal mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-28"
    >
      <SectionHeading
        title="Recognition"
        subtitle="Malton — an award-winning developer, and Park Green caps its flagship Bukit Jalil City."
      />
      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {AWARDS.map((a) => (
          <li
            key={a.label}
            className="flex flex-col items-center justify-center gap-4 rounded-[2px] border border-espresso/10 bg-paper px-4 py-8 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- award-body logo */}
            <img src={a.src} alt={a.label} className="h-14 w-auto object-contain" loading="lazy" />
            <span className="text-[0.62rem] uppercase tracking-[0.14em] text-espresso/55">
              {a.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
