"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import type { Project } from "@/lib/projects";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent background scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {projects.map((project) => (
          <button
            key={project.src}
            onClick={() => setSelected(project)}
            className="rounded-2xl overflow-hidden border border-line bg-surface-raised hover:border-accent-line hover:glow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300 text-left group cursor-zoom-in"
          >
            <div className="aspect-square relative bg-[#e7e7e7]">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-fg text-sm">{project.title}</h3>
              <p className="text-fg-muted text-xs mt-1">{project.description}</p>
              <p className="text-accent text-xs mt-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true">
                Click to enlarge →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            className="relative max-w-xl w-full gradient-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square relative bg-[#e7e7e7]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain p-6"
              />
            </div>
            <div className="p-5 border-t border-line">
              <h3 className="font-semibold text-fg">{selected.title}</h3>
              <p className="text-fg-muted text-sm mt-1">{selected.description}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-surface/80 hover:bg-surface-overlay text-fg-muted hover:text-fg rounded-full w-11 h-11 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <Icon name="close" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
