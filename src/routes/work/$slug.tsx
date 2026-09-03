import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { WORK } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const item = WORK.find((w) => w.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  component: WorkDetail,
});

function WorkDetail() {
  const item = Route.useLoaderData();
  const index = WORK.findIndex((w) => w.slug === item.slug);
  const prev = index > 0 ? WORK[index - 1] : null;
  const next = index >= 0 && index < WORK.length - 1 ? WORK[index + 1] : null;

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
              <img src={item.image} alt="" className="aspect-video w-full object-cover" />
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
