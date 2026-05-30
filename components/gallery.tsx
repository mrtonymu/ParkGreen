"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox } from "@/components/lightbox";

// Park Green's nine official renders. Captions match the developer's gallery
// labels; layout is a 12-col editorial mix — wide hero → balanced pairs →
// three smalls → portrait/landscape mix → wide finale. Section closes with
// the 360 walkthrough (iframe lazy-loaded).
type Shot = {
  src: string;
  caption: string;
  span: string;   // tailwind col-span class (md+ only; mobile = 1 col)
  aspect: string; // tailwind aspect-* class
};

// Ordered as an arc: exterior facade → arrival/lobby → pool & unit life →
// facilities → rooftop → context (Pavilion adjacency closer). Spans/aspects
// chosen to suit each render's natural composition (portrait shots get 3/4,
// the twin-tower facade + Pavilion ground-level closer get cinematic 21/9).
const SHOTS: Shot[] = [
  { src: "/images/pg/gallery/gallery-9.jpeg",   caption: "Park Green Facade",     span: "md:col-span-12", aspect: "aspect-[21/9]" },
  // Row 2 (8+4): aspect-[3/2] + aspect-[3/4] gives matching heights — 8u × 2/3
  // and 4u × 4/3 both resolve to 5.33u, so the portrait sits flush with the
  // wide card and no dark gap shows below.
  { src: "/images/pg/gallery/gallery-2.jpg",    caption: "Concierge",             span: "md:col-span-8",  aspect: "aspect-[3/2]"  },
  { src: "/images/pg/gallery/gallery-6.jpg",    caption: "Entrance Statement",    span: "md:col-span-4",  aspect: "aspect-[3/4]"  },
  { src: "/images/pg/gallery/gallery-3.jpg",    caption: "Swimming Pool",         span: "md:col-span-6",  aspect: "aspect-[4/3]"  },
  { src: "/images/pg/gallery/gallery-4.jpg",    caption: "Type F Balcony",        span: "md:col-span-6",  aspect: "aspect-[4/3]"  },
  { src: "/images/pg/gallery/gallery-5.jpg",    caption: "Flex Fitness Zone",     span: "md:col-span-4",  aspect: "aspect-[4/3]"  },
  { src: "/images/pg/gallery/gallery-7.jpg",    caption: "Rooftop Sky Lounge",    span: "md:col-span-4",  aspect: "aspect-[4/3]"  },
  // Row 4 (4+4+4): all three share aspect-[4/3] so the row lines up cleanly
  // — Open Deck previously broke as a portrait, leaving the two siblings
  // stranded with a tall dark gap beneath them.
  { src: "/images/pg/gallery/gallery-8-v2.jpg", caption: "Rooftop Open Deck",     span: "md:col-span-4",  aspect: "aspect-[4/3]"  },
  { src: "/images/pg/gallery/gallery-1-v3.jpg", caption: "Pavilion Adjacency",    span: "md:col-span-12", aspect: "aspect-[21/9]" },
];

const SHOT_SRCS = SHOTS.map((s) => s.src);

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="reveal bg-espresso py-24 text-cream md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          title="Gallery"
          subtitle="Artist's impressions of the residences, facilities and township."
          tone="dark"
        />

        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-12 md:gap-4">
          {SHOTS.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              aria-label={`Enlarge: ${shot.caption}`}
              onClick={() => setOpen(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-[2px] bg-espresso/40 ${shot.span} ${shot.aspect}`}
            >
              <Image
                src={shot.src}
                alt={`Park Green — ${shot.caption}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(min-width:1024px) 70vw, 90vw"
              />
              {/* caption — small coral hairline + label, anchored bottom-left */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/35 to-transparent px-5 pb-4 pt-12 md:px-6 md:pb-5 md:pt-16">
                <span className="flex items-center gap-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-cream">
                  <span className="h-px w-6 bg-coral" aria-hidden />
                  {shot.caption}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* 360 walkthrough — Gallery's finale */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-coral" aria-hidden />
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-coral">
              Experience Every Angle
            </p>
          </div>
          <h3 className="mt-6 max-w-2xl font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-light leading-[1.1] text-cream">
            Step inside. Drag through the development in 360°.
          </h3>

          <div className="relative mt-10 w-full overflow-hidden rounded-[2px] bg-espresso/40 aspect-[3/4] md:aspect-video">
            <iframe
              src="https://parkgreen.com.my/360/?embedded=1"
              title="Park Green — 360° walkthrough"
              loading="lazy"
              allow="accelerometer; gyroscope; xr-spatial-tracking; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/55">
            <span>
              Drag to explore · This is an embed of the developer&apos;s 360.{" "}
              Tap our WhatsApp below for the full deck and unit availability.
            </span>
            <a
              href="/360"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-coral underline-offset-4 hover:underline"
            >
              Open in new tab →
            </a>
          </p>
        </div>
      </div>

      {open !== null && (
        <Lightbox
          photos={SHOT_SRCS}
          index={open}
          alt={`Park Green — ${SHOTS[open].caption}`}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </section>
  );
}
