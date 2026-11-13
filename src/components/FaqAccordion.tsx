"use client";

import { useState } from "react";
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

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q} className="gradient-border rounded-xl overflow-hidden">
            <h3>
              <button
                id={`faq-q-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-a-${i}`}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-overlay/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <span className="font-semibold text-fg pr-4">{f.q}</span>
                <Icon
                  name="plus"
                  size={20}
                  strokeWidth={2}
                  className={`text-accent shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            {/* Slide open via grid-rows transition — no fixed max-height to clip long answers */}
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-fg-muted text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
