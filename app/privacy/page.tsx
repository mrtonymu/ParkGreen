import type { Metadata } from "next";
import Link from "next/link";
import { PROJECT } from "@/lib/content";
import { WA_TEXT, waLink } from "@/lib/wa";

export const metadata: Metadata = {
  title: "Privacy Notice — Park Green",
  description:
    "How we collect, use and protect personal data submitted through this Park Green enquiry page, under Malaysia's Personal Data Protection Act 2010.",
};

// Plain-English Privacy Notice — drafted for the agent's lead-gen page (not
// the developer Malton's official site). Aligns with PDPA 2010. Should be
// reviewed by counsel before public launch; treat as a working draft.
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream py-20 text-espresso md:py-28">
      <article className="mx-auto max-w-2xl px-6 md:px-12">
        <Link
          href="/"
          className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-clay underline-offset-4 hover:underline"
        >
          ← Back to Park Green
        </Link>

        <h1 className="mt-8 font-display text-[clamp(2rem,4.5vw,3rem)] font-light leading-tight">
          Privacy Notice
        </h1>
        <p className="mt-3 text-[0.62rem] uppercase tracking-[0.28em] text-espresso/50">
          Personal Data Protection Act 2010 (Malaysia)
        </p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-espresso/80">
          <Section title="Who is collecting your data">
            <p>
              This {PROJECT.name} enquiry page is operated by a registered
              property agent acting independently of the developer. Your data
              is collected by the agent for the sole purpose of responding to
              your interest in {PROJECT.name}.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              When you submit the enquiry form on this page, we collect the
              name and contact number you provide. We do not collect any
              additional personal data from your visit beyond standard
              anonymous analytics (page views, device type, country).
            </p>
          </Section>

          <Section title="Why we collect it">
            <p>To:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Respond to your enquiry via WhatsApp or phone;</li>
              <li>
                Send you the requested project deck, floor plans and price
                list;
              </li>
              <li>
                Follow up on your interest in Park Green or comparable Bukit
                Jalil City projects;
              </li>
              <li>
                Schedule a sales-gallery visit at Pavilion Bukit Jalil if you
                request one.
              </li>
            </ul>
          </Section>

          <Section title="Who we share it with">
            <p>
              Your data may be shared with the developer (Malton Berhad /
              Regal Path Sdn. Bhd.) only if you confirm to proceed with a
              booking. We do not sell, rent or otherwise disclose your data
              to third parties for marketing purposes.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We retain enquiry data for up to 24 months from your last
              interaction with us, after which it is deleted. You may request
              deletion at any time (see below).
            </p>
          </Section>

          <Section title="Your rights">
            <p>Under the PDPA 2010 you have the right to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Access the personal data we hold about you;</li>
              <li>Correct it if inaccurate;</li>
              <li>Withdraw consent and request deletion;</li>
              <li>Limit how we process it.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, message us on{" "}
              <a
                href={waLink({ utm: "privacy", text: WA_TEXT.pdpa })}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-coral underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>{" "}
              with the subject &quot;PDPA request&quot;.
            </p>
          </Section>

          <Section title="Cookies & analytics">
            <p>
              This site uses standard analytics (Google Analytics 4 and / or
              Meta Pixel) to measure traffic and improve the page. These
              services may set cookies. IPs are anonymised before storage.
              You can disable cookies in your browser settings without
              affecting the page&apos;s core functionality.
            </p>
          </Section>

          <Section title="Updates">
            <p>
              We may revise this notice from time to time. Material changes
              will be reflected at the top of this page with a new effective
              date.
            </p>
          </Section>
        </div>

        <p className="mt-16 border-t border-espresso/10 pt-8 text-xs text-espresso/45">
          This notice is provided in good faith and reflects current PDPA
          practice. It does not replace legal advice; consult a qualified
          adviser for binding interpretation.
        </p>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-clay">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
