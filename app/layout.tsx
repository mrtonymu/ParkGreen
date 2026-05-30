import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display serif for headings — matches the live site's warm, classic titles.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Resolve a base URL for OG / canonical / sitemap. Override with
// NEXT_PUBLIC_SITE_URL on Vercel once a custom domain is wired up.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://parkgreen.vercel.app";

const SITE_TITLE = "Park Green — Bukit Jalil City, Kuala Lumpur";
const SITE_DESCRIPTION =
  "Freehold serviced residences within Bukit Jalil City, bridged directly to Pavilion Bukit Jalil. Sky semi-D family homes from 1,201 to 1,905 sq.ft., from RM1.2 mil. Completing 2029.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Park Green",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Park Green Pavilion",
    "Bukit Jalil property",
    "freehold serviced residence Bukit Jalil",
    "Pavilion Bukit Jalil",
    "Malton",
    "KL property 2029",
    "Bukit Jalil City",
    "sky semi-D",
  ],
  authors: [{ name: "Park Green Pavilion" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: SITE_URL,
    siteName: "Park Green Pavilion Bukit Jalil",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // app/opengraph-image.jpg is auto-detected by Next, but we still declare
    // for older crawlers that prefer explicit meta tags.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
