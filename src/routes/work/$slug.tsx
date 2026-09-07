import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { InitialTile } from "@/components/site/initial-tile";
import { LiteYouTube } from "@/components/site/lite-youtube";
import type { GalleryItem } from "@/lib/site-content";
import { AppNotFoundComponent } from "@/lib/error-component";

export const Route = createFileRoute("/work/$slug")({ component: WorkDetailRoute });

/**
 * Guard for an unknown slug. This used to `throw notFound()` from inside the
 * render, which neither the route's own notFoundComponent nor the router's
 * default one catches — so a stale or renamed /work/<slug> link rendered a
 * blank page with no nav and no way back. Rendering the 404 directly fixes
 * that, and keeping the lookup in a wrapper means WorkDetail below always has
 * a real item and can call its hooks unconditionally.
 */
function WorkDetailRoute() {
  const { slug } = Route.useParams();
  const { allWork: ALL_WORK } = useSiteContent();
  const index = ALL_WORK.findIndex((w) => w.slug === slug);
  if (index === -1) return <AppNotFoundComponent />;
  return <WorkDetail index={index} />;
}

function WorkDetail({ index }: { index: number }) {
  const { allWork: ALL_WORK } = useSiteContent();
  const item = ALL_WORK[index];
  const imageItems = item.gallery.filter((galleryItem) => galleryItem.kind === "image");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prev = index > 0 ? ALL_WORK[index - 1] : null;
  const next = index < ALL_WORK.length - 1 ? ALL_WORK[index + 1] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current === null ? null : (current - 1 + imageItems.length) % imageItems.length));
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current === null ? null : (current + 1) % imageItems.length));
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [imageItems.length, lightboxIndex]);

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
            <div className="mt-6 flex flex-wrap gap-3">
              {item.href ? (
                <Button asChild variant="outline">
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Visit live site
                    <ArrowUpRight />
                  </a>
                </Button>
              ) : null}
              {item.slug === "apex-wright-lab" ? (
                <Button asChild variant="outline">
                  <Link to="/library">
                    <BookOpen />
                    Browse the library
                  </Link>
                </Button>
              ) : null}
            </div>
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
              <p className="text-muted max-w-2xl text-base leading-relaxed text-justify [hyphens:auto]">{item.body}</p>
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
                {item.gallery.map((g) => (
                  <figure
                    key={g.id}
                    className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]"
                  >
                    {g.kind === "video" ? (
                      <LiteYouTube youtubeId={g.youtubeId} title={g.title} />
                    ) : g.kind === "document" ? (
                      <a
                        href={g.src}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex aspect-video w-full flex-col items-center justify-center gap-3 bg-bg-subtle p-6 text-center transition-colors hover:bg-bg-elevated"
                      >
                        <FileText className="text-subtle size-8 transition-colors group-hover:text-accent" strokeWidth={1.25} />
                        <span className="text-sm font-medium">{g.title}</span>
                        <span className="text-subtle text-xs">View document</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(imageItems.findIndex((image) => image.id === g.id))}
                        className="group block w-full cursor-zoom-in text-left"
                        aria-label={`Open ${g.title ?? "gallery image"} in full view`}
                      >
                        <img
                          src={g.src}
                          alt={g.title ?? ""}
                          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </button>
                    )}
                    {g.kind === "image" && g.title ? (
                      <figcaption className="border-t border-border px-4 py-3 text-xs text-muted">
                        {g.title}
                      </figcaption>
                    ) : null}
                  </figure>
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
      {lightboxIndex !== null && imageItems[lightboxIndex] ? (
        <ImageLightbox
          item={imageItems[lightboxIndex]}
          index={lightboxIndex}
          total={imageItems.length}
          onClose={() => setLightboxIndex(null)}
          onPrevious={() => setLightboxIndex((current) => (current === null ? null : (current - 1 + imageItems.length) % imageItems.length))}
          onNext={() => setLightboxIndex((current) => (current === null ? null : (current + 1) % imageItems.length))}
        />
      ) : null}
    </PageShell>
  );
}

function ImageLightbox({
  item,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: {
  item: Extract<GalleryItem, { kind: "image" }>;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  // Portalled straight to <body> — PageShell wraps page content in a
  // `relative z-10` div, which creates its own stacking context. Nested
  // inside that, no z-index on this dialog (however high) can ever paint
  // above the site nav's fixed header, which lives outside that wrapper.
  // The nav visibly sat on top of the image and swallowed clicks meant for
  // the close button until this escaped via a portal.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? "Gallery image"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.title ?? ""} className="max-h-[82vh] max-w-full object-contain" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full image"
          className="absolute right-0 top-0 grid size-11 place-items-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-white/15"
        >
          <X className="size-5" />
        </button>
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous image"
              className="absolute left-0 grid size-11 place-items-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-white/15"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-white/15"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-12 text-white sm:px-4 sm:pb-4">
          <p className="text-sm font-medium">{item.title ?? "Gallery image"}</p>
          <p className="shrink-0 font-mono text-2xs tracking-[0.16em] text-white/65">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
