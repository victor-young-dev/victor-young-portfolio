import { cn } from "@/lib/utils";

/** Cover art for a work item with no screenshot yet — a letterform, not a fabricated photo. */
export function InitialTile({ title, className }: { title: string; className?: string }) {
  const letter = title.trim().charAt(0).toUpperCase();
  return (
    <div
      className={cn(
        "initial-tile group relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-bg-subtle to-bg-elevated",
        className,
      )}
      aria-hidden
    >
      <div className="initial-tile-grid absolute inset-0 opacity-45" />
      <div className="absolute -right-1/4 -top-1/4 size-3/4 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="relative flex flex-col items-center gap-2">
        <span className="font-display text-7xl leading-none text-fg/70 sm:text-8xl">{letter}</span>
        <span className="border-border rounded-full border px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-subtle uppercase">
          Preview visual
        </span>
      </div>
    </div>
  );
}
