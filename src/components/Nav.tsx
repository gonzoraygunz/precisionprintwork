"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { btnPrimarySm } from "@/lib/styles";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

const linkClass = (active: boolean) =>
  active ? "text-accent" : "text-fg-secondary hover:text-fg transition-colors";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-surface/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <Image src="/logo-mark.png" alt="" width={230} height={256} className="h-12 w-auto" loading="eager" fetchPriority="high" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-wide text-fg">PRECISION</span>
            <span className="font-mono text-[0.6875rem] font-medium tracking-[0.2em] text-accent mt-1">PRINTWORKS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={linkClass(pathname === l.href)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/order" className={btnPrimarySm}>
            Get a Quote
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-fg-secondary hover:text-fg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Icon name={open ? "close" : "menu"} strokeWidth={2} />
        </button>
      </div>

      {/* Mobile nav — slide down via max-height transition */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        inert={!open}
        className={`md:hidden border-t border-line px-4 flex flex-col gap-4 text-sm font-medium bg-surface/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0 border-t-0"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === l.href ? "page" : undefined}
            className={linkClass(pathname === l.href)}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/order" onClick={() => setOpen(false)} className={btnPrimarySm}>
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
