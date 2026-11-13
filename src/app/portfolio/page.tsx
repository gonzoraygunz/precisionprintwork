import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import { btnPrimary } from "@/lib/styles";

const projects = [
  {
    src: "/portfolio/tray-green.png",
    alt: "Perforated storage tray — green PLA",
    title: "Custom 510 Cartridge Tray",
    description: "Custom grid tray printed in green PLA. Available in any color.",
  },
  {
    src: "/portfolio/tray-black.png",
    alt: "Perforated storage tray — black PETG",
    title: "Custom 510 Cartridge Tray",
    description: "Same design in black PETG for a more industrial look.",
  },
  {
    src: "/portfolio/tray-white.png",
    alt: "Perforated storage tray — white PLA",
    title: "Custom 510 Cartridge Tray",
    description: "White PLA version — clean finish for lab or workshop use.",
  },
  {
    src: "/portfolio/pipe-clamps.png",
    alt: "Machine vision alignment LED holder",
    title: "Machine Vision LED Holder",
    description: "Functional mounting brackets designed to fit a specific pipe diameter.",
  },
];

export default function Portfolio() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <FadeIn>
          <SectionHeader
            as="h1"
            eyebrow="Past Work"
            title="Portfolio"
            lead="A sample of completed projects. Each one started as a problem — this is what came out the other end."
            className="mb-16"
          />
        </FadeIn>

        <PortfolioGrid projects={projects} />

        <FadeIn>
          <div className="gradient-border rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-fg mb-2">Have a similar project in mind?</h2>
            <p className="text-fg-muted mb-6 text-sm">
              Every item here started with a request. Submit yours and get a free quote.
            </p>
            <Link href="/order" className={btnPrimary}>
              Start a Request
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
