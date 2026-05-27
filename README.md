# Park Green — Pavilion Bukit Jalil

Marketing landing page for **Park Green**, a freehold serviced apartment development by **Malton Berhad** within the award-winning Bukit Jalil City township, Kuala Lumpur.

Live reference: [parkgreen.com.my](https://parkgreen.com.my)

---

## Project Overview

| Field | Detail |
|---|---|
| **Developer** | Regal Path Sdn. Bhd. (operated by Malton Berhad) |
| **Property Type** | Freehold Serviced Apartment |
| **Township** | Bukit Jalil City, Kuala Lumpur |
| **Units** | Block A · 210 units · Block B · 243 units |
| **Sizes** | 1,201 – 1,905 sq.ft. |
| **Price** | From RM1.2 mil (RM1,344,450 – RM2,566,670) |
| **Completion** | March 2029 |

---

## Tech Stack

- **Framework**: Next.js 15 App Router (TypeScript)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme`)
- **Fonts**: Cormorant Garamond (display) + Inter (body) via `next/font/google`
- **Images**: `next/image` with SVG floor plans as `unoptimized`

## Design System

Warm editorial palette inspired by the project's clay/espresso tone:

| Token | Hex | Role |
|---|---|---|
| `espresso` | `#241B16` | Dark base, footer, text |
| `clay` | `#A97560` | Accent headings, section labels |
| `coral` | `#E3947A` | CTA buttons, active states |
| `peach` | `#FDCDAC` | Hover fills, light accents |
| `cream` | `#F7F4F2` | Page background |
| `paper` | `#EDE9E4` | Card backgrounds |

Typography uses `Cormorant Garamond` for display headings and `Inter` for body copy.

---

## Sections

| Section | Component | Description |
|---|---|---|
| Header | `site-header.tsx` | Scroll-aware sticky nav with scroll-spy |
| Hero | `hero.tsx` | Full-bleed aerial photo, CTA, film modal |
| Privilege band | `sustainability.tsx` | 4-column icon features |
| Location | `location.tsx` | Interactive map + accordion amenities |
| Showcase | `showcase.tsx` | Key USP renders |
| Facilities | `facilities.tsx` | Level 11 plan + render thumbnails |
| Floor Plans | `floor-plans.tsx` | 6 unit types A–F with lightbox |
| Gallery | `gallery.tsx` | Render grid with lightbox |
| Site Progress | `progress.tsx` | Q4 2024 → Q2 2026 quarterly photos |
| Bukit Jalil City | `bukit-jalil-city.tsx` | Township landmark cards |
| Recognition | `awards.tsx` | Developer award logos |
| Highlights | `highlights.tsx` | Scrolling marquee ticker |
| Enquiry | `enquiry.tsx` | Lead capture form |
| Footer | `site-footer.tsx` | Legal particulars |

---

## Getting Started

```bash
npm install
PORT=3001 npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### Build

```bash
npm run build
npm start
```

---

## Key Features

- **Scroll-aware header**: transparent over hero → cream bar on scroll, with scroll-spy active-link highlighting
- **Watch the Film**: YouTube modal via React Portal (`createPortal`) — avoids stacking context issues
- **Floor plan lightbox**: SVG vector floor plans with swipe/arrow navigation
- **Construction progress**: Quarterly photo grid, responsive flex layout
- **Marquee ticker**: Pure CSS `translateX` animation with `prefers-reduced-motion` guard
- **Parallax sections**: CSS `scroll-timeline` with motion-safe guards
- **WhatsApp FAB**: Floating action button wired to agent WhatsApp

---

## Content Source

All project facts (prices, tenure, developer licence, ad permit, distances) mirror the official [parkgreen.com.my](https://parkgreen.com.my) and are consolidated in [`lib/content.ts`](lib/content.ts).

Developer's Licence: `30667/01-2029/0009(N)` · valid 08/01/2024–07/01/2029  
Advertising & Sales Permit: `30667-1/09-2027/0886(N)-(S)` · valid 30/09/2024–29/09/2027  
Issued by: Dewan Bandaraya Kuala Lumpur (DBKL)

---

## Disclaimer

Renders are artist's impressions. All figures are indicative and subject to the sale & purchase agreement. Bumiputera discount 5%.
