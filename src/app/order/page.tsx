import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

const next = [
  { n: "01", text: "I review your request and reach out if anything needs clarifying." },
  { n: "02", text: "You get a quote by email within 1–2 business days." },
  { n: "03", text: "Approve and pay via the secure link — then it goes to the printer." },
];

export default function Order() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <PageHeader eyebrow="Free Quote" title="Request a Quote">
        Describe your part, attach a file if you have one, and I&apos;ll send a quote to your email within
        1–2 business days.
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-[1fr_20rem] gap-8 lg:gap-10 items-start">
        <div className="rounded-3xl border border-slate-700/80 bg-slate-800/50 p-6 md:p-10">
          <OrderForm />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-6">
            <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">What happens next</h2>
            <ol className="space-y-4">
              {next.map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full border border-amber-400/50 text-amber-300 font-mono text-xs font-bold flex items-center justify-center">
                    {s.n}
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed pt-1">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
              <Icon name="bulb" className="w-4 h-4" />
              No file? No problem.
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A clear description, a photo of a broken part, or a rough sketch is enough to start.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-6">
            <p className="text-sm text-slate-400 mb-2">Prefer email?</p>
            <a
              href="mailto:michael@precisionprintwork.com"
              className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-cyan-300 transition-colors [overflow-wrap:anywhere]"
            >
              <Icon name="mail" className="w-4 h-4 shrink-0 text-cyan-400" />
              michael@precisionprintwork.com
            </a>
            <p className="mt-4 text-sm">
              <Link href="/how-it-works" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Read the FAQ →
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
