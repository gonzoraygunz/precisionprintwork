"use client";

import { useState } from "react";

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

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="border border-slate-700 rounded-xl overflow-hidden gradient-border">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-700/30 transition-colors"
          >
            <span className="font-semibold text-white pr-4">{f.q}</span>
            <span
              className="text-cyan-400 text-xl font-light shrink-0 transition-transform duration-300"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          {/* Slide open via max-height transition */}
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: openIndex === i ? "8rem" : "0" }}
          >
            <p className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
