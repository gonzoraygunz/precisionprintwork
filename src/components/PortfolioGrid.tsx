"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Project = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

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
            className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 hover:border-cyan-700 hover:glow-cyan transition-all duration-300 text-left group cursor-zoom-in"
          >
            <div className="aspect-square relative bg-slate-700">
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white text-sm">{project.title}</h3>
              <p className="text-slate-400 text-xs mt-1">{project.description}</p>
              <p className="text-cyan-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="relative max-w-xl w-full bg-slate-800 gradient-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square relative">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain p-6"
              />
            </div>
            <div className="p-5 border-t border-slate-700">
              <h3 className="font-semibold text-white">{selected.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{selected.description}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
