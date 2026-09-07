import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Award,
  Briefcase,
  FolderKanban,
  Handshake,
  Layers,
  LogOut,
  Settings2,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { adminLogout } from "@/lib/admin/auth-actions";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { to: "/admin/work", label: "Work", icon: Briefcase },
  { to: "/admin/ventures", label: "Ventures", icon: Layers },
  { to: "/admin/leadership", label: "Leadership", icon: Users },
  { to: "/admin/collaborations", label: "Collaborations", icon: Handshake },
  { to: "/admin/experience", label: "Experience", icon: FolderKanban },
  { to: "/admin/capabilities", label: "Capabilities", icon: Sparkles },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/story", label: "Story", icon: Award },
  { to: "/admin/achievements", label: "Certifications", icon: Award },
  { to: "/admin/settings", label: "Site settings", icon: Settings2 },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();

  const logout = async () => {
    await adminLogout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="bg-bg text-fg min-h-svh">
      <div className="border-border bg-bg-elevated/60 sticky top-0 z-20 flex flex-col gap-4 border-b px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="font-display text-xl tracking-tight">
            Admin
          </Link>
          <Link to="/" className="text-subtle text-sm transition-colors hover:text-fg">
            ← Back to site
          </Link>
        </div>
        <Button size="sm" variant="ghost" onClick={logout}>
          <LogOut className="size-4" />
          Log out
        </Button>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:gap-10">
        <nav className="border-border bg-bg-elevated flex shrink-0 flex-row flex-wrap gap-1 rounded-2xl border p-2 shadow-[var(--shadow-border)] lg:w-52 lg:flex-col lg:gap-0.5">
          {SECTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-muted hover:bg-fg/6 hover:text-fg flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors data-[status=active]:bg-accent/10 data-[status=active]:font-medium data-[status=active]:text-fg data-[status=active]:shadow-[0_0_16px_-8px_var(--vy-accent)]"
            >
              <s.icon className="size-4 shrink-0" />
              {s.label}
            </Link>
          ))}
        </nav>
        <main className="min-w-0 flex-1">
          <p className="text-subtle mb-2 font-mono text-2xs tracking-[0.2em] uppercase">Admin</p>
          <h1 className="font-display mb-8 text-3xl tracking-tight sm:text-4xl">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
