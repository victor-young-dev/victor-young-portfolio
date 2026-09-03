import { lazy, Suspense, type ReactNode } from "react";
import { ClientOnly } from "@/components/site/client-only";
import { CustomCursor } from "@/components/site/cursor";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

const HeroCanvas = lazy(() => import("@/components/site/hero-canvas"));

export function PageShell({
  children,
  scene = false,
}: {
  children: ReactNode;
  scene?: boolean;
}) {
  return (
    <div className="relative min-h-svh bg-bg text-fg">
      <div className="grain" aria-hidden />
      {scene ? (
        <ClientOnly fallback={<div className="fixed inset-0 bg-bg" />}>
          <Suspense fallback={<div className="fixed inset-0 bg-bg" />}>
            <HeroCanvas />
          </Suspense>
        </ClientOnly>
      ) : null}
      <CustomCursor />
      <SiteNav />
      <div className="relative z-10">{children}</div>
      <SiteFooter />
    </div>
  );
}
