"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { CaseStudy as CaseStudyData } from "@/lib/projects";
import { textLink } from "@/lib/styles";

const specLabel = "font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-accent";

/** One portfolio story: photo with variant switcher + lightbox, and the ask/build/spec copy. */
export default function CaseStudy({
  study,
  index,
  reverse = false,
}: {
  study: CaseStudyData;
  index: number;
  reverse?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = study.variants[active];
  const zoomButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!zoomed) return;
    const trigger = zoomButton.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus(); // return focus to the trigger on close
    };
  }, [zoomed]);

  return (
    <article
      id={study.id}
      aria-labelledby={`${study.id}-title`}
      className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center scroll-mt-28"
    >
      {/* Photo + variants */}
      <div className={`rounded-2xl border border-line bg-surface-raised overflow-hidden ${reverse ? "md:order-2" : ""}`}>
        <div className="relative aspect-4/3 bg-[#e7e7e7]">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-contain p-6 md:p-8"
          />
          <button
            ref={zoomButton}
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`Enlarge photo of ${current.alt}`}
            className="absolute right-3 bottom-3 w-11 h-11 rounded-full bg-surface/85 text-fg hover:text-accent flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-zoom-in"
          >
            <Icon name="plus" size={18} strokeWidth={2} />
          </button>
        </div>

        {study.variants.length > 1 && (
          <div role="radiogroup" aria-label="Variant" className="flex gap-2 sm:gap-3 p-3 border-t border-line">
            {study.variants.map((v, i) => {
              const [material, color] = v.tag.split(" · ");
              const on = i === active;
              return (
                <button
                  key={v.src}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setActive(i)}
                  className={`flex-1 min-w-0 flex items-center gap-2.5 min-h-14 p-1.5 pr-2.5 rounded-xl border bg-surface text-left text-sm text-fg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    on ? "border-brass shadow-[0_0_0_3px_rgba(251,191,36,0.12)]" : "border-line hover:border-line-control"
                  }`}
                >
                  <span className="relative w-11 h-11 shrink-0 rounded-lg bg-[#e7e7e7] overflow-hidden">
                    <Image src={v.src} alt="" fill sizes="44px" className="object-contain p-0.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.6875rem] tracking-widest text-brass">{material}</span>
                    <span className="block truncate">{color}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-5">
        <p className="font-mono text-[0.8125rem] tracking-[0.14em] uppercase text-fg-muted">
          Case {String(index).padStart(2, "0")} · {study.category}
        </p>
        <h2 id={`${study.id}-title`} className="text-3xl font-bold leading-tight text-fg">
          {study.title}
        </h2>
        <dl className="grid sm:grid-cols-2 gap-4">
          <div className="border-t border-line pt-3">
            <dt className={`${specLabel} mb-1.5`}>The ask</dt>
            <dd className="text-fg-muted leading-relaxed">{study.ask}</dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className={`${specLabel} mb-1.5`}>The build</dt>
            <dd className="text-fg-muted leading-relaxed">{study.build}</dd>
          </div>
        </dl>
        <dl className="rounded-xl border border-line bg-surface text-sm">
          {study.spec.map(([k, v], i) => (
            <div key={k} className={`flex justify-between gap-4 px-4 py-3 ${i ? "border-t border-line" : ""}`}>
              <dt className="text-fg-muted">{k}</dt>
              <dd className="font-mono uppercase text-brass text-right">{v}</dd>
            </div>
          ))}
        </dl>
        {study.cta && (
          <Link href="/order" className={`${textLink} self-start inline-flex items-center gap-1.5 font-semibold`}>
            {study.cta}
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </Link>
        )}
      </div>

      {/* Lightbox — portaled so the FadeIn wrapper's transform can't trap position:fixed */}
      {zoomed && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="relative max-w-2xl w-full gradient-border rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square relative bg-[#e7e7e7]">
              <Image src={current.src} alt={current.alt} fill sizes="672px" className="object-contain p-6" />
            </div>
            <div className="p-5 border-t border-line flex items-baseline justify-between gap-4">
              <p className="font-semibold text-fg">{study.title}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">{current.tag}</p>
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => setZoomed(false)}
              className="absolute top-3 right-3 bg-surface/80 hover:bg-surface-overlay text-fg-muted hover:text-fg rounded-full w-11 h-11 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <Icon name="close" size={18} strokeWidth={2} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}
