import { createFileRoute } from "@tanstack/react-router";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import {
  createStoryStep,
  deleteStoryStep,
  listStorySteps,
  updateStoryStep,
} from "@/lib/admin/collections/story";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor, type FieldSchema } from "@/components/admin/collection-editor";

export const Route = createFileRoute("/admin/story")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listStorySteps(),
  component: StoryAdmin,
});

const FIELDS: FieldSchema[] = [
  { key: "step", label: "Step", type: "text", placeholder: "Start" },
  { key: "copy", label: "Description", type: "textarea" },
  { key: "sort_order", label: "Sort order", type: "text" },
];

function StoryAdmin() {
  const items = Route.useLoaderData() as Array<Record<string, unknown> & { id: number }>;
  return (
    <AdminShell title="Story">
      <CollectionEditor
        title="The story"
        description="The Start → Build Bigger arc on the About page."
        fields={FIELDS}
        items={items}
        emptyValues={{ step: "", copy: "", sort_order: items.length }}
        renderTitle={(i) => String(i.step)}
        onCreate={(data) => createStoryStep({ data: coerce(data) })}
        onUpdate={(id, data) => updateStoryStep({ data: { id, ...coerce(data) } })}
        onDelete={(id) => deleteStoryStep({ data: { id } })}
      />
    </AdminShell>
  );
}

function coerce(data: Record<string, unknown>) {
  return { ...data, sort_order: Number(data.sort_order) || 0 } as any;
}
