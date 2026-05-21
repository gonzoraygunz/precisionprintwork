import Link from "next/link";

const services = [
  {
    title: "Replacement & Repair Parts",
    body: "Discontinued or hard-to-find components. Bring a broken part and I'll reverse-engineer and reprint it.",
    examples: ["Appliance clips and brackets", "Machine housings", "Broken plastic knobs and handles"],
  },
  {
    title: "Custom Functional Parts",
    body: "Parts designed to solve a specific problem — mounts, adapters, jigs, fixtures, and anything in between.",
    examples: ["Cable management clips", "Camera and sensor mounts", "Tool holders and organizers"],
  },
  {
    title: "Prototypes",
    body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative.",
    examples: ["Product enclosures", "Ergonomic handles", "Fit-check models"],
  },
  {
    title: "Design + Print",
    body: "No CAD file? No problem. Describe what you need and I'll design it from scratch.",
    examples: ["Sketch or photo → 3D model → print", "Fully dimensioned drawings", "Iterative revisions included"],
  },
];

const materials = [
  { name: "PLA", note: "General purpose, rigid, great detail. Best for low-stress parts." },
  { name: "PETG", note: "Tougher than PLA, slight flex, moisture resistant. Good for functional parts." },
  { name: "TPU", note: "Flexible and grippy. Gaskets, bumpers, phone cases." },
  { name: "ASA / ABS", note: "UV and heat resistant. Outdoor or under-hood applications." },
];

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">What I Offer</p>
        <h1 className="text-4xl font-bold text-slate-900">Services</h1>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          Every job is custom. If you can describe it, there&apos;s a good chance I can print it.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {services.map((s) => (
          <div key={s.title} className="border border-slate-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h2>
            <p className="text-slate-500 text-sm mb-4">{s.body}</p>
            <ul className="space-y-1">
              {s.examples.map((e) => (
                <li key={e} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Materials */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Materials</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {materials.map((m) => (
            <div key={m.name} className="bg-slate-50 rounded-xl p-5">
              <p className="font-bold text-slate-900 text-lg mb-1">{m.name}</p>
              <p className="text-slate-500 text-sm">{m.note}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-400 text-sm mt-4">
          Need a specific material? Ask — availability varies.
        </p>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
        <p className="text-slate-400 mb-6">Quotes are free. Describe your part and I&apos;ll get back to you within a day.</p>
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
