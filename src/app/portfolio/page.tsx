import Link from "next/link";

const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

export default function Portfolio() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Past Work</p>
        <h1 className="text-4xl font-bold text-slate-900">Portfolio</h1>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          A sample of completed projects. Each one started as a problem — this is what came out the other end.
        </p>
      </div>

      {/* Replace these placeholder cards with real photos */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {placeholders.map((i) => (
          <div
            key={i}
            className="aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-dashed border-slate-300"
          >
            Add photo {i}
          </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Have a similar project in mind?</h2>
        <p className="text-slate-500 mb-6 text-sm">
          Every item here started with a request. Submit yours and get a free quote.
        </p>
        <Link
          href="/order"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
        >
          Start a Request
        </Link>
      </div>
    </div>
  );
}
