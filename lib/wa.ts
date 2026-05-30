import { PROJECT } from "./content";

// Builds a tracked api.whatsapp.com click-to-chat link. Every CTA on the site
// passes a unique `utm` so analytics can tell which button drove each lead:
// hero / fab / facilities / 360-fab / enquiry / privacy / nav / etc.
//
// We use api.whatsapp.com (not wa.me) because the former carries query string
// metadata cleanly through WhatsApp's deep-link → app handoff, while wa.me
// strips unknown params on some platforms. `app_absent=0` means: if WhatsApp
// isn't installed, fall back to web.whatsapp.com instead of erroring.
export function waLink({
  utm,
  text,
}: {
  utm: string;
  text?: string;
}): string {
  const params = new URLSearchParams();
  params.set("phone", PROJECT.whatsapp);
  if (text) params.set("text", text);
  params.set("type", "phone_number");
  params.set("app_absent", "0");
  params.set("utm_source", utm);
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

// Stock first-message fallbacks. Section-specific buttons pass their own text
// so the WhatsApp thread opens with relevant context already typed.
export const WA_TEXT = {
  generic: "Hi, I'd like to know more about Park Green at Bukit Jalil City.",
  facilities: "Hi, I'd like the Park Green facilities deck.",
  pricing: "Hi, I'd like the Park Green price list and unit availability.",
  pdpa: "PDPA request — I'd like to manage my personal data on your Park Green listing.",
} as const;
