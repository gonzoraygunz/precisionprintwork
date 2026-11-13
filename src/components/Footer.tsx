import Link from "next/link";
import Image from "next/image";

const pages = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/order", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-fg-muted">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Image src="/logo.png" alt="Precision Printworks" width={1408} height={768} className="h-12 w-auto mb-2" />
          <p className="mt-2 text-sm max-w-xs">Custom 3D printing — parts, minis, terrain, gifts, and more.</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-fg-secondary mb-1">Pages</p>
          {pages.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-fg-secondary mb-1">Contact</p>
          <a href="mailto:michael@precisionprintwork.com" className="hover:text-fg transition-colors">
            michael@precisionprintwork.com
          </a>
        </div>
      </div>
      <div className="border-t border-line text-center text-xs py-4 text-fg-muted">
        © {new Date().getFullYear()} Precision Printworks. All rights reserved.
      </div>
    </footer>
  );
}
