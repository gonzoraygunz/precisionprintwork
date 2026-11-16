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
  {
    src: "/portfolio/packout-bracket.png",
    alt: "Red wall bracket that locks into a Milwaukee Packout rail",
    title: "Milwaukee Packout Bracket",
    description: "Mounting bracket that clips into the Packout system.",
    tag: "Functional part",
  },
  {
    src: "/portfolio/vape-case-flat.png",
    alt: "Yellow slip-on vape case with a hand graphic cut out of the face",
    title: "Fogger Vape Case",
    description: "Slim slip-on sleeve with a cut-out graphic.",
    tag: "Sleeve · Cut-out graphic",
  },
  {
    src: "/portfolio/vape-case-lattice.png",
    alt: "Yellow open-lattice vape case with organic cut-outs",
    title: "Fogger Vape Case",
    description: "Open, organic lattice shell that shows off the device.",
    tag: "Shell · Open lattice",
  },
  {
    src: "/portfolio/mini-tote.png",
    alt: "Miniature tote with black body and yellow diamond-pattern lid",
    title: "Mini Tote",
    description: "Scaled-down tough tote with a snap-on lid.",
    tag: "Two-color · Desk storage",
  },
  {
    src: "/portfolio/corn-assembled.png",
    alt: "Toy ear of corn sitting in its green husk",
    title: "Magnetic Slice-the-Fruit Corn",
    description: "Montessori play food — assembled.",
    tag: "Toy · Assembled",
  },
  {
    src: "/portfolio/corn-sliced.png",
    alt: "Toy ear of corn separated into three magnetic slices beside its husk",
    title: "Magnetic Slice-the-Fruit Corn",
    description: "Montessori play food — sliced into magnetic pieces.",
    tag: "Toy · Sliced",
  },
  {
    src: "/portfolio/hoodie-bobbles.png",
    alt: "Pair of red and white Poké Ball-style hoodie drawstring ends",
    title: "Hoodie String Bobbles",
    description: "Poké Ball-style drawstring ends for a hoodie.",
    tag: "Multi-color · Pair",
  },
  {
    src: "/portfolio/dnd-terrain.png",
    alt: "Basalt-column D&D terrain tile with glowing lava cracks in a spiral",
    title: "D&D Basalt Terrain",
    description: "Hex-column tabletop terrain with lava detail.",
    tag: "Terrain · Tabletop",
  },
  {
    src: "/portfolio/mini-bard.png",
    alt: "Elf bard miniature playing a bass guitar with one boot up on a stone balustrade",
    title: "Original Character Minis",
    description: "Elf bard rocking a bass guitar, foot up on a balustrade.",
    tag: "Bard · Elf rocker",
  },
  {
    src: "/portfolio/mini-alldrinn.png",
    alt: "Adventurer miniature with a long rifle over the shoulder on a base engraved ALLDRINN",
    title: "Original Character Minis",
    description: "Rifle-carrying adventurer with his name engraved on the base.",
    tag: "Alldrinn · Named base",
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
  {
    id: "packout-bracket",
    category: "Functional",
    title: "Milwaukee Packout Bracket",
    ask: "Mount gear to the Packout system without buying another accessory.",
    build: "A bracket with a locking foot that clips into the Packout rail.",
    spec: [
      ["Process", "FDM"],
      ["Type", "Functional part"],
      ["Fits", "Milwaukee Packout"],
    ],
    variants: [projects[4]],
  },
  {
    id: "vape-case",
    category: "Accessories",
    title: "Fogger Vape Case",
    ask: "A case that fits a Fogger vape snugly and looks like nothing off the shelf.",
    build: "Two takes on one fit: a slim sleeve with a cut-out graphic, and an open organic lattice shell.",
    spec: [
      ["Process", "FDM"],
      ["Fits", "Fogger vape"],
      ["Variants", "2 · Any color"],
    ],
    variants: [projects[5], projects[6]],
    cta: "Get a case for your device",
  },
  {
    id: "mini-tote",
    category: "Storage",
    title: "Mini Tote",
    ask: "A desk-sized version of a classic tough tote.",
    build: "Scaled-down body and diamond-pattern lid printed in two colors to match the full-size original.",
    spec: [
      ["Process", "FDM"],
      ["Colors", "2 · Black + Yellow"],
      ["Use", "Desk storage"],
    ],
    variants: [projects[7]],
  },
  {
    id: "slice-corn",
    category: "Kids & Toys",
    title: "Magnetic Slice-the-Fruit Corn",
    ask: "Montessori-style play food that kids can 'cut' and put back together.",
    build: "An ear of corn split into slices with embedded magnets, nested in a soft-shaped husk.",
    spec: [
      ["Process", "FDM"],
      ["Hardware", "Embedded magnets"],
      ["Pieces", "3 + Husk"],
    ],
    variants: [projects[8], projects[9]],
    cta: "Ask about play food sets",
  },
  {
    id: "hoodie-bobbles",
    category: "Gifts",
    title: "Hoodie String Bobbles",
    ask: "Fun drawstring ends to swap onto a hoodie.",
    build: "Poké Ball-style bobbles with a hollow stem that the drawstring threads into, printed in multiple colors.",
    spec: [
      ["Process", "FDM"],
      ["Colors", "Multi-color"],
      ["Qty", "Pair"],
    ],
    variants: [projects[10]],
  },
  {
    id: "custom-minis",
    category: "Tabletop",
    title: "Original Character Minis",
    ask: "Characters from a real campaign, as tabletop minis instead of generic stand-ins.",
    build: "Sculpted from scratch around each character: a bass-playing elf bard posed on a balustrade, and Alldrinn with his rifle and his name on the base.",
    spec: [
      ["Design", "Original sculpt"],
      ["Type", "Tabletop mini"],
      ["Characters", "2"],
    ],
    variants: [projects[12], projects[13]],
    cta: "Get your character made",
  },
  {
    id: "dnd-terrain",
    category: "Tabletop",
    title: "D&D Basalt Terrain",
    ask: "Terrain with real height variation for a volcanic encounter.",
    build: "Hex basalt columns at staggered heights around a spiral of glowing lava cracks.",
    spec: [
      ["Process", "FDM"],
      ["Type", "Tabletop terrain"],
      ["Detail", "Lava cracks"],
    ],
    variants: [projects[11]],
    cta: "Build terrain for your table",
  },
];
