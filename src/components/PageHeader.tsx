import SectionHeader from "@/components/SectionHeader";

// Top band for inner pages: the design system's SectionHeader (as the page h1)
// over the circuit grid + hero glow. CSS entrance, so it's visible before JS loads.
export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden circuit-bg border-b border-line">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-14 md:pt-20 md:pb-16">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} lead={children} className="animate-rise" />
      </div>
    </section>
  );
}
