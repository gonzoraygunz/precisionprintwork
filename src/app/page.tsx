import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Icon, { type IconName } from "@/components/Icon";
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

const heroPoints = ["Free quotes", "FDM + resin", "A real person on every order"];

// Hero collage: the two trays side by side, then the LED holder and the third tray.
const heroShots = [projects[0], projects[1], projects[3], projects[2]];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden circuit-bg bg-slate-900 text-white">
        <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <Icon name="layers" className="w-3.5 h-3.5" />
              FDM · Resin · Custom
            </p>
            <h1
              className="animate-rise text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight"
              style={{ animationDelay: "80ms" }}
            >
              Practical Parts and Solutions, Tabletop Minis, Terrain,{" "}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-amber-300 bg-clip-text text-transparent">
                Gifts and Custom Requests
              </span>
            </h1>
            <p
              className="animate-rise mt-6 text-slate-300 text-lg max-w-xl mx-auto lg:mx-0"
              style={{ animationDelay: "160ms" }}
            >
              Custom 3D printing for functional parts, D&D minis, gifts, terrain, prototypes, and
              anything in between. Fast turnaround. Real person behind every order.
            </p>
            <div
              className="animate-rise mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/order"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:glow-blue transition-all"
              >
                Get a Free Quote
                <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center border border-slate-600 bg-slate-900/40 text-slate-200 px-7 py-3 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-300 transition-colors"
              >
                See Recent Prints
              </Link>
            </div>
            <ul
              className="animate-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-400"
              style={{ animationDelay: "320ms" }}
            >
              {heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-cyan-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Collage of real prints */}
          <div className="animate-rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "200ms" }}>
            <div className="grid grid-cols-2 gap-4">
              {heroShots.map((p, i) => (
                <div
                  key={p.src}
                  className={`relative aspect-square rounded-2xl overflow-hidden bg-[#e7e7e7] ring-1 ring-white/10 shadow-2xl shadow-black/50 ${
                    i % 2 === 1 ? "translate-y-8" : ""
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, 45vw"
                    className="object-contain p-3"
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 translate-y-8 whitespace-nowrap rounded-full border border-slate-700 bg-slate-900/90 backdrop-blur px-4 py-2 text-xs text-slate-300 shadow-lg">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 align-middle" />
              Printed in-house, inspected by hand
            </div>
          </div>
        </div>
        <div className="h-8 md:h-4" aria-hidden="true" />
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">What I Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">A Lot, Actually</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div className="group rounded-2xl p-6 bg-slate-800/60 border border-slate-700/80 hover:border-cyan-700 hover:bg-slate-800 hover:glow-cyan hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20 group-hover:bg-cyan-500/15 group-hover:text-cyan-200 transition-colors">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="py-20 px-4 bg-slate-950/40 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 text-center sm:text-left">
              <div>
                <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Recent Prints</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Off the Print Bed</h2>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
              >
                View the portfolio
                <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <FadeIn key={p.src} delay={i * 80}>
                <Link href="/portfolio" className="group block">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#e7e7e7] ring-1 ring-slate-700 group-hover:ring-cyan-500/60 transition">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-200 group-hover:text-white">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.alt.split("—")[1]?.trim()}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="circuit-bg py-20 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest text-center mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-14">From Request to Doorstep</h2>
          </FadeIn>
          <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {/* connector line behind the step badges */}
            <div
              className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-cyan-500/50 via-amber-400/40 to-cyan-500/50"
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 100}>
                <div className="relative text-center">
                  <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-slate-900 border border-amber-400/50 flex items-center justify-center text-lg font-bold text-amber-300 font-mono shadow-[0_0_0_6px_rgb(15_23_42)]">
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm max-w-[16rem] mx-auto">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/how-it-works"
                className="group inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
              >
                See the full process
                <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-900">
        <FadeIn>
          <div className="relative overflow-hidden max-w-4xl mx-auto text-center rounded-3xl border border-slate-700 bg-slate-800/60 px-6 py-14 md:py-16">
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Ready?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Got something in mind?</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Minis, parts, gifts, terrain — describe it and get a free quote. Usually back within a day.
              </p>
              <Link
                href="/order"
                className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:glow-blue transition-all"
              >
                Start a Request
                <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
