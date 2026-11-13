import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, card } from "@/lib/styles";

const steps = [
  {
    n: "01",
    title: "Submit a Request",
    body: "Fill out the quote form. Describe your part as best you can — dimensions, function, material preference, and how many you need. Attach a photo, sketch, or STL file if you have one. Don't worry if you don't have a file; a clear description is enough to start.",
    tip: "The more detail you provide, the more accurate the quote.",
  },
  {
    n: "02",
    title: "Review & Quote",
    body: "I review your request, determine the best approach and material, estimate print time and cost, and send you a quote via email — usually within 1–2 business days. If I have questions I'll reach out before quoting.",
    tip: "Complex or multi-part designs may take longer to scope.",
  },
  {
    n: "03",
    title: "Approve & Pay",
    body: "If the quote works for you, simply pay via the secure Stripe link in the email. No account required — card or bank transfer accepted. Payment locks in the order and moves it to the print queue.",
    tip: "Quotes are valid for 7 days.",
  },
  {
    n: "04",
    title: "Print, Inspect & Ship",
    body: "Your part is printed, measured against spec, and any support material is removed and cleaned up. Then it's packaged and shipped to you with a tracking number. Small parts usually ship within 3–5 business days of payment.",
    tip: "Larger or complex parts may take longer — I'll set expectations in the quote.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Process" title="How It Works">
        Simple four-step process — from problem to printed part.
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 py-20">
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
                    <h2 className="text-xl font-semibold text-fg mb-3">{s.title}</h2>
                    <p className="text-fg-muted leading-relaxed mb-4">{s.body}</p>
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

        {/* FAQ */}
        <FadeIn>
          <div className="mb-20 max-w-3xl mx-auto">
            <SectionHeader eyebrow="FAQ" title="Common Questions" className="mb-10" />
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
