import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import { btnPrimary } from "@/lib/styles";
import { projects } from "@/lib/projects";

export default function Portfolio() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Past Work" title="Portfolio">
        A sample of completed projects. Each one started as a problem — this is what came out the other end.
      </PageHeader>
      <div className="max-w-5xl mx-auto px-4 py-20">
        <PortfolioGrid projects={projects} />

        <FadeIn>
          <div className="gradient-border rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-fg mb-2">Have a similar project in mind?</h2>
            <p className="text-fg-muted mb-6 text-sm">
              Every item here started with a request. Submit yours and get a free quote.
            </p>
            <Link href="/order" className={btnPrimary}>
              Get a Free Quote
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
