import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";

const services: { icon: IconName; title: string; body: string; examples: string[] }[] = [
  { icon: "d20", title: "D&D Minis & Terrain", body: "High-detail resin-printed miniatures and modular terrain for tabletop RPGs and wargames. Paint-ready, crisp details, any scale.", examples: ["Character and monster miniatures", "Dungeon tiles and scatter terrain", "Custom minis from character descriptions", "Bulk NPC packs"] },
  { icon: "gear", title: "Functional Parts", body: "Parts designed to solve a specific problem — mounts, adapters, jigs, fixtures, and anything in between.", examples: ["Cable management and organizers", "Camera and sensor mounts", "Tool holders and shop fixtures", "Machine adapters and spacers"] },
  { icon: "gift", title: "Gifts & Keepsakes", body: "Personalized, one-of-a-kind prints that make a real impression. Great for birthdays, holidays, or just because.", examples: ["Name plates and desk signs", "Personalized figurines", "Custom ornaments and decorations", "Novelty items and fun designs"] },
  { icon: "wrench", title: "Replacement & Repair Parts", body: "Discontinued or hard-to-find components. Bring a broken part and I'll reverse-engineer and reprint it.", examples: ["Appliance clips and brackets", "Machine housings and knobs", "Broken plastic handles and tabs", "Vintage/discontinued hardware"] },
  { icon: "gem", title: "Resin Printing", body: "Ultra-fine detail for minis, jewelry, small parts, and anything where surface quality matters. Smooth, crisp, professional finish.", examples: ["Miniatures with fine detail", "Jewelry and wearables", "Dental and display models", "Small mechanical parts"] },
  { icon: "ruler", title: "Prototypes", body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative.", examples: ["Product enclosures and housings", "Ergonomic handles and grips", "Fit-check and form models", "Investor demo pieces"] },
  { icon: "mountain", title: "Terrain & Props", body: "Large-format FDM terrain, cosplay props, display pieces, and set dressing for games, film, or events.", examples: ["Full dungeon room sets", "Cosplay armor and accessories", "Display pedestals and stands", "Game convention booth props"] },
  { icon: "pencil", title: "Design + Print", body: "No CAD file? No problem. Describe what you need — or send a sketch, photo, or reference — and I'll model it from scratch.", examples: ["Sketch or photo → 3D model → print", "Fully dimensioned technical drawings", "Iterative revisions included", "File delivery available on request"] },
];

const materials = [
  { name: "PLA", note: "General purpose, rigid, great detail. Best for display pieces and low-stress parts." },
  { name: "PETG", note: "Tougher than PLA, slight flex, moisture resistant. Good for functional parts." },
  { name: "TPU", note: "Flexible and grippy. Gaskets, bumpers, grips, wearables." },
  { name: "ASA / ABS", note: "UV and heat resistant. Outdoor or under-hood applications." },
  { name: "Resin", note: "Ultra-fine detail for minis, jewelry, and small parts. Smooth surface finish." },
];

export default function Services() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <PageHeader eyebrow="What I Offer" title="Services">
        Parts, minis, gifts, terrain, prototypes — if you can describe it, there&apos;s a good chance I can print it. FDM and resin available.
      </PageHeader>
      <div className="max-w-5xl mx-auto px-4 py-20">

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60}>
              <div className="border border-slate-700 bg-slate-800 rounded-2xl p-6 hover:border-cyan-700 hover:glow-cyan transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                  <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                </div>
                <p className="text-slate-400 text-sm mb-4">{s.body}</p>
                <ul className="space-y-1">
                  {s.examples.map((e) => (
                    <li key={e} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Materials */}
        <FadeIn>
          <div className="mb-20">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">Materials</p>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">What It&apos;s Made From</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {materials.map((m) => (
                <div key={m.name} className="circuit-bg bg-slate-800 gradient-border rounded-xl p-5 hover:glow-cyan transition-all duration-300">
                  <p className="font-bold text-amber-400 text-lg mb-1">{m.name}</p>
                  <p className="text-slate-400 text-sm">{m.note}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Need a specific material? Ask — availability varies.</p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="circuit-bg bg-slate-800 gradient-border rounded-2xl p-10 text-center">
            <div className="mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/30">
              <Icon name="layers" className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Ready to make something?</h2>
            <p className="text-slate-400 mb-6">Quotes are free. Describe your project and I&apos;ll get back to you within a day.</p>
            <Link href="/order" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:glow-blue transition-all inline-block">
              Request a Quote
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
