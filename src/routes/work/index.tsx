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

/**
 * Client engagements pinned to the earlier tier whatever year they carry. MTX
 * and Favour Link are still live, so the date heuristic alone would keep them
 * up top — but they belong with the run of client work from late 2023 through
 * early 2026, not with the current showcase.
 */
const EARLIER_SLUGS = new Set(["mtx-resources", "favour-link", "gbch", "dlovesoulclinic"]);

function isEarlier(item: WorkItem): boolean {
  return EARLIER_SLUGS.has(item.slug) || yearRange(item.year).start < RECENT_SINCE;
}

/** A shelf entry with no case study behind it yet — cover art plus a caption. */
type ShelfItem = { id: string; title: string; note: string; image: string };

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

/**
 * The Figma and graphic-design shelves are placeholders. Covers are free
 * Unsplash stock standing in for the real artwork, and each caption describes a
 * kind of piece rather than a specific one — swap both for the gallery exports
 * when they land.
 */
const FIGMA_PROJECTS: ShelfItem[] = [
  {
    id: "figma-product-ui",
    title: "Product UI Kits",
    note: "Component libraries and design systems built to hand off to code without a redraw.",
    image: unsplash("photo-1611224923853-80b023f02d71"),
  },
  {
    id: "figma-mobile-flows",
    title: "Mobile App Flows",
    note: "End-to-end screen flows and clickable prototypes for commerce and utility apps.",
    image: unsplash("photo-1626785774573-4b799315345d"),
  },
  {
    id: "figma-wireframes",
    title: "Wireframes & Prototypes",
    note: "Low-fidelity structure used to settle the shape of a product before anyone builds it.",
    image: unsplash("photo-1561070791-2526d30994b5"),
  },
  {
    id: "figma-web-layouts",
    title: "Web Layouts",
    note: "Responsive marketing and dashboard layouts designed screen-first, not scaled down.",
    image: unsplash("photo-1618004912476-29818d81ae2e"),
  },
];

const GRAPHIC_DESIGN_WORKS: ShelfItem[] = [
  {
    id: "gd-brand-identity",
    title: "Brand Identity",
    note: "Logos, marks, and the rules that keep them behaving the same everywhere.",
    image: unsplash("photo-1611532736597-de2d4265fba3"),
  },
  {
    id: "gd-posters",
    title: "Posters & Flyers",
    note: "Print and social flyers for launches, events, and seasonal campaigns.",
    image: unsplash("photo-1609921212029-bb5a28e60960"),
  },
  {
    id: "gd-social",
    title: "Social Media Graphics",
    note: "Feed and story sets built to hold one look across a whole campaign.",
    image: unsplash("photo-1558655146-9f40138edfeb"),
  },
  {
    id: "gd-typography",
    title: "Typography & Lettering",
    note: "Type-led pieces where the words carry the whole composition.",
    image: unsplash("photo-1541462608143-67571c6738dd"),
  },
  {
    id: "gd-catalogues",
    title: "Product Catalogues",
    note: "Catalogue and price-list visuals laid out to read on WhatsApp and in print.",
    image: unsplash("photo-1572044162444-ad60f128bdea"),
  },
  {
    id: "gd-mockups",
    title: "Mockups & Presentation",
    note: "Brand work staged on real surfaces so a client can see it in place.",
    image: unsplash("photo-1613909207039-6b173b755cc1"),
  },
];

function shelfMatches(item: ShelfItem, q: string): boolean {
  if (!q) return true;
  return `${item.title} ${item.note}`.toLowerCase().includes(q);
}

/** Filter chips sitting beside the search field, above everything else. */
const FILTERS = ["All", "Software", "Client Work", "Figma", "Graphic Design"] as const;
type Filter = (typeof FILTERS)[number];

function WorkPage() {
  const { work: WORK, clientWork: CLIENT_WORK, services: SERVICES } = useSiteContent();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const q = query.trim().toLowerCase();

  const sortedWork = useMemo(
    () => [...WORK].sort(byRecency).filter((item) => matchesQuery(item, q)),
    [WORK, q],
  );
  const sortedClientWork = useMemo(() => [...CLIENT_WORK].sort(byRecency), [CLIENT_WORK]);
  const recentClientWork = sortedClientWork.filter(
    (item) => !isEarlier(item) && matchesQuery(item, q),
  );
  const earlierClientWork = sortedClientWork.filter(
    (item) => isEarlier(item) && matchesQuery(item, q),
  );

  // A chip narrows the page to one shelf; the search box narrows within it.
  const shows = (f: Filter) => filter === "All" || filter === f;
  const softwareItems = shows("Software") ? sortedWork : [];
  const recentItems = shows("Client Work") ? recentClientWork : [];
  const earlierItems = shows("Client Work") ? earlierClientWork : [];
  const figmaItems = shows("Figma") ? FIGMA_PROJECTS.filter((i) => shelfMatches(i, q)) : [];
  const graphicItems = shows("Graphic Design")
    ? GRAPHIC_DESIGN_WORKS.filter((i) => shelfMatches(i, q))
    : [];

  const noResults =
    q.length > 0 &&
    softwareItems.length === 0 &&
    recentItems.length === 0 &&
    earlierItems.length === 0 &&
    figmaItems.length === 0 &&
    graphicItems.length === 0;

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            {/* Search and filters come first, straight under the nav, so the page
                can be narrowed before any scrolling happens. */}
            <div className="mb-14 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-sm">
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
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={`rounded-full px-3.5 py-1.5 text-xs whitespace-nowrap transition-colors ${
                      filter === f
                        ? "bg-fg text-bg"
                        : "text-muted hover:text-fg border border-border"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">Work</p>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Work In Full</h1>
            <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed text-justify [hyphens:auto]">
              What I've built and delivered — some of it solo, some of it with Team RayzorVerse, the
              collaborators I bring in when a brief needs more hands than mine.
            </p>
          </Reveal>

          {noResults ? (
            <Reveal delay={0.1}>
              <p className="text-muted mt-16 text-sm">
                Nothing matches “{query}” — try a name, a tag like “Product”, or a discipline like “Brand”.
              </p>
            </Reveal>
          ) : null}

          {softwareItems.length > 0 ? (
            <Reveal delay={0.06}>
              <h2 className="font-display mt-20 text-3xl tracking-tight sm:text-4xl">Rayzor Labs — Software</h2>
              <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                Products designed, prototyped, and shipped from inside the ecosystem.
              </p>
            </Reveal>
          ) : null}
          <div className="mt-8 flex flex-col gap-5">
            {softwareItems.map((item, i) => (
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

          {recentItems.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">Brand & Client Work</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  BrandiLux's own showcase, and the businesses I've delivered creative and digital work
                  for — directly or through Team RayzorVerse.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {recentItems.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05}>
                    <ClientWorkCard item={item} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          {figmaItems.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">Figma Projects</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  Interface work done in Figma — systems, flows, and prototypes, built to be handed
                  over rather than admired.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {figmaItems.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.05}>
                    <ShelfCard item={item} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          {graphicItems.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">Graphic Design Works</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  Identity, print, and social pieces — the design work that runs alongside the
                  products and the client engagements.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {graphicItems.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.05}>
                    <ShelfCard item={item} />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          {earlierItems.length > 0 ? (
            <>
              <Reveal>
                <h2 className="font-display mt-24 text-2xl tracking-tight sm:text-3xl">Earlier Work</h2>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">
                  Late 2023 through early 2026 — the client engagements and volunteer work the
                  practice was built on. Kept here for the record, not as the current bar.
                </p>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {earlierItems.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.05}>
                    <ClientWorkCard item={item} muted />
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">How I Can Help</h2>
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
                  Have Something More Complex?
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
        {/* Tracking is tighter here than elsewhere so the longest pairing —
            "IT / Digital & Creative · Client work" — still sets on one line. */}
        <p className="text-subtle mb-2 overflow-hidden font-mono text-2xs tracking-[0.08em] text-ellipsis whitespace-nowrap uppercase">
          {item.arm} · {item.status}
        </p>
        <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
        <p className="text-muted mt-2 text-sm leading-relaxed text-justify [hyphens:auto]">{item.summary}</p>
      </div>
    </Link>
  );
}

/** Placeholder shelf card — cover art and a caption, with no detail page behind it yet. */
function ShelfCard({ item }: { item: ShelfItem }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)]">
      <div className="aspect-video overflow-hidden">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-subtle mb-2 font-mono text-2xs tracking-[0.08em] whitespace-nowrap uppercase">
          Placeholder cover
        </p>
        <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
        <p className="text-muted mt-2 text-sm leading-relaxed">{item.note}</p>
      </div>
    </div>
  );
}
