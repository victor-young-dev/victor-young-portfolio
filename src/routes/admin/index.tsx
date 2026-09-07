import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Briefcase,
  FolderKanban,
  Handshake,
  Layers,
  Settings2,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import { AdminShell } from "@/components/admin/admin-shell";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAdminOrRedirect,
  component: AdminDashboard,
});

const CARDS = [
  { to: "/admin/work", label: "Work", copy: "Products, client work, and their galleries.", icon: Briefcase },
  { to: "/admin/ventures", label: "Ventures", copy: "RayzorVerse divisions on the ecosystem page.", icon: Layers },
  { to: "/admin/leadership", label: "Leadership", copy: "Roles held outside RayzorVerse.", icon: Users },
  { to: "/admin/collaborations", label: "Collaborations", copy: "Projects built for other people.", icon: Handshake },
  { to: "/admin/experience", label: "Experience", copy: "The Experience list on About.", icon: FolderKanban },
  { to: "/admin/capabilities", label: "Capabilities", copy: "Skill groups on About.", icon: Sparkles },
  { to: "/admin/services", label: "Services", copy: "The “How I can help” band on Work.", icon: Wrench },
  { to: "/admin/story", label: "Story", copy: "The Start → Build Bigger arc on About.", icon: Award },
  { to: "/admin/achievements", label: "Certifications", copy: "The Certifications & Awards shelf.", icon: Award },
  { to: "/admin/settings", label: "Site settings", copy: "Name, tagline, contact info, socials, education.", icon: Settings2 },
] as const;

function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-3 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex items-start gap-4 rounded-2xl bg-bg-elevated p-5 shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)]"
          >
            <span className="bg-accent/10 text-accent grid size-10 shrink-0 place-items-center rounded-full transition-transform group-hover:scale-105">
              <c.icon className="size-5" />
            </span>
            <span>
              <p className="font-medium">{c.label}</p>
              <p className="text-muted mt-1 text-sm">{c.copy}</p>
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
