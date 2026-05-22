import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: "⚙️", title: "Functional Parts", body: "Brackets, mounts, adapters, jigs — if it needs to actually work, this is the specialty." },
  { icon: "🎲", title: "D&D Minis & Terrain", body: "Detailed resin-printed miniatures and modular terrain for tabletop games. Paint-ready out of the box." },
  { icon: "🎁", title: "Gifts & Keepsakes", body: "Personalized prints, name plates, figurines, and one-of-a-kind gifts. If you can describe it, it can be made." },
  { icon: "🔧", title: "Replacement Parts", body: "Broken clip? Discontinued knob? Snap a photo and I'll reverse-engineer and reprint it." },
  { icon: "💎", title: "Resin Printing", body: "Ultra-high detail for small parts, minis, and jewelry-quality prints. Smooth surfaces, crisp edges." },
  { icon: "📐", title: "Prototypes", body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative." },
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
      <section className="circuit-bg bg-slate-900 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
              FDM · Resin · Custom
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Practical Parts and Solutions, Tabletop Minis, Terrain,{" "}
              <span className="text-cyan-400">Gifts and Custom Requests</span>
            </h1>
            <p className="mt-6 text-slate-300 text-lg max-w-xl mx-auto">
              Custom 3D printing for functional parts, D&D minis, gifts, terrain, prototypes, and
              anything in between. FDM and resin. Fast turnaround. Real person behind every order.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:glow-blue transition-all"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="border border-slate-600 text-slate-200 px-8 py-3 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-colors"
              >
                See What I Make
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">What I Do</p>
            <h2 className="text-3xl font-bold text-center text-white mb-12">A Lot, Actually</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div className="rounded-2xl p-6 bg-slate-800 border border-slate-700 hover:border-cyan-700 hover:glow-cyan transition-all duration-300 h-full">
                  <div className="bg-slate-700 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="circuit-bg py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">Simple Process</p>
            <h2 className="text-3xl font-bold text-center text-white mb-12">From Request to Doorstep</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 100}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-3">{s.n}</div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <div className="text-center mt-10">
              <Link href="/how-it-works" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                See the full process →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="circuit-bg py-20 px-4 bg-slate-900 border-t border-slate-700 text-white">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Ready?</p>
            <h2 className="text-3xl font-bold mb-4">Got something in mind?</h2>
            <p className="text-slate-400 mb-8">
              Minis, parts, gifts, terrain — describe it and get a free quote. Usually back within a day.
            </p>
            <Link
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:glow-blue transition-all inline-block"
            >
              Start a Request
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
