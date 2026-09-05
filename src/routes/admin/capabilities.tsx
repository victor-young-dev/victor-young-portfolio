import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createCapability,
  deleteCapability,
  listCapabilities,
  updateCapability,
} from "@/lib/admin/collections/capabilities";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/capabilities")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listCapabilities(),
  component: CapabilitiesAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "title", label: "Group title", type: "text" },
  { key: "items", label: "Items", type: "array", placeholder: "Figma, Wireframing, Prototyping" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function CapabilitiesAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Capabilities">
      <CollectionEditor
        title="Capabilities"
        description="The skill-group cards on the About page."
        fields={FIELDS}
        items={items}
        emptyValues={{ title: "", items: [], sort_order: items.length }}
        onCreate={(data) => createCapability({ data: coerce(data) })}
        onUpdate={(id, data) => updateCapability({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteCapability({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
