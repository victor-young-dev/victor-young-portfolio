import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { Reveal, SplitWords } from "@/components/site/reveal";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { site: SITE, work: WORK, ventures: VENTURES } = useSiteContent();
  return (
    <PageShell scene>
      <main>
        <section className="relative flex min-h-0 items-center px-5 pt-28 pb-16 sm:min-h-svh sm:px-8 sm:pt-32 lg:pb-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="text-muted mb-5 font-mono text-2xs tracking-[0.22em] uppercase">
                {SITE.roles}
              </p>
              <SplitWords
                as="h1"
                text="Victor Young"
                className="hero-name font-display text-display tracking-tight"
              />
              <p className="hero-legal-name font-display text-muted mt-1 italic sm:mt-2">
                — {SITE.legal}
              </p>
              <div className="hero-portrait-mobile mx-auto mt-6 w-full max-w-[14rem] sm:max-w-[21rem] lg:mx-0">
                <div className="hero-image-frame overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] backdrop-blur-sm">
                  <img src="/portrait.png" alt="Victor Young" className="aspect-[5/4] w-full object-cover" />
                </div>
              </div>
              <div className="mt-8 flex max-w-xl flex-col gap-8 sm:mt-10">
                <p className="text-muted text-base leading-relaxed sm:text-lg">{SITE.tagline}</p>
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
                  <Magnetic>
                    <Button asChild size="lg" className="hero-action">
                      <Link to="/work">
                        View work
                        <ArrowDownRight />
                      </Link>
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <Button asChild size="lg" variant="outline" className="hero-action">
                      <Link to="/contact">Let’s work together</Link>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>

            <Reveal delay={0.15} className="hero-portrait-desktop mx-auto w-full max-w-[28rem] lg:mx-0">
              <div className="hero-image-frame overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] backdrop-blur-sm">
                <img
                  src="/portrait.png"
                  alt="Victor Young"
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <div className="border-y border-border py-4">
          <div className="overflow-hidden">
            <div className="marquee-track gap-10 px-6">
              {[
                "RayzorVerse",
                "Rayzor Labs",
                "Vendra",
                "Kaabo",
                "ResQNet",
                "Apex Wright",
                "BrandiLux",
                "FERB Intelligence",
                "RayzorVerse",
                "Rayzor Labs",
                "Vendra",
                "Kaabo",
                "ResQNet",
                "Apex Wright",
                "BrandiLux",
                "FERB Intelligence",
              ].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="text-subtle font-mono text-2xs tracking-[0.28em] uppercase"
                >
                  {item}
                  <span className="text-border ml-10">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-10 flex items-end justify-between gap-4">
                <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Selected work</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/work">
                    All work
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {WORK.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.06}>
                  <Link
                    to="/work/$slug"
                    params={{ slug: item.slug }}
                    className="group block overflow-hidden rounded-2xl bg-bg-elevated shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image ?? undefined}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-subtle mb-2 font-mono text-2xs tracking-[0.16em] uppercase">
                        {item.arm} / {item.year}
                      </p>
                      <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
                      <p className="text-muted mt-2 line-clamp-2 text-sm leading-relaxed">{item.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="mb-10 flex items-end justify-between">
                <h2 className="font-display text-4xl tracking-tight sm:text-5xl">RayzorVerse</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/rayzorverse">
                    The ecosystem
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {VENTURES.map((v, i) => (
                <Reveal key={v.slug} delay={i * 0.06}>
                  <Link
                    to="/rayzorverse"
                    className="block rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-border-hover)]"
                  >
                    <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">{v.role}</p>
                    <h3 className="font-display mt-3 text-2xl tracking-tight">{v.title}</h3>
                    <p className="text-muted mt-3 line-clamp-3 text-sm leading-relaxed">{v.copy}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
