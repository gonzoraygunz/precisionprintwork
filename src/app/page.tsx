import Link from "next/link";

const features = [
  {
    icon: "⚙️",
    title: "Functional Parts",
    body: "Brackets, housings, adapters, mounts — if it needs to work, not just look good, this is the specialty.",
  },
  {
    icon: "🎨",
    title: "Custom Designs",
    body: "Describe what you need or send a sketch. Parts are designed from scratch to fit your exact use case.",
  },
  {
    icon: "📐",
    title: "Spec-Accurate",
    body: "Tolerances matter. Every print is measured against the spec before it ships.",
  },
];

const steps = [
  { n: "01", title: "Submit a Request", body: "Describe your part, upload a file or sketch, and note your timeline." },
  { n: "02", title: "Review & Quote", body: "A quote is sent within 1–2 business days." },
  { n: "03", title: "Approve & Pay", body: "Pay securely via the link in your quote email." },
  { n: "04", title: "Printed & Shipped", body: "Your part is printed, inspected, and on its way." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Custom 3D Printing
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Parts Built to Solve{" "}
            <span className="text-green-500">Your Problem</span>
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-xl mx-auto">
            I design and 3D print custom parts and solutions — from one-off prototypes to functional
            replacement components. Describe what you need and I&apos;ll make it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/how-it-works"
              className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">From Request to Doorstep</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{s.n}</div>
                <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              See the full process →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Have a part in mind?</h2>
          <p className="text-blue-100 mb-8">
            Describe it, sketch it, or send a file. Quotes are free and usually back within a day.
          </p>
          <Link
            href="/order"
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Start a Request
          </Link>
        </div>
      </section>
    </>
  );
}
