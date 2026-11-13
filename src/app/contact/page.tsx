import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Icon, { type IconName } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

const details: { icon: IconName; label: string; value: React.ReactNode }[] = [
  {
    icon: "mail",
    label: "Email",
    value: (
      <a
        href="mailto:michael@precisionprintwork.com"
        className="text-white font-medium hover:text-cyan-300 transition-colors break-all"
      >
        michael@precisionprintwork.com
      </a>
    ),
  },
  { icon: "clock", label: "Response Time", value: <span className="text-slate-200">Typically within 1 business day.</span> },
  { icon: "pin", label: "Location", value: <span className="text-slate-200">Ships from United States.</span> },
];

export default function Contact() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <PageHeader eyebrow="Get in Touch" title="Contact">
        For quotes, use the{" "}
        <Link href="/order" className="text-cyan-400 hover:text-cyan-300 underline-offset-4 hover:underline transition-colors">
          quote request form
        </Link>
        . For everything else, email works best.
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {details.map((d, i) => (
            <FadeIn key={d.label} delay={i * 80}>
              <div className="h-full rounded-2xl border border-slate-700/80 bg-slate-800/60 p-6 hover:border-cyan-700 hover:glow-cyan transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                  <Icon name={d.icon} className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1.5">{d.label}</p>
                {d.value}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/60 px-6 py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-2">Have a part in mind?</h2>
              <p className="text-slate-400">The quote form gets you the fastest answer — and it&apos;s free.</p>
            </div>
            <Link
              href="/order"
              className="relative group shrink-0 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:glow-blue transition-all"
            >
              Request a Quote
              <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
