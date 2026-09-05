import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

/** All editable site content — populated once per request from the root loader. */
export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent() must be used inside <SiteContentProvider>");
  return ctx;
}
