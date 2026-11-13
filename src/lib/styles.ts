// Shared class strings for the design system's buttons and form controls.

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:opacity-60 disabled:pointer-events-none ${focusRing}`;

const primarySkin = "bg-action text-white hover:bg-action-hover hover:glow-action";

/** Primary CTA — one per view. Blue, glows on hover. */
export const btnPrimary = `${buttonBase} h-12 px-8 ${primarySkin}`;

/** Compact primary for the nav bar. */
export const btnPrimarySm = `${buttonBase} h-11 px-4 text-sm ${primarySkin}`;

/** Secondary — outlined, turns accent on hover. */
export const btnSecondary = `${buttonBase} h-12 px-8 border border-line-control text-fg hover:border-accent hover:text-accent`;

/** Inline text link with accent color. */
export const textLink = `text-accent hover:text-accent-hover transition-colors rounded-sm ${focusRing}`;

/** Text input / select / textarea. */
export const inputClass =
  "w-full min-h-11 border border-line-control bg-surface text-fg placeholder:text-fg-muted rounded-lg px-4 py-2.5 text-sm transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent aria-[invalid=true]:border-danger";

/** Standard card. Add `hover:border-accent-line hover:glow-accent` for interactive cards. */
export const card = "rounded-2xl bg-surface-raised border border-line";
