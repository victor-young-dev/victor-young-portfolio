import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import type { WrittenWork } from "@/lib/site-content";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/library")({ component: LibraryPage });

function LibraryPage() {
  const { writtenWorks: WORKS } = useSiteContent();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = WORKS.find((w) => w.slug === openSlug) ?? null;

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">Apex Wright Lab</p>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">The library</h1>
            <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed text-justify [hyphens:auto]">
              Guides, summary books, and written works from Apex Wright Lab's own catalogue — some
              self-published, some built directly from client work. Pick a title to open it.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8"
            >
              {WORKS.map((work, i) => (
                <BookCover key={work.slug} work={work} index={i} onOpen={() => setOpenSlug(work.slug)} />
              ))}
            </div>
            <div
              className="mt-2 h-3 rounded-b-md rounded-t-sm shadow-[0_14px_24px_-10px_rgba(0,0,0,0.55)]"
              style={{ background: "linear-gradient(180deg, #4a2e18, #1c1209)" }}
              aria-hidden
            />
          </Reveal>
        </div>
      </main>
      <BookSheet work={open} onClose={() => setOpenSlug(null)} />
    </PageShell>
  );
}

function BookCover({ work, index, onOpen }: { work: WrittenWork; index: number; onOpen: () => void }) {
  return (
    <Reveal delay={index * 0.06}>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left"
        aria-label={`Open ${work.title}`}
        style={{ perspective: "600px" }}
      >
        <div
          className="relative aspect-[3/4] w-full origin-bottom rounded-r-md rounded-l-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateY(-32deg)] group-hover:-translate-y-1.5 group-hover:[transform:rotateY(0deg)]"
          style={{
            background: `linear-gradient(160deg, rgba(255,255,255,0.1), rgba(0,0,0,0.4)), ${work.coverColor}`,
            boxShadow: "0 20px 32px -14px rgba(0,0,0,0.55)",
          }}
        >
          <div className="absolute inset-y-0 left-0 w-2 bg-black/35" aria-hidden />
          <div
            className="absolute inset-3 rounded-sm border sm:inset-4"
            style={{ borderColor: `${work.coverAccent}99` }}
            aria-hidden
          />
          <div className="relative flex h-full flex-col items-center justify-between p-4 text-center sm:p-6">
            <span
              className="font-mono text-[0.6rem] tracking-[0.18em] uppercase"
              style={{ color: work.coverAccent }}
            >
              {work.category}
            </span>
            <h3 className="font-display text-lg leading-tight text-white sm:text-xl">{work.title}</h3>
            <span className="text-[0.65rem] tracking-[0.2em] text-white/55">{work.year}</span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

function BookSheet({ work, onClose }: { work: WrittenWork | null; onClose: () => void }) {
  return (
    <Dialog.Root open={work !== null} onOpenChange={(next) => !next && onClose()}>
      <AnimatePresence>
        {work ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <div className="fixed inset-x-0 bottom-0 z-[101] flex justify-center sm:inset-0 sm:items-center sm:p-6">
              <Dialog.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-lg overflow-hidden rounded-t-3xl border sm:rounded-3xl"
                  style={{
                    background: `linear-gradient(165deg, ${work.coverColor}, #0c0f1a)`,
                    borderColor: `${work.coverAccent}55`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-2 rounded-t-[1.3rem] border sm:rounded-[1.3rem]"
                    style={{ borderColor: `${work.coverAccent}40` }}
                    aria-hidden
                  />
                  <div className="relative max-h-[85vh] overflow-y-auto p-7 sm:p-9">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="absolute top-6 right-6 grid size-8 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <X className="size-4" />
                      </button>
                    </Dialog.Close>

                    <span
                      className="font-mono text-2xs tracking-[0.2em] uppercase"
                      style={{ color: work.coverAccent }}
                    >
                      {work.category} · {work.year}
                    </span>
                    <Dialog.Title className="font-display mt-3 text-3xl tracking-tight text-white sm:text-4xl">
                      {work.title}
                    </Dialog.Title>

                    <div
                      className="my-6 h-px w-full"
                      style={{ background: `linear-gradient(90deg, ${work.coverAccent}, transparent)` }}
                      aria-hidden
                    />

                    <p className="text-base leading-relaxed text-justify text-white/80 [hyphens:auto]">
                      {work.overview}
                    </p>

                    {work.details.length > 0 ? (
                      <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {work.details.map((d) => (
                          <div key={d.label}>
                            <dt
                              className="font-mono text-[0.65rem] tracking-[0.16em] uppercase"
                              style={{ color: `${work.coverAccent}cc` }}
                            >
                              {d.label}
                            </dt>
                            <dd className="mt-1 text-sm text-white/85">{d.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}

                    <div className="mt-8">
                      {work.link ? (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
                          style={{ background: work.coverAccent }}
                        >
                          {work.linkLabel}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        <p className="text-sm text-white/50 italic">Full material coming soon.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
