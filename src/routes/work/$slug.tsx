import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ALL_WORK } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { InitialTile } from "@/components/site/initial-tile";
import { LiteYouTube } from "@/components/site/lite-youtube";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const item = ALL_WORK.find((w) => w.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  component: WorkDetail,
});

function WorkDetail() {
  const item = Route.useLoaderData();
  const index = ALL_WORK.findIndex((w) => w.slug === item.slug);
  const prev = index > 0 ? ALL_WORK[index - 1] : null;
  const next = index >= 0 && index < ALL_WORK.length - 1 ? ALL_WORK[index + 1] : null;

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8">
              <Link to="/work">
                <ArrowLeft />
                All work
              </Link>
            </Button>
            <p className="text-subtle font-mono text-2xs tracking-[0.2em] uppercase">
              {item.arm} · {item.year} · {item.status}
            </p>
            <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-7xl">{item.title}</h1>
            <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed">{item.summary}</p>
            {item.href ? (
              <Button asChild variant="outline" className="mt-6">
                <a href={item.href} target="_blank" rel="noreferrer">
                  Visit live site
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)]">
              {item.image ? (
                <img src={item.image} alt="" className="aspect-video w-full object-cover" />
              ) : (
                <InitialTile title={item.title} className="aspect-video w-full" />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
              <p className="text-muted max-w-2xl text-base leading-relaxed">{item.body}</p>
              <div>
                <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-subtle mt-16 font-mono text-2xs tracking-[0.16em] uppercase">Gallery</p>
            {item.gallery.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {item.gallery.map((g, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]"
                  >
                    {g.kind === "video" ? (
                      <LiteYouTube youtubeId={g.youtubeId} title={g.title} />
                    ) : (
                      <img src={g.src} alt="" className="aspect-video w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-border p-8 text-center">
                <p className="text-subtle text-sm">
                  Screenshots and walkthroughs for {item.title} land here soon.
                </p>
              </div>
            )}
          </Reveal>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-border pt-8">
            {prev ? (
              <Button asChild variant="outline">
                <Link to="/work/$slug" params={{ slug: prev.slug }}>
                  <ArrowLeft />
                  {prev.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button asChild variant="outline">
                <Link to="/work/$slug" params={{ slug: next.slug }}>
                  {next.title}
                  <ArrowRight />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
