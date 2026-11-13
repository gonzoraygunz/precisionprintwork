import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import ServiceJumpNav from "@/components/ServiceJumpNav";
import { btnPrimary, card } from "@/lib/styles";

type Service = {
  id: string;
  short: string;
  icon: IconName;
  title: string;
  body: string;
  examples: string[];
  spec: [label: string, value: string][];
};

const services: Service[] = [
  { id: "minis", short: "Minis & Terrain", icon: "d20", title: "D&D Minis & Terrain", body: "High-detail resin-printed miniatures and modular terrain for tabletop RPGs and wargames. Paint-ready, crisp details, any scale.", examples: ["Character and monster miniatures", "Dungeon tiles and scatter terrain", "Custom minis from character descriptions", "Bulk NPC packs"], spec: [["Process", "Resin · FDM"], ["Good for", "Painting"]] },
  { id: "parts", short: "Functional Parts", icon: "gear", title: "Functional Parts", body: "Parts designed to solve a specific problem — mounts, adapters, jigs, fixtures, and anything in between.", examples: ["Cable management and organizers", "Camera and sensor mounts", "Tool holders and shop fixtures", "Machine adapters and spacers"], spec: [["Process", "FDM"], ["Good for", "Fit · Strength"]] },
  { id: "gifts", short: "Gifts", icon: "gift", title: "Gifts & Keepsakes", body: "Personalized, one-of-a-kind prints that make a real impression. Great for birthdays, holidays, or just because.", examples: ["Name plates and desk signs", "Personalized figurines", "Custom ornaments and decorations", "Novelty items and fun designs"], spec: [["Process", "FDM · Resin"], ["Good for", "One-offs"]] },
  { id: "repair", short: "Repair Parts", icon: "wrench", title: "Replacement & Repair Parts", body: "Discontinued or hard-to-find components. Bring a broken part and I'll reverse-engineer and reprint it.", examples: ["Appliance clips and brackets", "Machine housings and knobs", "Broken plastic handles and tabs", "Vintage/discontinued hardware"], spec: [["Process", "FDM"], ["Start with", "A photo"]] },
  { id: "resin", short: "Resin", icon: "gem", title: "Resin Printing", body: "Ultra-fine detail for minis, jewelry, small parts, and anything where surface quality matters. Smooth, crisp, professional finish.", examples: ["Miniatures with fine detail", "Jewelry and wearables", "Dental and display models", "Small mechanical parts"], spec: [["Process", "Resin"], ["Good for", "Surface finish"]] },
  { id: "prototypes", short: "Prototypes", icon: "ruler", title: "Prototypes", body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative.", examples: ["Product enclosures and housings", "Ergonomic handles and grips", "Fit-check and form models", "Investor demo pieces"], spec: [["Process", "FDM"], ["Good for", "Iteration"]] },
  { id: "props", short: "Terrain & Props", icon: "mountain", title: "Terrain & Props", body: "Large-format FDM terrain, cosplay props, display pieces, and set dressing for games, film, or events.", examples: ["Full dungeon room sets", "Cosplay armor and accessories", "Display pedestals and stands", "Game convention booth props"], spec: [["Process", "FDM"], ["Good for", "Large format"]] },
  { id: "design", short: "Design + Print", icon: "pencil", title: "Design + Print", body: "No CAD file? No problem. Describe what you need — or send a sketch, photo, or reference — and I'll model it from scratch.", examples: ["Sketch or photo → 3D model → print", "Fully dimensioned technical drawings", "Iterative revisions included", "File delivery available on request"], spec: [["Process", "CAD → FDM · Resin"], ["Start with", "A sketch"]] },
];

// Relative 1–3 ratings, in ratingCols order.
const ratingCols = ["Strength", "Flex", "Heat · UV", "Detail"] as const;
const materials: { name: string; ratings: [number, number, number, number]; best: string }[] = [
  { name: "PLA", ratings: [2, 1, 1, 2], best: "Display pieces, gifts, low-stress parts" },
  { name: "PETG", ratings: [3, 2, 2, 2], best: "Functional parts, mounts, damp places" },
  { name: "TPU", ratings: [2, 3, 1, 1], best: "Gaskets, bumpers, grips, wearables" },
  { name: "ASA / ABS", ratings: [3, 1, 3, 2], best: "Outdoor and under-hood parts" },
  { name: "Resin", ratings: [1, 1, 1, 3], best: "Minis, jewelry, small detailed parts" },
];

const specLabel = "font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-fg-muted";

function Rating({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex gap-1" role="img" aria-label={`${label}: ${value} of 3`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`w-2.5 h-2.5 rounded-[2px] ${n <= value ? "bg-brass" : "bg-surface-overlay"}`} />
      ))}
    </span>
  );
}

export default function Services() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="What I Offer" title="Services">
        Parts, minis, gifts, terrain, prototypes — if you can describe it, there&apos;s a good chance I can print it. FDM and resin available.
      </PageHeader>

      <ServiceJumpNav items={services.map((s) => ({ id: s.id, label: s.short }))} />

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={(i % 2) * 60} className="h-full">
              <article
                id={s.id}
                className={`${card} scroll-mt-40 md:scroll-mt-28 h-full flex flex-col overflow-hidden hover:border-accent-line hover:glow-accent transition-all duration-300`}
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-surface-overlay text-accent w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={s.icon} size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-fg">{s.title}</h2>
                  </div>
                  <p className="text-fg-muted text-sm leading-relaxed mb-4">{s.body}</p>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                    {s.examples.map((e) => (
                      <li key={e} className="text-sm text-fg-secondary flex items-start gap-2 leading-snug">
                        <Icon name="check" size={14} strokeWidth={2.5} className="text-accent shrink-0 mt-0.5" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <dl className="grid grid-cols-2 border-t border-line">
                  {s.spec.map(([k, v], j) => (
                    <div key={k} className={`px-6 py-3 ${j ? "border-l border-line" : ""}`}>
                      <dt className={specLabel}>{k}</dt>
                      <dd className="font-mono text-sm uppercase text-brass">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Materials matrix */}
        <FadeIn>
          <section id="materials" className="mb-24 scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <SectionHeader eyebrow="Materials" title="What It's Made From" align="left" />
              <p className="text-sm text-fg-muted max-w-xs">
                Not sure? Pick &ldquo;suggest one&rdquo; on the quote form and I&apos;ll recommend a material.
              </p>
            </div>

            {/* Table on md+, stacked cards on phones */}
            <div className={`${card} hidden md:block overflow-hidden`}>
              <table className="w-full text-sm">
                <caption className="sr-only">Material comparison, rated 1 to 3</caption>
                <thead>
                  <tr className="border-b border-line font-mono text-xs tracking-[0.14em] uppercase text-fg-muted text-left">
                    <th scope="col" className="px-5 py-3.5 font-medium">Material</th>
                    {ratingCols.map((c) => (
                      <th key={c} scope="col" className="px-5 py-3.5 font-medium">{c}</th>
                    ))}
                    <th scope="col" className="px-5 py-3.5 font-medium w-1/3">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.name} className="border-b border-line last:border-0">
                      <th scope="row" className="px-5 py-4 text-left font-mono text-base font-semibold uppercase text-brass">{m.name}</th>
                      {m.ratings.map((r, j) => (
                        <td key={ratingCols[j]} className="px-5 py-4"><Rating value={r} label={ratingCols[j]} /></td>
                      ))}
                      <td className="px-5 py-4 text-fg-muted">{m.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="md:hidden space-y-3">
              {materials.map((m) => (
                <li key={m.name} className={`${card} p-5`}>
                  <p className="font-mono font-semibold uppercase text-brass text-lg mb-1">{m.name}</p>
                  <p className="text-fg-muted text-sm mb-4">{m.best}</p>
                  <dl className="grid grid-cols-2 gap-3">
                    {m.ratings.map((r, j) => (
                      <div key={ratingCols[j]} className="flex items-center justify-between gap-2">
                        <dt className={specLabel}>{ratingCols[j]}</dt>
                        <dd><Rating value={r} label={ratingCols[j]} /></dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>

            <p className="font-mono text-xs tracking-[0.08em] uppercase text-fg-muted mt-4">
              Relative ratings · other materials on request — availability varies
            </p>
          </section>
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
