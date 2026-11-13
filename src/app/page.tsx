import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, btnSecondary, card, textLink } from "@/lib/styles";
import { projects } from "@/lib/projects";

const features: { icon: IconName; title: string; body: string }[] = [
  { icon: "gear", title: "Functional Parts", body: "Brackets, mounts, adapters, jigs — if it needs to actually work, this is the specialty." },
  { icon: "d20", title: "D&D Minis & Terrain", body: "Detailed resin-printed miniatures and modular terrain for tabletop games. Paint-ready out of the box." },
  { icon: "gift", title: "Gifts & Keepsakes", body: "Personalized prints, name plates, figurines, and one-of-a-kind gifts. If you can describe it, it can be made." },
  { icon: "wrench", title: "Replacement Parts", body: "Broken clip? Discontinued knob? Snap a photo and I'll reverse-engineer and reprint it." },
  { icon: "gem", title: "Resin Printing", body: "Ultra-high detail for small parts, minis, and jewelry-quality prints. Smooth surfaces, crisp edges." },
  { icon: "ruler", title: "Prototypes", body: "Test your idea before committing to expensive tooling. Fast turnaround, low quantity, iterative." },
];

const steps = [
  { n: "01", title: "Submit a Request", body: "Describe your part, upload a file or sketch, and note your timeline." },
  { n: "02", title: "Review & Quote", body: "A quote is sent within 1–2 business days. No commitment required." },
  { n: "03", title: "Approve & Pay", body: "Pay securely via the link in your quote email." },
  { n: "04", title: "Printed & Shipped", body: "Your part is printed, inspected, and on its way." },
];

const specs = [
  { label: "Quote", value: "1–2 business days" },
  { label: "Print + ship", value: "3–5 business days" },
  { label: "Process", value: "FDM · Resin" },
  { label: "Materials", value: "PLA PETG TPU ASA" },
  { label: "CAD file", value: "Optional" },
];

// One of each kind of work for the home teaser.
const recentWork = [projects[3], projects[0], projects[1]];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="circuit-bg bg-surface pt-20 pb-20 md:pt-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-14 lg:items-center">
          <FadeIn className="flex-1 min-w-0">
            <p className="eyebrow mb-4">FDM · Resin · Custom</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-fg">
              Practical Parts and Solutions, Tabletop Minis, Terrain,{" "}
              <span className="text-accent">Gifts and Custom Requests</span>
            </h1>
            <p className="mt-6 text-fg-secondary text-lg leading-relaxed max-w-xl">
              Custom 3D printing for functional parts, D&D minis, gifts, terrain, prototypes, and
              anything in between. FDM and resin. Fast turnaround. Real person behind every order.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/order" className={btnPrimary}>
                Get a Free Quote
              </Link>
              <Link href="/services" className={btnSecondary}>
                See What I Make
              </Link>
            </div>
          </FadeIn>

          {/* Spec sheet */}
          <FadeIn delay={150} className="w-full lg:w-80 shrink-0">
            <div className={`${card} overflow-hidden`}>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
                <span className="eyebrow">Spec Sheet</span>
                <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.6)]" aria-hidden="true" />
              </div>
              <dl>
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex justify-between gap-4 px-5 py-3.5 text-sm ${i < specs.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <dt className="text-fg-muted">{s.label}</dt>
                    <dd className="font-mono text-brass text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <SectionHeader eyebrow="What I Do" title="A Lot, Actually" className="mb-12" />
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div className={`${card} p-6 h-full hover:border-accent-line hover:glow-accent transition-all duration-300`}>
                  <div className="bg-surface-overlay text-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">{f.title}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="py-20 px-4 bg-surface-raised border-y border-line">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <SectionHeader eyebrow="Recent Work" title="Started as a problem" align="left" />
              <Link href="/portfolio" className={`${textLink} inline-flex items-center gap-1.5 font-semibold`}>
                See the portfolio <Icon name="arrowRight" size={16} strokeWidth={2} />
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWork.map((p, i) => (
              <FadeIn key={p.src} delay={i * 80}>
                <Link
                  href="/portfolio"
                  className="group block h-full rounded-2xl overflow-hidden border border-line bg-surface hover:border-accent-line hover:glow-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="aspect-[4/3] relative bg-surface-overlay">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-5 motion-safe:group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-semibold text-fg">{p.title}</p>
                    <p className="font-mono text-xs uppercase tracking-wide text-brass mt-1.5">{p.tag}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="circuit-bg py-20 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <SectionHeader eyebrow="Simple Process" title="From Request to Doorstep" className="mb-12" />
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 100}>
                <div className={`border-t-2 pt-5 ${i === 0 ? "border-brass" : "border-line"}`}>
                  <div className="font-mono text-4xl font-semibold text-brass leading-none mb-4">{s.n}</div>
                  <h3 className="text-lg font-semibold text-fg mb-2">{s.title}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <div className="text-center mt-10">
              <Link href="/how-it-works" className={`${textLink} inline-flex items-center gap-1.5 font-semibold`}>
                See the full process <Icon name="arrowRight" size={16} strokeWidth={2} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 bg-surface">
        <FadeIn>
          <div className="max-w-6xl mx-auto rounded-2xl border border-accent-line bg-surface-raised px-8 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-brass mb-3">Ready?</p>
              <h2 className="text-3xl font-bold text-fg mb-3">Got something in mind?</h2>
              <p className="text-fg-muted leading-relaxed">
                Minis, parts, gifts, terrain — describe it and get a free quote. Usually back within a day.
              </p>
            </div>
            <Link href="/order" className={`${btnPrimary} shrink-0`}>
              Get a Free Quote
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
