import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { NAV } from "@/lib/site-content";
import { useSiteContent } from "@/lib/site-content-context";

export function SiteFooter() {
  const { site: SITE } = useSiteContent();
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="flex items-center gap-4">
            <img
              src="/portrait.png"
              alt="Victor Young"
              className="size-12 shrink-0 rounded-full object-cover shadow-[var(--shadow-border)] sm:size-14"
            />
            <div>
              <p className="font-medium">{SITE.name}</p>
              <p className="text-subtle mt-0.5 text-sm">{SITE.legal}</p>
              <p className="text-muted mt-1 max-w-[16rem] text-sm">{SITE.market}</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm sm:justify-end">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} className="text-muted hover:text-fg transition-colors duration-150">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-subtle mt-10 flex flex-col-reverse items-center gap-5 border-t border-border pt-6 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name} ·{" "}
            <Link to="/admin" className="hover:text-fg transition-colors">
              Admin
            </Link>
          </p>
          <div className="flex items-center gap-2" aria-label="Social links">
            <SocialLink href={SITE.x} label="X" icon={<Twitter />} />
            <SocialLink href={SITE.github} label="GitHub" icon={<Github />} />
            <SocialLink href={SITE.linkedin} label="LinkedIn" icon={<Linkedin />} />
            <SocialLink href={SITE.instagram} label="Instagram" icon={<Instagram />} />
            <SocialLink href={`mailto:${SITE.email}`} label="Email" icon={<Mail />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-fg"
    >
      {icon}
    </a>
  );
}
