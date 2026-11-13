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
