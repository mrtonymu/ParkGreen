import type { Metadata } from "next";
import { ThreeSixtyClient } from "./client";

// Full-screen 360 walkthrough. The iframe loads the developer's tour but the
// top 100px is cropped via clip-path — that strip carries an ⓘ button which
// hard-navigates the parent window back to parkgreen.com.my, kidnapping the
// lead. Sandbox keeps top-navigation/popups disabled as belt-and-suspenders.
// Where the developer's chrome was, we put our own "back to listing" pill.
export const metadata: Metadata = {
  title: "Park Green — 360° walkthrough",
  description: "Drag through Park Green at Bukit Jalil City in 360°.",
};

export default function ThreeSixty() {
  return <ThreeSixtyClient />;
}
