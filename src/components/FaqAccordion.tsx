"use client";

import { useId, useState } from "react";
import Icon from "@/components/Icon";

const faqs = [
  {
    q: "Do I need a CAD file?",
    a: "No. A clear description, a photo of a broken part, or a rough sketch is enough to start. I'll model it.",
  },
  {
    q: "What if the part doesn't fit?",
    a: "Reach out. If the print matches the spec you gave me, we'll work together on a revision. If I made an error, the reprint is on me.",
  },
  {
    q: "Can you do multiple quantities?",
    a: "Yes. Per-unit cost drops with quantity. Note how many you need in the quote form.",
  },
  {
    q: "How long does it take?",
    a: "Quotes within 1–2 days. Prints within 3–5 business days of payment for standard parts. Timeline is confirmed in the quote.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={f.q}
            className={`rounded-xl border transition-colors ${
              open ? "border-cyan-700/70 bg-slate-800" : "border-slate-700/80 bg-slate-800/50 hover:border-slate-600"
            }`}
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-white">{f.q}</span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ring-1 transition-all duration-300 ${
                  open ? "rotate-45 bg-cyan-500/15 ring-cyan-400/40 text-cyan-300" : "ring-slate-600 text-slate-400"
                }`}
              >
                <Icon name="plus" className="w-4 h-4" />
              </span>
            </button>
            {/* grid-rows trick animates to the content's real height, so long answers never clip */}
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
