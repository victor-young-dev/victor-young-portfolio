import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/rayzorverse")({ component: RayzorVersePage });

function RayzorVersePage() {
  const { ventures: VENTURES, ecosystem: ECOSYSTEM, collaborations: COLLABORATIONS } = useSiteContent();
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">
              RayzorVerse · 2026
            </p>
            <h1 className="font-display max-w-3xl text-5xl tracking-tight sm:text-7xl">
              A venture ecosystem, not a single bet.
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed">
              RayzorVerse is the home I built for software products, creative services, writing, and
              business systems. It placed 1st at the South-East regional first stage of the 2026
              National Enterprise Challenge.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-10 overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)]">
              <img src="/work/rayzorverse.jpg" alt="" className="aspect-[21/9] w-full object-cover" />
            </div>
          </Reveal>

          <div className="mt-16 flex flex-col gap-6">
            {VENTURES.map((v, i) => (
              <Reveal key={v.slug} delay={i * 0.06}>
                <article className="grid overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] md:grid-cols-2">
                  <div className="aspect-video overflow-hidden md:aspect-auto md:min-h-80">
                    <img src={v.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">
                      {v.year} · {v.role}
                    </p>
                    <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">{v.title}</h2>
                    <p className="text-muted mt-4 text-sm leading-relaxed sm:text-base">{v.copy}</p>
                    {v.href ? (
                      <a
                        href={v.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium hover:text-accent"
                      >
                        Visit site
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display mt-28 text-3xl tracking-tight sm:text-4xl">
              One ecosystem. Many ways to build.
            </h2>
            <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed">
              Under RayzorVerse, different divisions focus on different problems — from software
              products to writing and brand. The goal isn’t to build everything at once; it’s a
              connected ecosystem where ideas can be developed, tested, launched, and grown.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10 rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-10">
              <p className="font-display text-2xl tracking-tight sm:text-3xl">{ECOSYSTEM.root}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {ECOSYSTEM.branches.map((b) => (
                  <div key={b.title} className="border-l-2 border-border pl-4">
                    <p className="font-medium">{b.title}</p>
                    <p className="text-subtle mt-1 text-xs tracking-wide uppercase">{b.note}</p>
                    {b.children.length ? (
                      <ul className="text-muted mt-3 space-y-1.5 text-sm">
                        {b.children.map((c) => (
                          <li key={c} className="border-l border-border pl-3">
                            {c}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display mt-28 text-3xl tracking-tight sm:text-4xl">
              Built with people, not just code.
            </h2>
            <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed">
              Some of the most valuable things I’ve worked on weren’t entirely mine. I’ve
              contributed development and design to projects led by other people — clearly credited
              as theirs.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {COLLABORATIONS.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <div className="rounded-xl bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
                  <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">{c.role}</p>
                  <h3 className="font-display mt-2 text-2xl tracking-tight">{c.title}</h3>
                  <p className="text-muted mt-3 text-sm leading-relaxed">{c.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
