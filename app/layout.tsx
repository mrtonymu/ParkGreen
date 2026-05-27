import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Park Green — Bukit Jalil City, Kuala Lumpur",
  description:
    "Freehold serviced residences within Bukit Jalil City, bridged directly to Pavilion Bukit Jalil. Sky semi-D family homes from 1,201 to 1,905 sq.ft., from RM1.2 mil. Completing 2029.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
