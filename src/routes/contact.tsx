import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/magnetic";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project with ${SITE.name}${name ? ` — ${name}` : ""}`);
    const body = encodeURIComponent(note || "Hi Victor —");
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    toast("Opening your mail client");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      toast("Email copied");
    } catch {
      toast(SITE.email);
    }
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
              <p className="text-muted max-w-md text-base leading-relaxed">
                Product roles, venture partnerships, and selected collaborations. If you’re building
                something worth building and need a builder who can hold design, software, and the
                brand — write.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <p>
                  <button type="button" onClick={copy} className="text-fg hover:text-accent">
                    {SITE.email}
                  </button>
                </p>
                {SITE.phones.map((p) => (
                  <p key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="text-muted hover:text-fg">
                      {p}
                    </a>
                  </p>
                ))}
                <p className="text-subtle">{SITE.location}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button type="button" size="lg" onClick={copy}>
                    Copy email
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="outline">
                  <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
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
        </div>
      </main>
    </PageShell>
  );
}
