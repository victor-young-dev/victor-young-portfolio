import { Link, createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import { AdminShell } from "@/components/admin/admin-shell";

export const Route = createFileRoute("/admin/")({
  beforeLoad: requireAdminOrRedirect,
  component: AdminDashboard,
});

const CARDS = [
  { to: "/admin/work", label: "Work", copy: "Products, client work, and their galleries." },
  { to: "/admin/ventures", label: "Ventures", copy: "RayzorVerse divisions on the ecosystem page." },
  { to: "/admin/leadership", label: "Leadership", copy: "Roles held outside RayzorVerse." },
  { to: "/admin/collaborations", label: "Collaborations", copy: "Projects built for other people." },
  { to: "/admin/experience", label: "Experience", copy: "The Experience list on About." },
  { to: "/admin/capabilities", label: "Capabilities", copy: "Skill groups on About." },
  { to: "/admin/services", label: "Services", copy: "The “How I can help” band on Work." },
  { to: "/admin/story", label: "Story", copy: "The Start → Build Bigger arc on About." },
  { to: "/admin/achievements", label: "Certifications", copy: "The Certifications & Awards shelf." },
  { to: "/admin/settings", label: "Site settings", copy: "Name, tagline, contact info, socials, education." },
] as const;

function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-3 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="border-border rounded-xl border bg-bg-elevated p-5 transition-colors hover:border-accent"
          >
            <p className="font-medium">{c.label}</p>
            <p className="text-muted mt-1 text-sm">{c.copy}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
