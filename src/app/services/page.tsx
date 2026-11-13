import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, card } from "@/lib/styles";

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
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="What I Offer" title="Services">
        Parts, minis, gifts, terrain, prototypes — if you can describe it, there&apos;s a good chance I can print it. FDM and resin available.
      </PageHeader>
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60}>
              <div className={`${card} p-6 h-full hover:border-accent-line hover:glow-accent transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-surface-overlay text-accent w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={s.icon} size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
                </div>
                <p className="text-fg-muted text-sm leading-relaxed mb-4">{s.body}</p>
                <ul className="space-y-1">
                  {s.examples.map((e) => (
                    <li key={e} className="text-sm text-fg-secondary flex items-start gap-2">
                      <span className="text-accent mt-0.5" aria-hidden="true">•</span>
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
            <SectionHeader eyebrow="Materials" title="What It's Made From" className="mb-8" />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {materials.map((m) => (
                <div key={m.name} className="gradient-border rounded-xl p-5 hover:glow-accent transition-all duration-300">
                  <p className="font-mono font-semibold uppercase text-brass text-lg mb-1">{m.name}</p>
                  <p className="text-fg-muted text-sm leading-relaxed">{m.note}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-fg-muted text-sm mt-4">Need a specific material? Ask — availability varies.</p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="gradient-border rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-fg mb-3">Ready to make something?</h2>
            <p className="text-fg-muted mb-6">Quotes are free. Describe your project and I&apos;ll get back to you within a day.</p>
            <Link href="/order" className={btnPrimary}>
              Get a Free Quote
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
