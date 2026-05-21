import Link from "next/link";

const features = [
  {
    icon: "⚙️",
    bg: "bg-blue-50",
    title: "Functional Parts",
    body: "Brackets, mounts, adapters, jigs — if it needs to actually work, this is the specialty.",
  },
  {
    icon: "🎲",
    bg: "bg-green-50",
    title: "D&D Minis & Terrain",
    body: "Detailed resin-printed miniatures and modular terrain for tabletop games. Paint-ready out of the box.",
  },
  {
    icon: "🎁",
    bg: "bg-blue-50",
    title: "Gifts & Keepsakes",
    body: "Personalized prints, name plates, figurines, and one-of-a-kind gifts. If you can describe it, it can be made.",
  },
  {
    icon: "🔧",
    bg: "bg-green-50",
    title: "Replacement Parts",
    body: "Broken clip? Discontinued knob? Snap a photo and I'll reverse-engineer and reprint it.",
  },
  {
    icon: "💎",
    bg: "bg-blue-50",
    title: "Resin Printing",
    body: "Ultra-high detail for small parts, minis, and jewelry-quality prints. Smooth surfaces, crisp edges.",
  },
  {
    icon: "📐",
    bg: "bg-green-50",
    title: "Prototypes",
    body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative.",
  },
];

const steps = [
  { n: "01", title: "Submit a Request", body: "Describe your part, upload a file or sketch, and note your timeline." },
  { n: "02", title: "Review & Quote", body: "A quote is sent within 1–2 business days. No commitment required." },
  { n: "03", title: "Approve & Pay", body: "Pay securely via the link in your quote email." },
  { n: "04", title: "Printed & Shipped", body: "Your part is printed, inspected, and on its way." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-4">
            FDM · Resin · Custom
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            If You Can Dream It,{" "}
            <span className="text-green-400">I Can Print It</span>
          </h1>
          <p className="mt-6 text-slate-300 text-lg max-w-xl mx-auto">
            Custom 3D printing for functional parts, D&D minis, gifts, terrain, prototypes, and
            anything in between. FDM and resin. Fast turnaround. Real person behind every order.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:border-slate-400 transition-colors"
            >
              See What I Make
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-widest text-center mb-3">What I Do</p>
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">A Lot, Actually</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
                <div className={`${f.bg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {f.icon}
                </div>
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
          <p className="text-green-600 text-sm font-semibold uppercase tracking-widest text-center mb-3">Simple Process</p>
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">From Request to Doorstep</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-3">{s.n}</div>
                <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              See the full process →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Got something in mind? 🎉</h2>
          <p className="text-blue-100 mb-8">
            Minis, parts, gifts, terrain — describe it and get a free quote. Usually back within a day.
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
