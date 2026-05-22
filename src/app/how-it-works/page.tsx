import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";

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
      <div className="max-w-4xl mx-auto px-4 py-20">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Process</p>
            <h1 className="text-4xl font-bold text-white">How It Works</h1>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Simple four-step process — from problem to printed part.
            </p>
          </div>
        </FadeIn>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 80}>
              <div className="flex gap-8 items-start">
                <div className="text-4xl font-bold text-amber-400 w-16 shrink-0 pt-1">{s.n}</div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{s.title}</h2>
                  <p className="text-slate-400 leading-relaxed mb-3">{s.body}</p>
                  <p className="text-sm text-cyan-300 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 inline-block">
                    💡 {s.tip}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* FAQ — interactive accordion */}
        <FadeIn>
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Common Questions</h2>
            <FaqAccordion />
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="circuit-bg bg-slate-800 gradient-border text-white rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to submit a request?</h2>
            <p className="text-slate-400 mb-6">Takes about 2 minutes. Quotes are free.</p>
            <Link
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:glow-blue transition-all inline-block"
            >
              Request a Quote
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
