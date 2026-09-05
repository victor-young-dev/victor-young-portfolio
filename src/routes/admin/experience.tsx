import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createExperience,
  deleteExperience,
  listExperience,
  updateExperience,
} from "@/lib/admin/collections/experience";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/experience")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listExperience(),
  component: ExperienceAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "org", label: "Organisation", type: "text" },
  { key: "dates", label: "Dates", type: "text", placeholder: "2026 – Present" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function ExperienceAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Experience">
      <CollectionEditor
        title="Experience"
        description="The Experience list on the About page."
        fields={FIELDS}
        items={items}
        emptyValues={{ title: "", org: "", dates: "", copy: "", sort_order: items.length }}
        renderTitle={(i) => `${i.title} — ${i.org}`}
        onCreate={(data) => createExperience({ data: coerce(data) })}
        onUpdate={(id, data) => updateExperience({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteExperience({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
