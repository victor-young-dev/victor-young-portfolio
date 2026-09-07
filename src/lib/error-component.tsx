import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Compass, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="text-muted max-w-md text-sm break-words">
        {error.message || "An unexpected error occurred. Try reloading the page."}
      </p>
    </main>
  );
}

/**
 * Shown for any route that doesn't match, including a /work/<slug> that has
 * been renamed or removed. Without it the router falls back to its own bare
 * default, which renders as an empty page in a production build — no message,
 * no nav, and no way back to the site.
 */
export function AppNotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <span className="text-subtle" aria-hidden="true">
        <Compass className="size-10" strokeWidth={1.5} />
      </span>
      <p className="text-subtle font-mono text-2xs tracking-[0.2em] uppercase">404</p>
      <h1 className="font-display text-3xl tracking-tight sm:text-4xl">This Page Doesn’t Exist</h1>
      <p className="text-muted max-w-md text-sm leading-relaxed">
        The link may be out of date, or the page may have moved. The work is all still here.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/">Back Home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/work">Browse The Work</Link>
        </Button>
      </div>
    </main>
  );
}
