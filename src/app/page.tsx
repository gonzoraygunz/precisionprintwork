import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Icon, { type IconName } from "@/components/Icon";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary, btnSecondary, card, textLink } from "@/lib/styles";

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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="circuit-bg bg-surface py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="eyebrow mb-4">FDM · Resin · Custom</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-fg">
              Practical Parts and Solutions, Tabletop Minis, Terrain,{" "}
              <span className="text-accent">Gifts and Custom Requests</span>
            </h1>
            <p className="mt-6 text-fg-secondary text-lg leading-relaxed max-w-xl mx-auto">
              Custom 3D printing for functional parts, D&D minis, gifts, terrain, prototypes, and
              anything in between. FDM and resin. Fast turnaround. Real person behind every order.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/order" className={btnPrimary}>
                Get a Free Quote
              </Link>
              <Link href="/services" className={btnSecondary}>
                See What I Make
              </Link>
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

      {/* Process teaser */}
      <section className="circuit-bg py-20 px-4 bg-surface-raised">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <SectionHeader eyebrow="Simple Process" title="From Request to Doorstep" className="mb-12" />
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 100}>
                <div className="text-center">
                  <div className="font-mono text-4xl font-semibold text-brass mb-3">{s.n}</div>
                  <h3 className="font-semibold text-fg mb-1">{s.title}</h3>
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
      <section className="circuit-bg py-20 px-4 bg-surface border-t border-line">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader
              eyebrow="Ready?"
              title="Got something in mind?"
              lead="Minis, parts, gifts, terrain — describe it and get a free quote. Usually back within a day."
              className="mb-8"
            />
            <Link href="/order" className={btnPrimary}>
              Start a Request
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
