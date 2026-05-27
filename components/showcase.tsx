import Image from "next/image";

// Full-bleed beauty moment between sections.
export function Showcase() {
  return (
    <section className="grain relative isolate flex min-h-[64vh] items-end overflow-hidden bg-espresso text-cream">
      <Image
        src="/images/pg/gallery/gallery-1-v3.jpg"
        alt="Park Green's dedicated bridge to Pavilion Bukit Jalil"
        fill
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso/85 via-espresso/20 to-espresso/30" />
      <div className="reveal mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-cream/75">
          <span className="h-px w-9 bg-coral" aria-hidden />
          Bukit Jalil City
        </p>
        <p className="mt-5 max-w-[24ch] font-display text-[clamp(1.75rem,3.6vw,2.9rem)] font-medium leading-[1.1]">
          Eighty acres of green on one side. Pavilion on the other.
        </p>
      </div>
    </section>
  );
}
