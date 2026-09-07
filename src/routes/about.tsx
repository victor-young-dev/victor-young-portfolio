import { Link, createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const {
    site: SITE,
    story: STORY,
    capabilities: CAPABILITIES,
    experience: EXPERIENCE,
    leadership: LEADERSHIP,
    achievements: ACHIEVEMENTS,
    education: EDUCATION,
  } = useSiteContent();
  const PHILOSOPHY = SITE.philosophy;
  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)]">
                <img
                  src="/portrait.png"
                  alt="Victor Young"
                  className="aspect-portrait w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="flex flex-col justify-center">
              <Reveal>
                <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">About</p>
                <h1 className="font-display text-5xl tracking-tight sm:text-6xl">I’m Victor Young</h1>
                <p className="font-display text-muted mt-1 text-2xl italic tracking-tight sm:text-3xl">
                  {SITE.legal} when the paperwork matters.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="text-muted mt-6 space-y-4 text-base leading-relaxed text-justify [hyphens:auto]">
                  <p>
                    I’m a Computer Science graduate, product designer, software developer, and
                    venture builder. My work sits at the intersection of technology, design,
                    business, and problem-solving.
                  </p>
                  <p>
                    I like building things, but I’m equally interested in understanding why they
                    should exist, who they’re for, and what needs to happen around them for them to
                    actually work.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/contact">Work with me</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/work">View my work</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <p className="font-display border-accent mt-24 border-l-2 pl-6 text-2xl leading-snug tracking-tight italic sm:text-3xl">
              “{PHILOSOPHY}”
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">The story</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {STORY.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <div className="border-border h-full border-t-2 pt-4">
                  <p className="text-subtle font-mono text-2xs tracking-[0.14em] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-base font-medium">{s.step}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">Capabilities</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
                  <h3 className="text-sm font-medium">{c.title}</h3>
                  <ul className="text-muted mt-3 space-y-1.5 text-sm">
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-24 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Experience</h2>
              <Button asChild variant="ghost" size="sm">
                <a href={SITE.cv} target="_blank" rel="noreferrer">
                  Download CV
                </a>
              </Button>
            </div>
          </Reveal>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {EXPERIENCE.map((job) => (
              <li key={`${job.org}-${job.title}`} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] sm:gap-8">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-muted mt-1 text-sm">{job.org}</p>
                  <p className="text-subtle mt-1 font-mono text-2xs tracking-[0.12em] uppercase">
                    {job.dates}
                  </p>
                </div>
                <p className="text-muted text-sm leading-relaxed text-justify [hyphens:auto]">{job.copy}</p>
              </li>
            ))}
          </ol>

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">
              Leadership, outside RayzorVerse
            </h2>
            <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed text-justify [hyphens:auto]">
              Not everything I do sits inside the ecosystem. Some of it is a leadership role held
              elsewhere — kept distinct here, on purpose.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.06}>
                <article className="grid overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] md:grid-cols-2">
                  <div className="aspect-video overflow-hidden md:aspect-auto md:min-h-64">
                    <img src={l.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">
                      {l.year} · {l.role}
                    </p>
                    <h3 className="font-display mt-3 text-3xl tracking-tight">{l.title}</h3>
                    <p className="text-muted mt-4 text-sm leading-relaxed text-justify sm:text-base [hyphens:auto]">{l.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight sm:text-4xl">
              Certifications & awards
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.05}>
                <div className="h-full overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-bg-subtle to-bg-elevated">
                    {a.image ? (
                      <img src={a.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Award className="text-subtle size-10" strokeWidth={1.25} />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-subtle font-mono text-2xs tracking-[0.14em] uppercase">{a.date}</p>
                    <h3 className="mt-2 text-base font-medium">{a.title}</h3>
                    <p className="text-muted mt-1 text-sm leading-relaxed">{a.issuer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="font-display mt-24 text-3xl tracking-tight">Education</h2>
            <p className="mt-4 font-medium">{EDUCATION.degree}</p>
            <p className="text-muted mt-1 text-sm">{EDUCATION.school}</p>
            <p className="text-subtle mt-1 font-mono text-2xs tracking-[0.12em] uppercase">
              {EDUCATION.dates}
            </p>
            <p className="text-muted mt-3 text-sm">{EDUCATION.note}</p>
            <p className="text-subtle mt-2 text-sm">{EDUCATION.secondary}</p>
          </Reveal>
        </div>
      </main>
    </PageShell>
  );
}
