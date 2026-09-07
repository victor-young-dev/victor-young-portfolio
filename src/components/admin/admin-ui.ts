/**
 * Shared visual language for /admin — the same elevated-card idiom
 * (bg-bg-elevated + shadow-[var(--shadow-border)]) the public site uses
 * everywhere, instead of the plain flat borders the admin forms had been
 * copy-pasting per page. Pure styling tokens, no behavior.
 */
export const fieldLabelClass = "text-subtle block text-2xs font-medium tracking-[0.08em] uppercase";

const fieldBase =
  "mt-1.5 w-full rounded-lg border-0 bg-bg-subtle text-sm text-fg shadow-[var(--shadow-border)] outline-none transition-shadow focus-visible:shadow-[var(--shadow-border-hover)] focus-visible:ring-2 focus-visible:ring-ring";

export const inputClass = `${fieldBase} h-10 px-3.5`;
export const selectClass = `${fieldBase} h-10 px-3.5`;
export const textareaClass = `${fieldBase} resize-none px-3.5 py-2.5`;

/** The card an inline add/edit form sits in. */
export const panelClass = "rounded-2xl bg-bg-elevated p-5 shadow-[var(--shadow-border)] sm:p-6";

/** One row in a collection list. */
export const rowClass =
  "group flex items-center justify-between gap-4 rounded-xl bg-bg-elevated px-4 py-3.5 shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]";
