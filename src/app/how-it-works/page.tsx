import Link from "next/link";

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

const faqs = [
  {
    q: "Do I need a CAD file?",
    a: "No. A clear description, a photo of a broken part, or a rough sketch is enough to start. I'll model it.",
  },
  {
    q: "What if the part doesn't fit?",
    a: "Reach out. If the print matches the spec you gave me, we'll work together on a revision. If I made an error, the reprint is on me.",
  },
  {
    q: "Can you do multiple quantities?",
    a: "Yes. Per-unit cost drops with quantity. Note how many you need in the quote form.",
  },
  {
    q: "How long does it take?",
    a: "Quotes within 1–2 days. Prints within 3–5 business days of payment for standard parts. Timeline is confirmed in the quote.",
  },
];

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">Process</p>
        <h1 className="text-4xl font-bold text-slate-900">How It Works</h1>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          Simple four-step process — from problem to printed part.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12 mb-20">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-8 items-start">
            <div className="text-4xl font-bold text-green-500 w-16 shrink-0 pt-1">{s.n}</div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h2>
              <p className="text-slate-500 leading-relaxed mb-3">{s.body}</p>
              <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-2 inline-block">
                💡 {s.tip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Common Questions</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-slate-100 pb-6">
              <h3 className="font-semibold text-slate-900 mb-2">{f.q}</h3>
              <p className="text-slate-500 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to submit a request?</h2>
        <p className="text-slate-400 mb-6">Takes about 2 minutes. Quotes are free.</p>
        <Link
          href="/order"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
