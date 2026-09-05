import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createService,
  deleteService,
  listServices,
  updateService,
} from "@/lib/admin/collections/services";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/services")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listServices(),
  component: ServicesAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "items", label: "Items", type: "array", placeholder: "Product design, UI/UX" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function ServicesAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Services">
      <CollectionEditor
        title="How I can help"
        description="The services band on the Work page."
        fields={FIELDS}
        items={items}
        emptyValues={{ title: "", copy: "", items: [], sort_order: items.length }}
        onCreate={(data) => createService({ data: coerce(data) })}
        onUpdate={(id, data) => updateService({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteService({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
