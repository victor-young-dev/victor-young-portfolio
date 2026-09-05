import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { requireAdminOrRedirect } from "@/lib/admin/session";
import { createWorkItem, deleteWorkItem, listWorkItems, updateWorkItem } from "@/lib/admin/collections/work";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/image-field";
import { GalleryEditor } from "@/components/admin/gallery-editor";

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
          <p className="text-muted mt-1 text-sm">
            Rayzor Labs products and brand/client case studies. "Kind" decides which section they show
            under on the Work page.
          </p>
        </div>
        {editingId === null ? (
          <Button size="sm" onClick={startNew}>
            <Plus className="size-4" />
            Add
          </Button>
        ) : null}
      </div>

      {editingId !== null ? (
        <div className="border-border mt-4 rounded-xl border bg-bg-elevated p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Kind</span>
              <select
                value={String(form.kind)}
                onChange={(e) => setForm({ ...form, kind: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="product">Product (Rayzor Labs)</option>
                <option value="client">Client / brand work</option>
              </select>
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Slug</span>
              <input
                value={String(form.slug ?? "")}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Title</span>
              <input
                value={String(form.title ?? "")}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Year</span>
              <input
                value={String(form.year ?? "")}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Status</span>
              <input
                value={String(form.status ?? "")}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder="In development, Live, Client work…"
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Arm / category</span>
              <input
                value={String(form.arm ?? "")}
                onChange={(e) => setForm({ ...form, arm: e.target.value })}
                placeholder="Rayzor Labs, Marketing & Brand…"
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-subtle text-xs tracking-wide">Summary</span>
              <textarea
                value={String(form.summary ?? "")}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                rows={2}
                className="mt-1.5 w-full resize-none rounded-lg border-0 bg-bg-subtle px-3 py-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-subtle text-xs tracking-wide">Body</span>
              <textarea
                value={String(form.body ?? "")}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={5}
                className="mt-1.5 w-full resize-none rounded-lg border-0 bg-bg-subtle px-3 py-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-subtle text-xs tracking-wide">Cover image</span>
              <ImageField value={String(form.image ?? "")} onChange={(v) => setForm({ ...form, image: v })} />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Tags (comma-separated)</span>
              <input
                value={String(form.tags ?? "")}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Live site URL (optional)</span>
              <input
                value={String(form.href ?? "")}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-subtle text-xs tracking-wide">Sort order</span>
              <input
                value={String(form.sort_order ?? 0)}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

          <div className="mt-4 flex gap-2">
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

      <div className="mt-6 flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border flex items-center justify-between gap-4 rounded-lg border bg-bg-elevated px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="text-subtle truncate text-xs">
                {item.kind} · {item.arm} · {item.status}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
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
