import { createFileRoute } from "@tanstack/react-router";
import { LAB_EXPLORING } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/lab/")({ component: LabPage });

function LabPage() {
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">The Lab</p>
            <h1 className="font-display max-w-3xl text-5xl tracking-tight sm:text-7xl">
              Not every idea begins as a company.
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed">
              Some start as a sketch, a prototype, or a question worth exploring. This is where I
              keep the ones still in motion — before they become products, ventures, or nothing at
              all.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display mt-16 text-3xl tracking-tight sm:text-4xl">In motion</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {LAB_EXPLORING.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl bg-bg-elevated p-6 shadow-[var(--shadow-border)]">
                  <span className="text-subtle w-fit rounded-full border border-border px-3 py-1 font-mono text-2xs tracking-[0.12em] uppercase">
                    {item.status}
                  </span>
                  <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
