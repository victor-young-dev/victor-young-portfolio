import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { adminLogout } from "@/lib/admin/auth-actions";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { to: "/admin/work", label: "Work" },
  { to: "/admin/ventures", label: "Ventures" },
  { to: "/admin/leadership", label: "Leadership" },
  { to: "/admin/collaborations", label: "Collaborations" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/capabilities", label: "Capabilities" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/story", label: "Story" },
  { to: "/admin/achievements", label: "Certifications" },
  { to: "/admin/settings", label: "Site settings" },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();

  const logout = async () => {
    await adminLogout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="bg-bg text-fg min-h-svh">
      <div className="border-border flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="font-display text-xl tracking-tight">
            Admin
          </Link>
          <Link to="/" className="text-subtle text-sm hover:text-fg">
            ← Back to site
          </Link>
        </div>
        <Button size="sm" variant="ghost" onClick={logout}>
          <LogOut className="size-4" />
          Log out
        </Button>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row">
        <nav className="flex shrink-0 flex-row flex-wrap gap-1 lg:w-48 lg:flex-col">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-muted hover:bg-fg/6 hover:text-fg rounded-md px-3 py-2 text-sm transition-colors data-[status=active]:bg-fg/6 data-[status=active]:text-fg"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <main className="min-w-0 flex-1">
          <h1 className="font-display mb-6 text-3xl tracking-tight">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
