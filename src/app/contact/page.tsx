import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Icon, { type IconName } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { btnPrimary, card, textLink } from "@/lib/styles";

const details: { icon: IconName; label: string; value: React.ReactNode }[] = [
  {
    icon: "mail",
    label: "Email",
    value: (
      <a
        href="mailto:michael@precisionprintwork.com"
        className="text-fg font-medium hover:text-accent transition-colors [overflow-wrap:anywhere]"
      >
        michael@precisionprintwork.com
      </a>
    ),
  },
  { icon: "clock", label: "Response Time", value: <span className="text-fg-secondary">Typically within 1 business day.</span> },
  { icon: "pin", label: "Location", value: <span className="text-fg-secondary">Ships from United States.</span> },
];

export default function Contact() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Get in Touch" title="Contact">
        For quotes, use the{" "}
        <Link href="/order" className={textLink}>
          quote request form
        </Link>
        . For everything else, email works best.
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <dl className="grid md:grid-cols-3 gap-5 mb-12">
          {details.map((d, i) => (
            <FadeIn key={d.label} delay={i * 80}>
              <div className={`${card} h-full p-6`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-surface-overlay text-accent">
                  <Icon name={d.icon} size={20} />
                </div>
                <dt className="eyebrow mb-1.5">{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            </FadeIn>
          ))}
        </dl>

        <FadeIn>
          <div className={`${card} relative overflow-hidden rounded-3xl px-6 py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left`}>
            <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-fg mb-2">Have a part in mind?</h2>
              <p className="text-fg-muted">The quote form gets you the fastest answer — and it&apos;s free.</p>
            </div>
            <Link href="/order" className={`${btnPrimary} group relative shrink-0`}>
              Get a Free Quote
              <Icon name="arrowRight" size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
