import { cn } from "@/lib/utils";

/** Cover art for a work item with no screenshot yet — a letterform, not a fabricated photo. */
export function InitialTile({ title, className }: { title: string; className?: string }) {
  const letter = title.trim().charAt(0).toUpperCase();
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-bg-subtle to-bg-elevated",
        className,
      )}
      aria-hidden
    >
      <span className="font-display text-6xl text-subtle">{letter}</span>
    </div>
  );
}
