import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import type { WorkItem } from "@/lib/site-content";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { InitialTile } from "@/components/site/initial-tile";

export const Route = createFileRoute("/work/")({ component: WorkPage });

/** A "2023 – 2025" / "2025 – Present" / "2026" label -> the years it spans. */
function yearRange(year: string): { start: number; end: number } {
  const nums = [...year.matchAll(/\d{4}/g)].map((m) => Number(m[0]));
  const start = nums[0] ?? 0;
  const isOngoing = /present/i.test(year);
  const end = isOngoing ? new Date().getFullYear() : (nums[nums.length - 1] ?? start);
  return { start, end };
}

function byRecency(a: WorkItem, b: WorkItem): number {
  return yearRange(b.year).end - yearRange(a.year).end;
}

function matchesQuery(item: WorkItem, q: string): boolean {
  if (!q) return true;
  const haystack = `${item.title} ${item.summary} ${item.arm} ${item.tags.join(" ")}`.toLowerCase();
  return haystack.includes(q);
}

/** Work that started this year or last stays "current"; older starts move to a quieter tier below. */
const RECENT_SINCE = new Date().getFullYear() - 1;

function WorkPage() {
  const { work: WORK, clientWork: CLIENT_WORK, services: SERVICES } = useSiteContent();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const sortedWork = useMemo(
    () => [...WORK].sort(byRecency).filter((item) => matchesQuery(item, q)),
    [WORK, q],
  );
  const sortedClientWork = useMemo(() => [...CLIENT_WORK].sort(byRecency), [CLIENT_WORK]);
  const recentClientWork = sortedClientWork.filter(
    (item) => yearRange(item.year).start >= RECENT_SINCE && matchesQuery(item, q),
  );
  const earlierClientWork = sortedClientWork.filter(
    (item) => yearRange(item.year).start < RECENT_SINCE && matchesQuery(item, q),
  );
  const noResults =
    q.length > 0 && sortedWork.length === 0 && recentClientWork.length === 0 && earlierClientWork.length === 0;

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">Work</p>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Selected work.</h1>
            <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed text-justify [hyphens:auto]">
              What I've built and delivered — some of it solo, some of it with Team RayzorVerse, the
              collaborators I bring in when a brief needs more hands than mine.
            </p>
            <label className="relative mt-8 block max-w-sm">
              <Search className="text-subtle pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search work by name, tag, or discipline"
                className="h-11 w-full rounded-full border-0 bg-bg-elevated pr-4 pl-11 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-subtle hover:text-fg absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </label>
          </Reveal>

          {noResults ? (
            <Reveal delay={0.1}>
              <p className="text-muted mt-16 text-sm">
                Nothing matches “{query}” — try a name, a tag like “Product”, or a discipline like “Brand”.
              </p>
            </Reveal>
          ) : null}

          {sortedWork.length > 0 ? (
            <Reveal delay={0.06}>
              <h2 className="font-display mt-20 text-3xl tracking-tight sm:text-4xl">Rayzor Labs — software</h2>
              <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                Products designed, prototyped, and shipped from inside the ecosystem.
              </p>
            </Reveal>
          ) : null}
          <div className="mt-8 flex flex-col gap-5">
            {sortedWork.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <Link
                  to="/work/$slug"
                  params={{ slug: item.slug }}
                  className="group grid overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)] md:grid-cols-2"
                >
                  <div className="aspect-video overflow-hidden md:aspect-auto md:min-h-72">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <InitialTile title={item.title} className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                    <div>
                      <p className="text-subtle mb-3 font-mono text-2xs tracking-[0.16em] uppercase">
                        {String(i + 1).padStart(2, "0")} / {item.arm} · {item.status}
                      </p>
                      <h3 className="font-display text-3xl tracking-tight sm:text-4xl">{item.title}</h3>
                      <p className="text-muted mt-3 text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">{item.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {recentClientWork.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">Brand & client work</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  BrandiLux's own showcase, and the businesses I've delivered creative and digital work
                  for — directly or through Team RayzorVerse.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {recentClientWork.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05}>
                    <ClientWorkCard item={item} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          {earlierClientWork.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-20 text-2xl tracking-tight sm:text-3xl">Earlier work</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  Where things started — before more current tools and a few more years of practice.
                  Kept here for the record, not the current bar.
                </p>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {earlierClientWork.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05}>
                    <ClientWorkCard item={item} muted />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">How I can help</h2>
            <p className="text-muted mt-3 max-w-2xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
              I deliver individually for focused work. For bigger, more complex briefs, I gather Team
              RayzorVerse — trusted specialists — around it.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <div className="h-full rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
                  <h3 className="text-sm font-medium">{s.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{s.copy}</p>
                  <ul className="text-subtle mt-3 space-y-1.5 text-sm">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-20 flex flex-col items-start gap-6 rounded-2xl bg-bg-elevated p-8 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                  Have something more complex?
                </h2>
                <p className="text-muted mt-2 max-w-md text-sm leading-relaxed text-justify [hyphens:auto]">
                  Team RayzorVerse can take on bigger builds than one person should carry alone.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link to="/contact">
                  Start a conversation
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </main>
    </PageShell>
  );
}

function ClientWorkCard({ item, muted = false }: { item: WorkItem; muted?: boolean }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: item.slug }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow,opacity] duration-200 hover:shadow-[var(--shadow-border-hover)] ${muted ? "opacity-75 hover:opacity-100" : ""}`}
    >
      <div className="aspect-video overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <InitialTile title={item.title} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-subtle mb-2 font-mono text-2xs tracking-[0.16em] uppercase">
          {item.arm} · {item.status}
        </p>
        <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
        <p className="text-muted mt-2 text-sm leading-relaxed text-justify [hyphens:auto]">{item.summary}</p>
      </div>
    </Link>
  );
}
