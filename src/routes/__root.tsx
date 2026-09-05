import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "sonner";
import { getSiteContent } from "@/lib/admin/content";
import { SiteContentProvider } from "@/lib/site-content-context";
import appCss from "../styles.css?url";

const APP_NAME = "Victor Young";
const THEME_BOOT =
  "try{if(localStorage.getItem('vy-theme')==='light')document.documentElement.classList.add('light')}catch(e){}";

export const Route = createRootRoute({
  loader: () => getSiteContent(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} — Product Builder` },
      {
        name: "description",
        content:
          "Victor Young (Victor Uzor) is a product builder, designer, and developer — founder of RayzorVerse.",
      },
      { name: "theme-color", content: "#07111f" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const content = Route.useLoaderData();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg font-sans">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <PreviewHostBridge />
        <AuthProvider>
          <ThemeProvider>
            <SiteContentProvider value={content}>
              <Outlet />
            </SiteContentProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster
          theme="system"
          position="bottom-center"
          toastOptions={{
            className: "font-sans",
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
