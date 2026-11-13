import Link from "next/link";
import CaseStudy from "@/components/CaseStudy";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import { btnPrimary } from "@/lib/styles";
import { caseStudies } from "@/lib/projects";

export default function Portfolio() {
  return (
    <div className="bg-surface min-h-screen">
      <PageHeader eyebrow="Past Work" title="Portfolio">
        A sample of completed projects. Each one started as a problem — this is what came out the other end.
      </PageHeader>

      {caseStudies.map((study, i) => (
        <section
          key={study.id}
          className={`px-4 py-16 md:py-20 ${i % 2 ? "bg-surface-raised border-y border-line" : ""}`}
        >
          <FadeIn className="max-w-6xl mx-auto">
            <CaseStudy study={study} index={i + 1} reverse={i % 2 === 1} />
          </FadeIn>
        </section>
      ))}

      {/* The next case is the visitor's */}
      <section className="px-4 py-16 md:py-20">
        <FadeIn className="max-w-6xl mx-auto">
          <div className="circuit-bg rounded-2xl border border-dashed border-line-control p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[0.8125rem] tracking-[0.14em] uppercase text-brass mb-3">
                Case {String(caseStudies.length + 1).padStart(2, "0")} · Yours
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-fg mb-2">Have a similar project in mind?</h2>
              <p className="text-fg-muted max-w-xl">
                Every item here started with a request. Submit yours and get a free quote.
              </p>
            </div>
            <Link href="/order" className={`${btnPrimary} shrink-0`}>
              Get a Free Quote
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
