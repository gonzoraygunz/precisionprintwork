export type Project = {
  src: string;
  alt: string;
  title: string;
  description: string;
  /** Short spec tag shown in mono/brass, e.g. "PLA · Green". */
  tag: string;
};

export const projects: Project[] = [
  {
    src: "/portfolio/tray-green.png",
    alt: "Perforated storage tray — green PLA",
    title: "Custom 510 Cartridge Tray",
    description: "Custom grid tray printed in green PLA. Available in any color.",
    tag: "PLA · Green",
  },
  {
    src: "/portfolio/tray-black.png",
    alt: "Perforated storage tray — black PETG",
    title: "Custom 510 Cartridge Tray",
    description: "Same design in black PETG for a more industrial look.",
    tag: "PETG · Black",
  },
  {
    src: "/portfolio/tray-white.png",
    alt: "Perforated storage tray — white PLA",
    title: "Custom 510 Cartridge Tray",
    description: "White PLA version — clean finish for lab or workshop use.",
    tag: "PLA · White",
  },
  {
    src: "/portfolio/pipe-clamps.png",
    alt: "Machine vision alignment LED holder",
    title: "Machine Vision LED Holder",
    description: "Functional mounting brackets designed to fit a specific pipe diameter.",
    tag: "Functional part",
  },
];

/** A portfolio story: one design, optionally printed in several variants. */
export type CaseStudy = {
  id: string;
  category: string;
  title: string;
  ask: string;
  build: string;
  spec: [label: string, value: string][];
  /** Variants shown in the switcher; the first is selected by default. */
  variants: Project[];
  cta?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cartridge-tray",
    category: "Storage",
    title: "Custom 510 Cartridge Tray",
    ask: "A grid tray sized to hold cartridges upright and organized.",
    build: "One design, printed in three finishes for home, shop, or lab.",
    spec: [
      ["Process", "FDM"],
      ["Materials", "PLA · PETG"],
      ["Variants", "3 · Any color"],
    ],
    variants: [projects[0], projects[1], projects[2]],
    cta: "Get one in your color",
  },
  {
    id: "led-holder",
    category: "Functional",
    title: "Machine Vision LED Holder",
    ask: "Hold an alignment LED steady on a pipe of a specific diameter.",
    build: "Clamp-style brackets modeled to that diameter, printed to fit.",
    spec: [
      ["Process", "FDM"],
      ["Type", "Functional part"],
      ["Started from", "Measurements"],
    ],
    variants: [projects[3]],
  },
];
