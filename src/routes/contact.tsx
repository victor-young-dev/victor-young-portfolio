import { type FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useSiteContent } from "@/lib/site-content-context";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { CONTACT_CHANNELS } from "@/lib/personal-contact";
import { CHANNEL_ICONS, CHANNEL_TINTS } from "@/components/site/contact-channel-ui";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const { site: SITE } = useSiteContent();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project with ${SITE.name}${name ? ` — ${name}` : ""}`);
    const body = encodeURIComponent(note || "Hi Victor —");
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    toast("Opening your mail client");
  };

  return (
    <PageShell>
      <main className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.2em] uppercase">
              {SITE.availability}
            </p>
            <h1 className="font-display text-5xl tracking-tight sm:text-7xl">Let’s talk.</h1>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <Reveal delay={0.08}>
              <p className="text-muted max-w-md text-base leading-relaxed text-justify [hyphens:auto]">
                Product roles, venture partnerships, and selected collaborations. If you’re building
                something worth the effort and need a builder who can hold design, software, and the
                brand — write.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {CONTACT_CHANNELS.map((c) => (
                  <a
                    key={c.id}
                    href={c.href}
                    target={c.id === "whatsapp" ? "_blank" : undefined}
                    rel={c.id === "whatsapp" ? "noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)] sm:p-5"
                  >
                    <span className="min-w-0 text-sm sm:text-base">{c.phrase}</span>
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110 ${CHANNEL_TINTS[c.id]}`}
                      aria-hidden
                    >
                      {CHANNEL_ICONS[c.id]}
                    </span>
                  </a>
                ))}
              </div>
              <p className="text-subtle mt-6 text-sm">
                <a href={`mailto:${SITE.email}`} className="hover:text-fg transition-colors">
                  {SITE.email}
                </a>{" "}
                · {SITE.location}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <form
                onSubmit={onSubmit}
                className="rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8"
              >
                <label className="block">
                  <span className="text-subtle text-xs tracking-wide">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    autoComplete="name"
                    className="mt-2 h-11 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your name"
                  />
                </label>
                <label className="mt-5 block">
                  <span className="text-subtle text-xs tracking-wide">Message</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    name="message"
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border-0 bg-bg-subtle px-3 py-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="What are we making?"
                  />
                </label>
                <Button type="submit" size="lg" className="mt-6 w-full">
                  Send a note
                </Button>
              </form>
            </Reveal>
          </div>

          <div className="mt-24 grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
                <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">Show some love</p>
                <h2 className="font-display mt-2 text-2xl tracking-tight">Support the work.</h2>
                <p className="text-muted mt-3 text-sm leading-relaxed text-justify [hyphens:auto]">
                  A lot of what’s here is built independently, through long nights and constant
                  iteration. If something helped you or made you curious about what’s next, say so.
                </p>
                <Button asChild variant="outline" className="mt-5">
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent("Show some love")}&body=${encodeURIComponent("Hi Victor — I wanted to say...")}`}
                  >
                    Send some love
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="h-full rounded-2xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] sm:p-8">
                <p className="text-subtle font-mono text-2xs tracking-[0.16em] uppercase">Backing RayzorVerse</p>
                <h2 className="font-display mt-2 text-2xl tracking-tight">Interested in investing?</h2>
                <p className="text-muted mt-3 text-sm leading-relaxed text-justify [hyphens:auto]">
                  RayzorVerse is building a connected ecosystem across software, brand, and knowledge
                  services. If you’re exploring venture partnerships or early backing, let’s talk
                  specifics.
                </p>
                <Button asChild className="mt-5">
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent("RayzorVerse — investment interest")}&body=${encodeURIComponent("Hi Victor — I'd like to learn more about backing RayzorVerse.")}`}
                  >
                    Talk investment
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
