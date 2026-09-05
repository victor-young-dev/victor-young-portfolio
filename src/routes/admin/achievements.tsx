import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createAchievement,
  deleteAchievement,
  listAchievements,
  updateAchievement,
} from "@/lib/admin/collections/achievements";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/achievements")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listAchievements(),
  component: AchievementsAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "issuer", label: "Issuer", type: "text" },
  { key: "date", label: "Date", type: "text" },
  { key: "image", label: "Image", type: "image" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function AchievementsAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Certifications & Awards">
      <CollectionEditor
        title="Certifications & awards"
        description="The shelf on the About page. Leave image blank to show the award-mark placeholder."
        fields={FIELDS}
        items={items}
        emptyValues={{ title: "", issuer: "", date: "", image: "", sort_order: items.length }}
        onCreate={(data) => createAchievement({ data: coerce(data) })}
        onUpdate={(id, data) => updateAchievement({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteAchievement({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return {
    ...data,
    image: data.image || null,
    sort_order: Number(data.sort_order) || 0,
  } as any;
}
