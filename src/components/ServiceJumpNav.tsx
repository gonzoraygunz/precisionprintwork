"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Numbered jump links to each service. On phones it's a single sideways-scrolling
 * strip pinned under the header that highlights the service currently in view.
 */
export default function ServiceJumpNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const stripRef = useRef<HTMLUListElement>(null);

  // Track which service card is in the upper part of the viewport.
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  // Keep the active chip visible inside the strip without scrolling the page.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = active ? strip?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!strip || !chip || strip.scrollWidth <= strip.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({ left: chip.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Jump to a service"
      className="sticky top-18 z-40 md:static border-b border-line bg-surface/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
    >
      <ul
        ref={stripRef}
        className="max-w-5xl mx-auto px-4 py-3 md:py-6 flex gap-2.5 overflow-x-auto md:flex-wrap md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id} data-id={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`inline-flex items-center gap-2 h-11 px-4 rounded-full border bg-surface-raised text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  on ? "border-accent-line text-accent" : "border-line text-fg-secondary hover:border-accent-line hover:text-accent"
                }`}
              >
                <span className="font-mono text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
