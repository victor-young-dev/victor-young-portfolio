import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createVenture,
  deleteVenture,
  listVentures,
  updateVenture,
} from "@/lib/admin/collections/ventures";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/ventures")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listVentures(),
  component: VenturesAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "slug", label: "Slug", type: "text", placeholder: "labs" },
  { key: "title", label: "Title", type: "text" },
  { key: "year", label: "Year", type: "text" },
  { key: "role", label: "Role", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "href", label: "Live site URL (optional)", type: "url" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function VenturesAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Ventures">
      <CollectionEditor
        title="RayzorVerse divisions"
        description="The division cards on the RayzorVerse page — the one named 'labs' also drives its software children in the ecosystem tree."
        fields={FIELDS}
        items={items}
        emptyValues={{ slug: "", title: "", year: "", role: "", image: "", copy: "", href: "", sort_order: items.length }}
        onCreate={(data) => createVenture({ data: coerce(data) })}
        onUpdate={(id, data) => updateVenture({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteVenture({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, href: data.href || null, sort_order: Number(data.sort_order) || 0 } as any;
}
