"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Precision Printworks home">
          <Image
            src="/logo-mark.png"
            alt=""
            width={420}
            height={467}
            className="h-11 w-auto drop-shadow-[0_0_10px_rgba(34,211,238,0.25)] group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.45)] transition-[filter]"
            loading="eager"
            fetchPriority="high"
          />
          <span className="flex flex-col leading-none">
            <span className="text-white font-bold tracking-[0.12em] text-[15px]">PRECISION</span>
            <span className="text-sky-300 font-semibold tracking-[0.22em] text-[10px] mt-1">PRINTWORKS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname === l.href
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-white transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:glow-blue transition-all"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav — slide down via max-height transition */}
      <nav
        className={`md:hidden border-t border-slate-700 px-4 flex flex-col gap-4 text-sm font-medium bg-slate-900/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-80 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={pathname === l.href ? "text-cyan-400" : "text-slate-300 hover:text-white transition-colors"}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/order"
          onClick={() => setOpen(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
