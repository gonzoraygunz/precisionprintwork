type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  /** Heading level — use "h1" for page titles. */
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
};

/** Eyebrow → title → optional lead. Replaces the hand-typed eyebrow pattern. */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <Heading
        className={
          Heading === "h1"
            ? "text-4xl font-bold leading-tight tracking-tight text-fg"
            : "text-3xl font-bold leading-tight text-fg"
        }
      >
        {title}
      </Heading>
      {lead && (
        <p className={`mt-4 text-fg-muted max-w-xl ${centered ? "mx-auto" : ""}`}>{lead}</p>
      )}
    </div>
  );
}
