// Shared top band for inner pages: eyebrow, title, intro over the hero glow.
// CSS entrance (not FadeIn) so the heading is visible before JS loads.
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
    <section className="relative overflow-hidden circuit-bg border-b border-slate-800">
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-4 pt-16 pb-14 md:pt-20 md:pb-16 text-center">
        <p className="animate-rise text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">{eyebrow}</p>
        <h1
          className="animate-rise text-4xl md:text-5xl font-bold text-white tracking-tight"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {children && (
          <div
            className="animate-rise mt-5 text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
