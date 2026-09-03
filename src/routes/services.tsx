import { Link, createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/services")({ component: ServicesPage });

function ServicesPage() {
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">Services</p>
            <h1 className="font-display max-w-3xl text-5xl tracking-tight sm:text-7xl">
              Ways I can help.
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed">
              Some projects are handled directly. Others are delivered with trusted collaborators
              from my network — whichever gets the work done properly.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
                  <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{s.title}</h2>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{s.copy}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
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
                  Have a project in mind?
                </h2>
                <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">
                  Tell me what you're building and where it's stuck — I'll tell you honestly if I'm
                  the right fit.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link to="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </main>
    </PageShell>
  );
}
