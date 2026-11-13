import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

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
    <div className="bg-slate-900 min-h-screen">
      <PageHeader eyebrow="Process" title="How It Works">
        Simple four-step process — from problem to printed part.
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Steps as a vertical timeline */}
        <div className="relative mb-24">
          <div
            className="absolute left-[22px] md:left-7 top-6 md:top-7 bottom-6 md:bottom-7 w-px bg-linear-to-b from-cyan-500/60 via-amber-400/40 to-cyan-500/20"
            aria-hidden="true"
          />
          <ol>
            {steps.map((s, i) => (
              <li key={s.n} className="pb-10 md:pb-12 last:pb-0">
                <FadeIn delay={i * 80} className="relative pl-15 md:pl-24">
                  <div className="absolute left-0 top-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-slate-900 border border-amber-400/50 flex items-center justify-center text-sm md:text-lg font-bold text-amber-300 font-mono shadow-[0_0_0_6px_rgb(15_23_42)]">
                    {s.n}
                  </div>
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 md:p-7 hover:border-slate-600 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-3">{s.title}</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">{s.body}</p>
                    <p className="flex items-start gap-2.5 text-sm text-cyan-200 bg-cyan-500/5 border border-cyan-500/20 rounded-lg px-4 py-2.5">
                      <Icon name="bulb" className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
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
          <div className="mb-20">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Common Questions</h2>
            <FaqAccordion />
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/60 px-6 py-12 text-center">
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to submit a request?</h2>
              <p className="text-slate-400 mb-8">Takes about 2 minutes. Quotes are free.</p>
              <Link
                href="/order"
                className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:glow-blue transition-all"
              >
                Request a Quote
                <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
