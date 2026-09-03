import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <header
          className={cn(
            "mx-auto max-w-5xl rounded-full border border-border backdrop-blur-xl transition-[background-color,box-shadow] duration-300",
            scrolled || open
              ? "bg-bg/95 shadow-[var(--shadow-border-hover)]"
              : "bg-bg/55 shadow-[var(--shadow-border)]",
          )}
        >
          <div className="flex h-14 items-center justify-between pr-1.5 pl-5 sm:h-16 sm:pr-2 sm:pl-6">
            <Link to="/" className="flex items-center gap-3 text-sm tracking-tight">
              <Mark />
              <span className="font-medium">{SITE.name}</span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {NAV.filter((l) => l.to !== "/").map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "text-sm transition-colors duration-150",
                    pathname === l.to || pathname.startsWith(l.to) ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                onClick={toggle}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <Button asChild size="sm" className="hidden rounded-full md:inline-flex">
                <Link to="/contact">Let’s talk</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg pt-20 sm:pt-24 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4 text-subtle font-mono text-2xs tracking-[0.18em] uppercase">
              <span>Navigation</span>
              <span>
                00 — {String(NAV.length - 1).padStart(2, "0")}
              </span>
            </div>
            <nav className="flex flex-col gap-1 px-6 py-8 pb-12">
              {NAV.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    className="group flex items-baseline justify-between border-b border-border py-4 font-display text-4xl tracking-tight transition-colors hover:text-accent sm:text-5xl"
                  >
                    {l.label}
                    <span className="text-muted font-mono text-2xs tracking-[0.16em] opacity-60 transition-opacity group-hover:opacity-100">
                      {String(i).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <Button asChild size="lg" className="mt-8 w-full">
                <Link to="/contact">Let’s talk</Link>
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Mark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="text-fg">
      <circle cx="12" cy="13.2" r="9.7" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M6.1 8.9h1.9l1.85 7 1.85-7h1.9l-2.8 10.4H8.9L6.1 8.9Zm7.65 0h1.9l1.2 3.3 1.25-3.3h1.9l-2.2 5.55v4.85h-1.9v-4.85l-2.05-5.55Z"
        fill="currentColor"
      />
      <path d="M12 1.5 13.2 3.9 12 5 10.8 3.9 12 1.5Z" fill="var(--vy-accent)" />
    </svg>
  );
}
