"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  // The quote form pins its submit bar to the bottom on phones; sit above it there.
  const raised = usePathname() === "/order";

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed ${raised ? "bottom-24 md:bottom-6" : "bottom-6"} right-6 z-40 bg-surface-raised border border-line hover:border-accent text-fg-muted hover:text-accent rounded-full w-11 h-11 flex items-center justify-center shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Icon name="arrowUp" size={18} strokeWidth={2} />
    </button>
  );
}
