import { Link, createFileRoute } from "@tanstack/react-router";
import { WORK } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/work/")({ component: WorkPage });

function WorkPage() {
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">Work</p>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Selected products.</h1>
            <p className="text-muted mt-5 max-w-xl text-base leading-relaxed">
              Software currently in motion inside Rayzor Labs.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-5">
            {WORK.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <Link
                  to="/work/$slug"
                  params={{ slug: item.slug }}
                  className="group grid overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)] md:grid-cols-2"
                >
                  <div className="aspect-video overflow-hidden md:aspect-auto md:min-h-72">
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                    <div>
                      <p className="text-subtle mb-3 font-mono text-2xs tracking-[0.16em] uppercase">
                        {String(i + 1).padStart(2, "0")} / {item.arm} · {item.status}
                      </p>
                      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{item.title}</h2>
                      <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">{item.summary}</p>
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
        </div>
      </main>
    </PageShell>
  );
}
