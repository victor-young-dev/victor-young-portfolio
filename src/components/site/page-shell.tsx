import { lazy, Suspense, type ReactNode } from "react";
import { ClientOnly } from "@/components/site/client-only";
import { CustomCursor } from "@/components/site/cursor";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { ContactFab } from "@/components/site/contact-fab";
import { useTheme } from "@/lib/theme";

const HeroCanvas = lazy(() => import("@/components/site/hero-canvas"));

export function PageShell({
  children,
  scene = false,
}: {
  children: ReactNode;
  scene?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <div className="relative min-h-svh bg-bg text-fg">
      <div className="grain" aria-hidden />
      {scene ? (
        theme === "light" ? (
          // The WebGL scene's grid/fog reads as a flat gray haze in light
          // mode — a soft navy gradient suits the light palette better than
          // fighting the 3D scene's lighting to look right on white.
          <div
            className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgb(31_95_139/0.16),transparent_60%),linear-gradient(180deg,rgb(31_95_139/0.08),transparent_45%)]"
            aria-hidden
          />
        ) : (
          <ClientOnly fallback={<div className="fixed inset-0 bg-bg" />}>
            <Suspense fallback={<div className="fixed inset-0 bg-bg" />}>
              <HeroCanvas />
            </Suspense>
          </ClientOnly>
        )
      ) : null}
      <CustomCursor />
      <SiteNav />
      <div className="relative z-10">{children}</div>
      <SiteFooter />
      <ContactFab />
    </div>
  );
}
