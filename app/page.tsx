import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Sustainability } from "@/components/sustainability";
import { Highlights } from "@/components/highlights";
import { Location } from "@/components/location";
import { Facilities } from "@/components/facilities";
import { FloorPlans } from "@/components/floor-plans";
import { Gallery } from "@/components/gallery";
import { Progress } from "@/components/progress";
import { BukitJalilCity } from "@/components/bukit-jalil-city";
import { Faq } from "@/components/faq";
import { Enquiry } from "@/components/enquiry";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { DEVELOPER, FLOOR_PLANS, PROJECT } from "@/lib/content";

// JSON-LD: a Residence + RealEstateListing pair so Google understands what
// kind of page this is. Surfaces the project in Rich Results and improves
// CTR from organic search. Prices in MYR; offers loop over each layout.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://parkgreen.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateListing",
      "@id": `${SITE_URL}/#listing`,
      url: SITE_URL,
      name: PROJECT.name,
      description:
        "Freehold serviced residences within Bukit Jalil City, bridged directly to Pavilion Bukit Jalil. Sky semi-D family layouts, 1,201 to 1,905 sq.ft.",
      datePosted: "2025-01-08",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lot 5.18.00, 2 Persiaran Jalil 8",
        addressLocality: "Bukit Jalil",
        addressRegion: "Kuala Lumpur",
        postalCode: "57000",
        addressCountry: "MY",
      },
      offers: FLOOR_PLANS.map((p) => ({
        "@type": "Offer",
        name: `Type ${p.type}`,
        priceCurrency: "MYR",
        price:
          Number(p.fromPrice.replace(/[^0-9.]/g, "")) *
          (p.fromPrice.includes("mil") ? 1_000_000 : 1),
        availability: "https://schema.org/PreOrder",
        itemOffered: {
          "@type": "Apartment",
          name: `Park Green Type ${p.type}`,
          floorSize: { "@type": "QuantitativeValue", value: p.sqft, unitCode: "FTK" },
          numberOfBedrooms: parseInt(p.beds, 10),
          numberOfBathroomsTotal: p.baths,
        },
      })),
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#developer`,
      name: DEVELOPER.developer,
      parentOrganization: { "@type": "Organization", name: DEVELOPER.operator },
    },
  ],
};

// Warm cadence: dark hero → clay privilege band → cream content sections →
// Bukit Jalil City → marquee → clay form → dark footer.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <Hero />
      <Sustainability />
      <Location />
      <Facilities />
      <FloorPlans />
      <Gallery />
      <Progress />
      <BukitJalilCity />
      <Highlights />
      <Faq />
      <Enquiry />
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
