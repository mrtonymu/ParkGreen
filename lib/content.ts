// Single source of truth for Park Green facts.
// Figures here mirror parkgreen.com.my (Malton): tenure, prices, built-up
// sizes, distances, the Bukit Jalil City track record, developer particulars.
// All marketing prose is original.

// Agent WhatsApp — kept out of public git history. Set the real number in
// .env.local (and Vercel project envs) as NEXT_PUBLIC_WHATSAPP_NUMBER.
// Intl format: 60 + area code + number, no leading + and no spaces.
const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60123456789";

export const PROJECT = {
  name: "Park Green",
  positioning: "Pavilion Bukit Jalil",
  township: "Bukit Jalil City",
  location: "Bukit Jalil, Kuala Lumpur",
  propertyType: "Serviced Apartment",
  fromPrice: "RM1.2 mil",
  tenure: "Freehold",
  sizeRange: "1,201 – 1,905 sq.ft.",
  completion: "March 2029",
  whatsapp: WHATSAPP,
} as const;

export type FloorPlan = {
  type: string;
  // (M) mirror variant suffix shown beside the type letter, e.g. "A(M)".
  mirror?: string;
  sqft: number;
  sqm: number;
  beds: string;
  baths: number;
  fromPrice: string;
  block: string;
  image: string;
  // Small position-on-floorplate diagram shown next to the spec card.
  keyplan: string;
  // 360 walkthrough URL; omit for types without a tour (e.g. C).
  virtualTour?: string;
};

// Eight layouts across two blocks (Block A: 210 units · Block B: 243 units).
// Specs mirror the live site's Floor Plans page (sqft, sqm, beds, baths).
// Tabs ordered A, A1, B, B1, C, D, E, F to match the developer's printed
// materials. VR tours for A/A1 share TypeA, B/B1 share TypeB; C has none.
export const FLOOR_PLANS: FloorPlan[] = [
  { type: "A",  mirror: "A(M)", sqft: 1201, sqm: 111.54, beds: "3",   baths: 2, fromPrice: "RM1.2 mil", block: "Block B",
    image: "/images/pg/floorplans/plans/fp-a.svg",  keyplan: "/images/pg/floorplans/plans/kp-a.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeA/" },
  { type: "A1",                  sqft: 1201, sqm: 111.54, beds: "3",   baths: 2, fromPrice: "RM1.2 mil", block: "Block A & B",
    image: "/images/pg/floorplans/plans/fp-a1.svg", keyplan: "/images/pg/floorplans/plans/kp-a1.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeA/" },
  { type: "B",                   sqft: 1408, sqm: 130.85, beds: "3",   baths: 2, fromPrice: "RM1.5 mil", block: "Block A & B",
    image: "/images/pg/floorplans/plans/fp-b.svg",  keyplan: "/images/pg/floorplans/plans/kp-b.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeB/" },
  { type: "B1",                  sqft: 1408, sqm: 130.85, beds: "3",   baths: 2, fromPrice: "RM1.5 mil", block: "Block A & B",
    image: "/images/pg/floorplans/plans/fp-b1.svg", keyplan: "/images/pg/floorplans/plans/kp-b1.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeB/" },
  { type: "C",                   sqft: 1485, sqm: 137.96, beds: "3",   baths: 2, fromPrice: "RM1.6 mil", block: "Block A & B",
    image: "/images/pg/floorplans/plans/fp-c.svg",  keyplan: "/images/pg/floorplans/plans/kp-c.svg" },
  { type: "D",  mirror: "D(M)", sqft: 1501, sqm: 139.43, beds: "3",   baths: 2, fromPrice: "RM1.8 mil", block: "Block A",
    image: "/images/pg/floorplans/plans/fp-d.svg",  keyplan: "/images/pg/floorplans/plans/kp-d.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeD/" },
  { type: "E",                   sqft: 1905, sqm: 176.96, beds: "4",   baths: 3, fromPrice: "RM2.0 mil", block: "Block A & B",
    image: "/images/pg/floorplans/plans/fp-e.svg",  keyplan: "/images/pg/floorplans/plans/kp-e.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeE/" },
  { type: "F",                   sqft: 1627, sqm: 151.19, beds: "3",   baths: 2, fromPrice: "RM1.9 mil", block: "Block A",
    image: "/images/pg/floorplans/plans/fp-f.svg",  keyplan: "/images/pg/floorplans/plans/kp-f.svg",
    virtualTour: "https://vr.properly.com.my/ParkGreenPavilionTypeF/" },
];

export type Place = { distance: string; label: string };

// Accordion categories — distances mirror the live site's "Ultimate Address".
export const LOCATION_AMENITIES: { group: string; places: Place[] }[] = [
  {
    group: "Retail & Lifestyle",
    places: [
      { distance: "Linked", label: "Pavilion Bukit Jalil (dedicated pedestrian bridge)" },
      { distance: "500M", label: "Bukit Jalil Recreational Park (80 acres)" },
    ],
  },
  {
    group: "Education",
    places: [
      { distance: "950M", label: "SJK(C) Lai Meng" },
      { distance: "3.0KM", label: "Tzu Chi International School" },
      { distance: "3.1KM", label: "International Medical University (IMU)" },
      { distance: "4.5KM", label: "Asia Pacific University (APU)" },
    ],
  },
  {
    group: "Medical",
    places: [
      { distance: "3.2KM", label: "IMU Healthcare" },
      { distance: "3.3KM", label: "Columbia Asia Hospital" },
    ],
  },
  {
    group: "Recreational",
    places: [
      { distance: "1.5KM", label: "Bukit Jalil Golf & Country Resort" },
      { distance: "3.0KM", label: "Bukit Jalil National Stadium" },
      { distance: "4.2KM", label: "Kinrara Golf Club" },
    ],
  },
];

// The three headline privileges (+ the park) — shown as the clay statement band.
export const PRIVILEGES: { title: string; body: string }[] = [
  {
    title: "Bridged to Pavilion",
    body: "A residents-only pedestrian bridge links you straight into Pavilion Bukit Jalil — world-class retail, dining and cinema, a covered walk from your lobby.",
  },
  {
    title: "Bespoke Concierge",
    body: "A dedicated concierge handles the everyday — reservations, deliveries, the small details — so privilege feels effortless.",
  },
  {
    title: "Sky Semi-D Homes",
    body: "Expansive family layouts from 1,201 to 1,905 sq.ft., crafted for grand living high above the township.",
  },
  {
    title: "80-Acre Park",
    body: "The lush Bukit Jalil Recreational Park sits 500m from your door — green mornings and open sky, year-round.",
  },
];

// Bukit Jalil City — the proven, award-winning township Park Green completes.
// (Replaces the construction-progress timeline; completion is Mar 2029.)
export type Landmark = { name: string; year: string; notes: string[] };
export const BUKIT_JALIL_CITY: Landmark[] = [
  {
    name: "Pavilion Bukit Jalil",
    year: "2021",
    notes: [
      "1.8 million sq.ft. of retail",
      "Gold — FIABCI World Prix d'Excellence 2024 (Retail)",
      "Owned & managed by Pavilion REIT",
    ],
  },
  {
    name: "The Park 2",
    year: "2021",
    notes: [
      "709 residences · 750–1,570 sq.ft.",
      "Best Completed High-Rise — PropertyGuru Asia Awards 2024",
    ],
  },
  {
    name: "The Park Sky Residence",
    year: "2019",
    notes: ["1,098 residences · 868–1,565 sq.ft."],
  },
  {
    name: "Hyatt Place Kuala Lumpur",
    year: "2023",
    notes: ["250-room hotel", "1st international hotel in Bukit Jalil"],
  },
  {
    name: "The Park Shop Offices",
    year: "2018",
    notes: ["44 three-storey shop offices"],
  },
  {
    name: "Signature Shop Offices",
    year: "2017",
    notes: ["112 two & three-storey shop offices"],
  },
];

// Marquee highlights — the five irreducible selling points repeated just
// before Enquiry, as a reminder beat. The rest of the facts (concierge,
// sizes, bumi, BJC, etc.) live in their own sections; keeping the loop
// short stops it reading as a recap of the whole page. The VVIP item
// carries the scarcity beat — it must be true (= a real spread vs. the
// public launch price), not just a renamed launch tier.
export const HIGHLIGHTS: string[] = [
  "Freehold Serviced Residences",
  "VVIP Pricing Open · Limited",
  "Bridged to Pavilion Bukit Jalil",
  "80-Acre Recreational Park at Your Door",
  "Completing March 2029",
];

// Construction progress — official site photos, newest first (completing 2029).
export type Milestone = { label: string; photos: string[] };
const sp = (q: string, files: string[]) =>
  files.map((f) => `/images/pg/gallery/site-progress/${q}/${f}`);
export const PROGRESS: Milestone[] = [
  { label: "Q2 2026", photos: sp("q2-2026", ["sp-1.jpg", "sp-2.jpg", "sp-3.jpg", "sp-4.jpg", "sp-5.jpg"]) },
  { label: "Q1 2026", photos: sp("q1-2026", ["sp-1.jpeg", "sp-2.jpeg", "sp-3.jpeg", "sp-4.jpeg", "sp-5.jpeg"]) },
  { label: "Q4 2025", photos: sp("q4-2025", ["sp-1.jpg", "sp-2.jpg", "sp-2a.jpg", "sp-3.png", "sp-4.jpg"]) },
  { label: "Q3 2025", photos: sp("q3-2025", ["sp-1.jpeg", "sp-2.jpeg", "sp-3.jpeg", "sp-4.jpeg", "sp-5.jpeg"]) },
  { label: "Q2 2025", photos: sp("q2-2025", ["sp-1.jpeg", "sp-2.jpeg", "sp-3.jpeg", "sp-4.jpeg", "sp-5.jpeg"]) },
  { label: "Q1 2025", photos: sp("q1-2025", ["sp-1.jpeg", "sp-2.jpeg", "sp-3.jpeg", "sp-4.jpeg", "sp-5.png"]) },
  { label: "Q4 2024", photos: sp("q4-2024", ["sp-1.jpeg", "sp-2.jpeg", "sp-3.jpeg", "sp-4.jpeg", "sp-5.jpeg"]) },
];

// Award bodies recognising the developer (curated to logos that read on a light
// card; white-only/plaque/duplicate variants from the source are omitted).
export const AWARDS: { src: string; label: string }[] = [
  { src: "/images/pg/awards/fiabci.png", label: "FIABCI World Prix d'Excellence" },
  { src: "/images/pg/awards/property-guru-2025.png", label: "PropertyGuru Asia Awards" },
  { src: "/images/pg/awards/theedge.png", label: "The Edge Top Property Developers" },
  { src: "/images/pg/awards/mda.png", label: "Malaysia Developer Awards" },
  { src: "/images/pg/awards/apda.png", label: "ASEAN Property Developer Awards" },
];

// Five objection-handling answers immediately before the Enquiry form.
// Every figure is either from the official Park Green FAQ, from the
// developer's published materials (lib/content.ts), or from publicly
// known KL property regulations — nothing invented. Specifics that depend
// on individual circumstances route to WhatsApp.
export type FAQ = { q: string; a: string };
export const FAQS: FAQ[] = [
  {
    q: "Is the 5% Bumiputera discount automatic?",
    a: "Eligible Bumiputera buyers receive 5% off the SPA price, applicable across all units in Block A and Block B. Quota is allocated on a first-come basis — message us on WhatsApp to confirm current availability before you commit.",
  },
  {
    q: "What's the monthly maintenance fee?",
    a: "RM 0.51 per sq.ft. per month, inclusive of sinking fund (set by the Joint Management Body). For reference: a 1,201 sq.ft. unit works out to roughly RM 612/month; a 1,905 sq.ft. unit, roughly RM 971/month.",
  },
  {
    q: "Is the title Freehold? Any quirks I should know?",
    a: "Yes — Freehold tenure, with a Commercial title under the Housing Development Act (HDA). Commercial-title is standard for serviced apartments in KL but has small differences vs a Residential title on loan margin and stamp duty — we'll walk you through which banks offer the best terms for HDA Commercial.",
  },
  {
    q: "Can foreigners buy at Park Green?",
    a: "Yes. Kuala Lumpur's foreign-buyer minimum threshold is currently RM 1 million, and every Park Green layout sits above it — even the entry-level Type A starts at RM 1.2 mil. Foreign-ownership rules can shift, so we'll verify the current state for the specific unit you're considering.",
  },
  {
    q: "How do I visit the sales gallery?",
    a: "Pavilion Bukit Jalil, Malton Property Gallery, Level 5 — open Mon-Sun, 10am-6pm by appointment. Send a preferred date and time on WhatsApp and we'll book your slot, then meet you on-site to walk through the show units and floor plans.",
  },
];

export const DEVELOPER = {
  developer: "Regal Path Sdn. Bhd. (201601002434)",
  operator: "Malton Berhad",
  blocks: "Block A · 210 units · Block B · 243 units",
  priceRange: "RM1,344,450 – RM2,566,670",
  tenure: "Freehold",
  propertyType: "Serviced Apartment",
  license: "30667/01-2029/0009(N) · valid 08/01/2024–07/01/2029",
  adPermit: "30667-1/09-2027/0886(N)-(S) · valid 30/09/2024–29/09/2027",
  authority: "Dewan Bandaraya Kuala Lumpur (DBKL)",
  buildingPlan: "DBKL.JKB.BP S3 OSC 2023 2314 (20)",
  completion: "March 2029",
  bumiDiscount: "5%",
  salesGallery: "Pavilion Bukit Jalil — Malton Property Gallery, Level 5",
  projectAddress: "Lot 5.18.00, 2 Persiaran Jalil 8, Bukit Jalil, 57000 Kuala Lumpur",
} as const;

// Facilities organised by level, the structure the live site uses.
// Level 11 is the main facilities deck (carries the SVG plan); Level 1 is the
// lobby, Level 47 the rooftop. The Level 11 entry also embeds the pin
// coordinates for the interactive plan overlay: each pin is [cx, cy, item]
// where item is 1-based into `items`. cx/cy match the plan SVG's viewBox.
export type FacilityLevel = {
  level: string;
  note?: string;
  plan?: string;
  planViewBox?: { w: number; h: number };
  pins?: [number, number, number][];
  items: string[];
};

export const FACILITY_LEVELS: FacilityLevel[] = [
  {
    level: "1",
    note: "Lobby",
    items: [
      "Concierge",
      "Waiting Lounge",
      "Mail Room",
      "Food Delivery Zone",
      "Parcel Room",
      "EV Charging",
    ],
  },
  {
    level: "11",
    note: "Facilities Deck",
    plan: "/images/pg/facilities/facilities-level11.svg",
    planViewBox: { w: 831, h: 515 },
    // Pin coordinates extracted from the official plan SVG; each tuple maps a
    // green dot on the plan to its facility row in `items` below.
    pins: [
      [714, 208, 1],   // Multipurpose Hall
      [544, 373, 2],   // Flex Fitness Zone
      [466, 453, 3],   // Yoga Flow Room
      [409, 418, 4],   // Games Room
      [339, 378, 5],   // Kindergarten
      [284, 343, 6],   // Management Office
      [201, 301, 7],   // Changing Room
      [171, 238, 8],   // Steam Room
      [270, 301, 8],   // Steam Room — second marker
      [64, 223, 9],    // Co-working Lounge
      [144, 51, 10],   // Social Garden
      [209, 213, 11],  // Outdoor Lounge
      [467, 236, 12],  // Children's Play Area
      [449, 165, 13],  // Wading Pool
      [261, 58, 14],   // Bubbly Jacuzzi
      [419, 58, 15],   // Infinity Pool
      [609, 33, 16],   // BBQ Terrace
    ],
    items: [
      "Multipurpose Hall",
      "Flex Fitness Zone",
      "Yoga Flow Room",
      "Games Room",
      "Kindergarten (Space Only)",
      "Management Office",
      "Changing Room",
      "Steam Room",
      "Co-working Lounge",
      "Social Garden",
      "Outdoor Lounge",
      "Children's Play Area",
      "Wading Pool",
      "Bubbly Jacuzzi",
      "Infinity Pool",
      "BBQ Terrace",
    ],
  },
  {
    level: "47",
    note: "Rooftop",
    items: [
      "Sky Lounge",
      "Private Lounge & Executive Dining",
      "Sky Terrace Seating",
      "Outdoor Yoga Deck",
      "Open Deck",
    ],
  },
];
