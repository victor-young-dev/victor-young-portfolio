import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import { createWorkItem, deleteWorkItem, listWorkItems, updateWorkItem } from "@/lib/admin/collections/work";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/image-field";
import { GalleryEditor } from "@/components/admin/gallery-editor";
import { fieldLabelClass, inputClass, panelClass, rowClass, selectClass, textareaClass } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/work")({
  beforeLoad: requireAdminOrRedirect,
  loader: () => listWorkItems(),
  component: WorkAdmin,
});

type WorkRow = {
  id: number;
  kind: "product" | "client";
  slug: string;
  title: string;
  year: string;
  status: string;
  arm: string;
  summary: string;
  body: string;
  image: string | null;
  tags: unknown;
  href: string | null;
  sort_order: number;
};

type GalleryRow = {
  id: number;
  work_item_id: number;
  kind: "image" | "video" | "document";
  src: string | null;
  youtube_id: string | null;
  title: string | null;
  sort_order: number;
};

const EMPTY: Omit<WorkRow, "id"> = {
  kind: "product",
  slug: "",
  title: "",
  year: "",
  status: "",
  arm: "",
  summary: "",
  body: "",
  image: "",
  tags: "",
  href: "",
  sort_order: 0,
};

function WorkAdmin() {
  const router = useRouter();
  const { items, galleries } = Route.useLoaderData() as { items: WorkRow[]; galleries: GalleryRow[] };
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(EMPTY);
  const [pending, setPending] = useState(false);

  const refresh = () => router.invalidate();

  const startEdit = (item: WorkRow) => {
    setEditingId(item.id);
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags });
  };
  const startNew = () => {
    setEditingId("new");
    setForm({ ...EMPTY, sort_order: items.length });
  };
  const cancel = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const submit = async () => {
    setPending(true);
    try {
      const payload = {
        kind: form.kind as "product" | "client",
        slug: String(form.slug ?? ""),
        title: String(form.title ?? ""),
        year: String(form.year ?? ""),
        status: String(form.status ?? ""),
        arm: String(form.arm ?? ""),
        summary: String(form.summary ?? ""),
        body: String(form.body ?? ""),
        image: (form.image as string) || null,
        tags: typeof form.tags === "string" ? form.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
        href: (form.href as string) || null,
        sort_order: Number(form.sort_order) || 0,
      };
      if (editingId === "new") {
        await createWorkItem({ data: payload });
      } else if (typeof editingId === "number") {
        await updateWorkItem({ data: { id: editingId, ...payload } });
      }
      await refresh();
      cancel();
    } finally {
      setPending(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this work item and its gallery? This can't be undone.")) return;
    setPending(true);
    try {
      await deleteWorkItem({ data: { id } });
      await refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <AdminShell title="Work">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl tracking-tight">Work items</h2>
          <p className="text-muted mt-1.5 text-sm">
            Rayzor Labs products and brand/client case studies. "Kind" decides which section they show
            under on the Work page.
          </p>
        </div>
        {editingId === null ? (
          <Button size="sm" onClick={startNew} className="shrink-0">
            <Plus className="size-4" />
            Add
          </Button>
        ) : null}
      </div>

      {editingId !== null ? (
        <div className={`${panelClass} border-accent/30 mt-5 border-l-2`}>
          <p className="text-subtle mb-4 font-mono text-2xs tracking-[0.16em] uppercase">
            {editingId === "new" ? "New work item" : "Editing"}
          </p>
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <label className="block">
              <span className={fieldLabelClass}>Kind</span>
              <select
                value={String(form.kind)}
                onChange={(e) => setForm({ ...form, kind: e.target.value })}
                className={selectClass}
              >
                <option value="product">Product (Rayzor Labs)</option>
                <option value="client">Client / brand work</option>
              </select>
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Slug</span>
              <input
                value={String(form.slug ?? "")}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Title</span>
              <input
                value={String(form.title ?? "")}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Year</span>
              <input
                value={String(form.year ?? "")}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Status</span>
              <input
                value={String(form.status ?? "")}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder="In development, Live, Client work…"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Arm / category</span>
              <input
                value={String(form.arm ?? "")}
                onChange={(e) => setForm({ ...form, arm: e.target.value })}
                placeholder="Rayzor Labs, Marketing & Brand…"
                className={inputClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabelClass}>Summary</span>
              <textarea
                value={String(form.summary ?? "")}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                rows={2}
                className={textareaClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabelClass}>Body</span>
              <textarea
                value={String(form.body ?? "")}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={5}
                className={textareaClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={fieldLabelClass}>Cover image</span>
              <ImageField value={String(form.image ?? "")} onChange={(v) => setForm({ ...form, image: v })} />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Tags (comma-separated)</span>
              <input
                value={String(form.tags ?? "")}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Live site URL (optional)</span>
              <input
                value={String(form.href ?? "")}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={fieldLabelClass}>Sort order</span>
              <input
                value={String(form.sort_order ?? 0)}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className={inputClass}
              />
            </label>
          </div>

          {typeof editingId === "number" ? (
            <GalleryEditor
              workItemId={editingId}
              items={galleries.filter((g) => g.work_item_id === editingId)}
              onChange={refresh}
            />
          ) : (
            <p className="text-subtle mt-4 text-xs">Save this item first, then its gallery can be managed here.</p>
          )}

          <div className="border-border mt-5 flex gap-2 border-t pt-5">
            <Button size="sm" onClick={submit} disabled={pending}>
              {editingId === "new" ? "Create" : "Save"}
            </Button>
            <Button size="sm" variant="outline" onClick={cancel} disabled={pending}>
              <X className="size-4" />
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-2.5">
        {items.map((item) => (
          <div key={item.id} className={rowClass}>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-2xs uppercase tracking-[0.08em] ${
                    item.kind === "product" ? "bg-accent/15 text-accent" : "bg-fg/8 text-muted"
                  }`}
                >
                  {item.kind}
                </span>
                <p className="truncate text-sm font-medium">{item.title}</p>
              </div>
              <p className="text-subtle mt-1 truncate text-xs">
                {item.arm} · {item.status}
              </p>
            </div>
            <div className="flex shrink-0 gap-1 opacity-70 transition-opacity group-hover:opacity-100">
              <Button size="icon" variant="ghost" onClick={() => startEdit(item)} aria-label="Edit">
                <Pencil className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => remove(item.id)} aria-label="Delete">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
