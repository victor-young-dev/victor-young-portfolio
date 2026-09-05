import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createCollaboration,
  deleteCollaboration,
  listCollaborations,
  updateCollaboration,
} from "@/lib/admin/collections/collaborations";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/collaborations")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listCollaborations(),
  component: CollaborationsAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "role", label: "Role", type: "text", placeholder: "Development collaboration" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function CollaborationsAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Collaborations">
      <CollectionEditor
        title="Built with people, not just code"
        description="On the RayzorVerse page — work built for other people, never listed as owned."
        fields={FIELDS}
        items={items}
        emptyValues={{ title: "", role: "", copy: "", sort_order: items.length }}
        onCreate={(data) => createCollaboration({ data: coerce(data) })}
        onUpdate={(id, data) => updateCollaboration({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteCollaboration({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
