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
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Precision Printworks home">
            <Image src="/logo-mark.png" alt="" width={420} height={467} className="h-12 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="text-white font-bold tracking-[0.12em]">PRECISION</span>
              <span className="text-sky-300 font-semibold tracking-[0.22em] text-[11px] mt-1">PRINTWORKS</span>
            </span>
          </Link>
          <p className="mt-4 text-sm max-w-xs leading-relaxed">
            Custom 3D printing — parts, minis, terrain, gifts, and more.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-white font-semibold mb-1">Pages</p>
          {pages.map((l) => (
            <Link key={l.href} href={l.href} className="w-fit hover:text-cyan-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-white font-semibold mb-1">Contact</p>
          <a href="mailto:michael@precisionprintwork.com" className="w-fit hover:text-cyan-300 transition-colors break-all">
            michael@precisionprintwork.com
          </a>
          <Link
            href="/order"
            className="mt-3 w-fit bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-800/80 text-center text-xs py-5 text-slate-500">
        © {new Date().getFullYear()} Precision Printworks. All rights reserved.
      </div>
    </footer>
  );
}
