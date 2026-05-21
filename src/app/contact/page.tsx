import Link from "next/link";

export default function Contact() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="text-4xl font-bold text-white">Contact</h1>
          <p className="mt-4 text-slate-400">
            For quotes, use the{" "}
            <Link href="/order" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              quote request form
            </Link>
            . For everything else, email works best.
          </p>
        </div>

        <div className="circuit-bg bg-slate-800 border border-slate-700 rounded-2xl p-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Email</p>
            <a
              href="mailto:michael@precisionprintwork.com"
              className="text-white font-medium hover:text-cyan-400 transition-colors"
            >
              michael@precisionprintwork.com
            </a>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Response Time</p>
            <p className="text-slate-300">Typically within 1 business day.</p>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">Location</p>
            <p className="text-slate-300">Ships from United States.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/order"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
