import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { card, textLink } from "@/lib/styles";

const next = [
  { n: "01", text: "I review your request and reach out if anything needs clarifying." },
  { n: "02", text: "You get a quote by email within 1–2 business days." },
  { n: "03", text: "Approve and pay via the secure link — then it goes to the printer." },
  { n: "04", text: "Printed, inspected against spec, and shipped with tracking." },
];

export default function Order() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Free Quote" title="Request a Quote">
        Describe your part, attach a file if you have one, and I&apos;ll send a quote to your email within
        1–2 business days.
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-[1fr_20rem] gap-8 lg:gap-10 items-start">
        <div className={`${card} rounded-3xl p-6 md:p-10`}>
          <OrderForm />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className={`${card} p-6`}>
            <h2 className="eyebrow mb-5">What happens next</h2>
            <ol className="space-y-4">
              {next.map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full border border-brass/50 text-brass font-mono text-xs font-semibold flex items-center justify-center">
                    {s.n}
                  </span>
                  <p className="text-sm text-fg-muted leading-relaxed pt-1">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-accent-line bg-accent/5 p-6">
            <p className="flex items-center gap-2 text-accent font-semibold mb-2">
              <Icon name="bulb" size={16} strokeWidth={2} />
              No file? No problem.
            </p>
            <p className="text-sm text-fg-muted leading-relaxed">
              A clear description, a photo of a broken part, or a rough sketch is enough to start.
            </p>
          </div>

          <div className={`${card} p-6`}>
            <p className="text-sm text-fg-muted mb-2">Prefer email?</p>
            <a
              href="mailto:michael@precisionprintwork.com"
              className="inline-flex items-center gap-2 text-sm text-fg font-medium hover:text-accent transition-colors [overflow-wrap:anywhere]"
            >
              <Icon name="mail" size={16} className="shrink-0 text-accent" />
              michael@precisionprintwork.com
            </a>
            <dl className="mt-5 border-t border-line text-sm">
              <div className="flex justify-between gap-4 py-3 border-b border-line">
                <dt className="text-fg-muted">Response</dt>
                <dd className="font-mono text-brass">1 business day</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-fg-muted">Ships from</dt>
                <dd className="font-mono text-brass">United States</dd>
              </div>
            </dl>
            <p className="mt-2 text-sm">
              <Link href="/how-it-works" className={textLink}>
                Read the FAQ →
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
