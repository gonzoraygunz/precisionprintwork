import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Image src="/logo.png" alt="Precision Printworks" width={1408} height={768} className="h-12 w-auto mb-2" />
          <p className="mt-2 text-sm max-w-xs">
            Custom 3D printing — parts, minis, terrain, gifts, and more.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-white font-semibold">Pages</p>
          {[
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/how-it-works", label: "How It Works" },
            { href: "/order", label: "Get a Quote" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="text-white font-semibold">Contact</p>
          <a href="mailto:michael@precisionprintwork.com" className="hover:text-white transition-colors">
            michael@precisionprintwork.com
          </a>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center text-xs py-4 text-slate-600">
        © {new Date().getFullYear()} Precision Printworks. All rights reserved.
      </div>
    </footer>
  );
}
