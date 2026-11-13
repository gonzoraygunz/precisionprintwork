import Link from "next/link";
import Image from "next/image";
import { btnPrimarySm } from "@/lib/styles";

const pages = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/order", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

const headingClass = "font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-fg-secondary mb-1";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-fg-muted">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          {/* Same lockup as the nav: cropped mark + text wordmark */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Precision Printworks home"
          >
            <Image src="/logo-mark.png" alt="" width={230} height={256} className="h-12 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-wide text-fg">PRECISION</span>
              <span className="font-mono text-[0.6875rem] font-medium tracking-[0.2em] text-accent mt-1">PRINTWORKS</span>
            </span>
          </Link>
          <p className="mt-4 text-sm max-w-xs leading-relaxed">
            Custom 3D printing — parts, minis, terrain, gifts, and more.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className={headingClass}>Pages</p>
          {pages.map((l) => (
            <Link key={l.href} href={l.href} className="w-fit hover:text-fg transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className={headingClass}>Contact</p>
          <a href="mailto:michael@precisionprintwork.com" className="w-fit hover:text-fg transition-colors [overflow-wrap:anywhere]">
            michael@precisionprintwork.com
          </a>
          <Link href="/order" className={`${btnPrimarySm} mt-3 w-fit`}>
            Get a Free Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-line text-center text-xs py-5 text-fg-muted">
        © {new Date().getFullYear()} Precision Printworks. All rights reserved.
      </div>
    </footer>
  );
}
