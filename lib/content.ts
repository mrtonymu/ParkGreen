// Single source of truth for Park Green facts.
// Figures here mirror parkgreen.com.my (Malton): tenure, prices, built-up
// sizes, distances, the Bukit Jalil City track record, developer particulars.
// All marketing prose is original.

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
  whatsapp: "60123456789", // TODO: agent's real WhatsApp (intl format, no +)
} as const;

export type FloorPlan = {
  type: string;
  sqft: number;
  beds: string;
  baths: number;
  fromPrice: string;
  block: string;
  image: string;
};

// Six layouts across two blocks (Block A: 210 units · Block B: 243 units).
// "From" prices mirror the live site's per-type headline figures.
export const FLOOR_PLANS: FloorPlan[] = [
  { type: "A", sqft: 1201, beds: "3", baths: 2, fromPrice: "RM1.2 mil", block: "Block B", image: "/images/pg/floorplans/plans/fp-a.svg" },
  { type: "B", sqft: 1408, beds: "3+1", baths: 2, fromPrice: "RM1.5 mil", block: "Block A & B", image: "/images/pg/floorplans/plans/fp-b.svg" },
  { type: "C", sqft: 1485, beds: "3", baths: 2, fromPrice: "RM1.6 mil", block: "Block A & B", image: "/images/pg/floorplans/plans/fp-c.svg" },
  { type: "D", sqft: 1501, beds: "3", baths: 2, fromPrice: "RM1.8 mil", block: "Block A", image: "/images/pg/floorplans/plans/fp-d.svg" },
  { type: "F", sqft: 1627, beds: "3", baths: 2, fromPrice: "RM1.9 mil", block: "Block A", image: "/images/pg/floorplans/plans/fp-f.svg" },
  { type: "E", sqft: 1905, beds: "4", baths: 3, fromPrice: "RM2.0 mil", block: "Block A & B", image: "/images/pg/floorplans/plans/fp-e.svg" },
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

// Marquee highlights — Park Green's own facts.
export const HIGHLIGHTS: string[] = [
  "Freehold Serviced Residences",
  "Bridged to Pavilion Bukit Jalil",
  "80-Acre Recreational Park at Your Door",
  "Within Bukit Jalil City",
  "Bespoke Concierge Service",
  "Sky Semi-D Homes · 1,201–1,905 sq.ft.",
  "Bumiputera Discount 5%",
  "Completing 2029",
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

// ─────────────────────────────────────────────────────────────────────────
// TODO (pending official Park Green / Malton asset pack):
// The facilities masterplan + amenity list below are PLACEHOLDERS carried over
// from the previous build. Park Green's site loads these via a runtime gallery
// that isn't programmatically extractable, so the real facility names, the
// numbered site plan and its pin coordinates must come from the official deck.
// ─────────────────────────────────────────────────────────────────────────
export const FACILITIES: { group: string; items: string[] }[] = [
  { group: "Water", items: ["Infinity pool", "Leisure pool", "Kid's pool", "Jacuzzi & cabana", "Sun deck"] },
  { group: "Gardens", items: ["Central park", "Themed gardens", "Strolling path", "Play & exercise lawns"] },
  { group: "Active", items: ["Gymnasium", "Steam room", "Games room", "Indoor kid's play"] },
  { group: "Social", items: ["Multi-purpose hall", "Lounges", "Library", "Outdoor BBQ"] },
];

export const FACILITIES_LEGEND: string[] = [
  "Leisure Pool", "Sun Deck", "Jacuzzi", "Kid's Pool", "Kid's Play Area",
  "Play Lawn", "Pavilion", "Strolling Garden Path", "Scented Gardens",
  "Outdoor BBQ", "Infinity Lap Pool", "Sun Bath Decks", "Cabana", "Islet Deck",
  "Shallow Pool", "BBQ", "Dining Lounges", "Exercise Lawn", "Central Park",
  "Circle Gateway", "Themed Gardens", "Toilet", "Multi-purpose Hall", "Prep Room",
  "Entertainment Room", "Games Room", "Indoor Kid's Play", "Gymnasium",
  "Therapy Room", "Library", "Reading Room", "Steam Room",
];

export const FACILITY_PINS: { n: number; top: string; left: string }[] = [
  { n: 1, top: "29%", left: "24%" }, { n: 2, top: "23%", left: "32.5%" },
  { n: 3, top: "36%", left: "21.5%" }, { n: 4, top: "39%", left: "26%" },
  { n: 5, top: "47%", left: "15%" }, { n: 6, top: "47%", left: "22%" },
  { n: 7, top: "24%", left: "20%" }, { n: 8, top: "16%", left: "30.5%" },
  { n: 9, top: "22%", left: "39%" }, { n: 10, top: "40%", left: "32.5%" },
  { n: 11, top: "37%", left: "75%" }, { n: 12, top: "33%", left: "65%" },
  { n: 13, top: "44%", left: "82%" }, { n: 14, top: "29%", left: "71%" },
  { n: 15, top: "31%", left: "81%" }, { n: 16, top: "37%", left: "89%" },
];

export const FACILITY_RENDERS: { src: string; caption: string }[] = [
  { src: "/images/pg/gallery/gallery-4.jpg", caption: "Pool Deck" },
  { src: "/images/pg/gallery/gallery-6.jpg", caption: "Sky Lounge" },
  { src: "/images/pg/gallery/gallery-2.jpg", caption: "Living & Dining" },
  { src: "/images/pg/gallery/gallery-9.jpeg", caption: "Bedroom Suite" },
];
