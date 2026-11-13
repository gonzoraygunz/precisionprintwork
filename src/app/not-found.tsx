import type { Metadata } from "next";
import Link from "next/link";
import RequestedPath from "@/components/RequestedPath";
import { btnPrimary, btnSecondary, textLink } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Page not found — Precision Printworks",
};

const row = "flex justify-between gap-4 px-5 py-3.5 text-sm";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden circuit-bg min-h-[70vh] flex items-center">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl w-full mx-auto px-4 py-20 grid md:grid-cols-[1fr_22rem] gap-12 md:gap-16 items-center">
        <div className="animate-rise">
          <p className="eyebrow text-brass mb-4">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-fg mb-5">
            This part isn&apos;t in the catalog.
          </h1>
          <p className="text-lg text-fg-muted leading-relaxed max-w-xl mb-8">
            The page you&apos;re after doesn&apos;t exist or has moved. If it&apos;s a part you need, though, I can
            probably make it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/order" className={btnPrimary}>
              Get a Free Quote
            </Link>
            <Link href="/" className={btnSecondary}>
              Back to Home
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface-raised overflow-hidden">
          <div className="px-5 py-3.5 border-b border-line flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.14em] text-accent">INSPECTION REPORT</span>
            <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_10px_rgba(248,113,113,0.6)]" aria-hidden="true" />
          </div>
          <dl>
            <div className={`${row} border-b border-line`}>
              <dt className="text-fg-muted">Status</dt>
              <dd className="font-mono text-danger">404</dd>
            </div>
            <div className={`${row} border-b border-line`}>
              <dt className="text-fg-muted">Requested</dt>
              <dd className="font-mono text-brass text-right min-w-0"><RequestedPath /></dd>
            </div>
            <div className={`${row} border-b border-line`}>
              <dt className="text-fg-muted">Try</dt>
              <dd><Link href="/services" className={`${textLink} font-semibold`}>Services</Link></dd>
            </div>
            <div className={row}>
              <dt className="text-fg-muted">Or</dt>
              <dd><Link href="/portfolio" className={`${textLink} font-semibold`}>Portfolio</Link></dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
