import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, card, textLink } from "@/lib/styles";

const steps = [
  {
    n: "01",
    short: "Request",
    title: "Submit a Request",
    duration: "~2 min",
    durationNote: "to fill out the form",
    you: "Describe the part — dimensions, function, material, and how many. Attach a photo, sketch, or STL if you have one.",
    me: "Nothing yet. A clear description is enough to start; no file needed.",
    tip: "The more detail you provide, the more accurate the quote.",
  },
  {
    n: "02",
    short: "Quote",
    title: "Review & Quote",
    duration: "1–2 days",
    durationNote: "sent by email",
    you: "Answer any questions I send. Otherwise, watch for the quote email.",
    me: "Pick the best approach and material, estimate print time and cost, and send the quote.",
    tip: "Complex or multi-part designs may take longer to scope.",
  },
  {
    n: "03",
    short: "Pay",
    title: "Approve & Pay",
    duration: "7 days",
    durationNote: "quote stays valid",
    you: "Pay through the secure Stripe link in the email. Card or bank transfer, no account required.",
    me: "Lock in the order and move it to the print queue.",
    tip: "Quotes are valid for 7 days.",
  },
  {
    n: "04",
    short: "Ship",
    title: "Print, Inspect & Ship",
    duration: "3–5 days",
    durationNote: "for small parts",
    you: "Watch for the tracking number.",
    me: "Print, measure against spec, clean up supports, package, and ship.",
    tip: "Larger or complex parts may take longer — I'll set expectations in the quote.",
  },
];

const roleLabel = "font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-accent";

export default function HowItWorks() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Process" title="How It Works">
        Simple four-step process — from problem to printed part. No account, no CAD file required.
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* At a glance */}
        <FadeIn>
          <dl className={`${card} grid grid-cols-2 md:grid-cols-4 overflow-hidden mb-20`}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`px-5 py-4 flex flex-col gap-1 border-line ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-fg-muted">
                  {s.n} · {s.short}
                </dt>
                <dd className="font-mono text-lg font-semibold uppercase text-brass">{s.duration}</dd>
                <dd className="text-sm text-fg-secondary">{s.durationNote}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        {/* Steps as a vertical timeline */}
        <div className="relative mb-24">
          <div
            className="absolute left-[22px] md:left-7 top-6 md:top-7 bottom-6 md:bottom-7 w-px bg-linear-to-b from-accent/60 via-brass/40 to-accent/20"
            aria-hidden="true"
          />
          <ol>
            {steps.map((s, i) => (
              <li key={s.n} className="pb-10 md:pb-12 last:pb-0">
                <FadeIn delay={i * 80} className="relative pl-15 md:pl-24">
                  <div className="absolute left-0 top-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-surface border border-brass/50 flex items-center justify-center text-sm md:text-lg font-semibold text-brass font-mono shadow-[0_0_0_6px_var(--color-surface)]">
                    {s.n}
                  </div>
                  <div className={`${card} p-5 md:p-7`}>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-4">
                      <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
                      <span className="font-mono text-xs uppercase tracking-[0.1em] text-brass border border-brass/35 rounded-full px-2.5 py-1 whitespace-nowrap">
                        {s.duration}
                      </span>
                    </div>
                    <dl className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="border-t border-line pt-3">
                        <dt className={`${roleLabel} mb-1.5`}>You</dt>
                        <dd className="text-sm text-fg-muted leading-relaxed">{s.you}</dd>
                      </div>
                      <div className="border-t border-line pt-3">
                        <dt className={`${roleLabel} mb-1.5`}>Me</dt>
                        <dd className="text-sm text-fg-muted leading-relaxed">{s.me}</dd>
                      </div>
                    </dl>
                    <p className="flex items-start gap-2.5 text-sm text-fg-secondary bg-surface border border-line rounded-lg px-4 py-2.5">
                      <Icon name="bulb" size={16} className="text-accent shrink-0 mt-0.5" />
                      {s.tip}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>

        {/* FAQ: intro left, accordion right */}
        <FadeIn>
          <div className="mb-20 grid md:grid-cols-[16rem_1fr] gap-8 md:gap-12 items-start">
            <div>
              <SectionHeader eyebrow="FAQ" title="Common Questions" align="left" />
              <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                Something else?{" "}
                <a href="mailto:michael@precisionprintwork.com" className={`${textLink} font-semibold`}>
                  Email me
                </a>{" "}
                — usually answered within a business day.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className={`${card} relative overflow-hidden rounded-3xl px-6 py-12 text-center`}>
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-fg mb-3">Ready to submit a request?</h2>
              <p className="text-fg-muted mb-8">Takes about 2 minutes. Quotes are free.</p>
              <Link href="/order" className={`${btnPrimary} group`}>
                Get a Free Quote
                <Icon name="arrowRight" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
