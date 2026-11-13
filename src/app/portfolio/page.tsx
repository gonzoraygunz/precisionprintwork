import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/projects";

export default function Portfolio() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Past Work</p>
            <h1 className="text-4xl font-bold text-white">Portfolio</h1>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              A sample of completed projects. Each one started as a problem — this is what came out the other end.
            </p>
          </div>
        </FadeIn>

        <PortfolioGrid projects={projects} />

        <FadeIn>
          <div className="circuit-bg bg-slate-800 gradient-border rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Have a similar project in mind?</h2>
            <p className="text-slate-400 mb-6 text-sm">
              Every item here started with a request. Submit yours and get a free quote.
            </p>
            <Link
              href="/order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:glow-blue transition-all inline-block"
            >
              Start a Request
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
