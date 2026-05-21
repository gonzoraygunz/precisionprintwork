import Link from "next/link";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="text-4xl font-bold text-slate-900">Contact</h1>
        <p className="mt-4 text-slate-500">
          For quotes, use the{" "}
          <Link href="/order" className="text-green-600 hover:underline">
            quote request form
          </Link>
          . For everything else, email works best.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 space-y-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Email</p>
          <a
            href="mailto:michael@precisionprintwork.com"
            className="text-slate-900 font-medium hover:text-green-600 transition-colors"
          >
            michael@precisionprintwork.com
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
          <p className="text-slate-700">Typically within 1 business day.</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Location</p>
          <p className="text-slate-700">Ships from United States.</p>
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
  );
}
