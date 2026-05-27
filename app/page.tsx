import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Sustainability } from "@/components/sustainability";
import { Highlights } from "@/components/highlights";
import { Location } from "@/components/location";
import { Showcase } from "@/components/showcase";
import { Facilities } from "@/components/facilities";
import { FloorPlans } from "@/components/floor-plans";
import { Gallery } from "@/components/gallery";
import { Progress } from "@/components/progress";
import { BukitJalilCity } from "@/components/bukit-jalil-city";
import { Awards } from "@/components/awards";
import { Enquiry } from "@/components/enquiry";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

// Warm cadence: dark hero → clay privilege band → cream content sections
// (broken by one dark photo band) → Bukit Jalil City → marquee → clay form →
// dark footer.
export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <Sustainability />
      <Location />
      <Showcase />
      <Facilities />
      <FloorPlans />
      <Gallery />
      <Progress />
      <BukitJalilCity />
      <Awards />
      <Highlights />
      <Enquiry />
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
