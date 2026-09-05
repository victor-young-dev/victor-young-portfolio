import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createLeadership,
  deleteLeadership,
  listLeadership,
  updateLeadership,
} from "@/lib/admin/collections/leadership";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/leadership")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listLeadership(),
  component: LeadershipAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "slug", label: "Slug", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "year", label: "Year", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function LeadershipAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Leadership">
      <CollectionEditor
        title="Leadership, outside RayzorVerse"
        description="On the About page — roles held elsewhere, kept distinct from owned ventures."
        fields={FIELDS}
        items={items}
        emptyValues={{ slug: "", title: "", year: "", role: "", image: "", copy: "", sort_order: items.length }}
        onCreate={(data) => createLeadership({ data: coerce(data) })}
        onUpdate={(id, data) => updateLeadership({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteLeadership({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
