import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/image-field";

export type FieldSchema = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "array" | "image" | "select";
  options?: string[];
  placeholder?: string;
};

type Row = Record<string, unknown> & { id: number };

/** Generic add/edit/delete list editor, reused for every simple collection in /admin. */
export function CollectionEditor<T extends Row>({
  title,
  description,
  fields,
  items,
  emptyValues,
  onCreate,
  onUpdate,
  onDelete,
  renderTitle,
}: {
  title: string;
  description?: string;
  fields: FieldSchema[];
  items: T[];
  emptyValues: Record<string, unknown>;
  onCreate: (data: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: number, data: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
  renderTitle?: (item: T) => string;
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [values, setValues] = useState<Record<string, unknown>>(emptyValues);
  const [pending, setPending] = useState(false);

  const startEdit = (item: T) => {
    setEditingId(item.id);
    setValues(toFormValues(item, fields));
  };

  const startNew = () => {
    setEditingId("new");
    setValues(emptyValues);
  };

  const cancel = () => {
    setEditingId(null);
    setValues(emptyValues);
  };

  const submit = async () => {
    setPending(true);
    try {
      const payload = fromFormValues(values, fields);
      if (editingId === "new") {
        await onCreate(payload);
      } else if (typeof editingId === "number") {
        await onUpdate(editingId, payload);
      }
      await router.invalidate();
      cancel();
    } finally {
      setPending(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this item? This can't be undone.")) return;
    setPending(true);
    try {
      await onDelete(id);
      await router.invalidate();
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{title}</h2>
          {description ? <p className="text-muted mt-1 text-sm">{description}</p> : null}
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
          <FieldForm fields={fields} values={values} setValues={setValues} />
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

      <div className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border flex items-center justify-between gap-4 rounded-lg border bg-bg-elevated px-4 py-3"
          >
            <p className="truncate text-sm font-medium">
              {renderTitle ? renderTitle(item) : String(item[fields[0]?.key] ?? item.id)}
            </p>
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
        {items.length === 0 ? <p className="text-subtle text-sm">Nothing here yet.</p> : null}
      </div>
    </div>
  );
}

function FieldForm({
  fields,
  values,
  setValues,
}: {
  fields: FieldSchema[];
  values: Record<string, unknown>;
  setValues: (v: Record<string, unknown>) => void;
}) {
  const set = (key: string, v: unknown) => setValues({ ...values, [key]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const full = f.type === "textarea" || f.type === "array" || f.type === "image";
        return (
          <label key={f.key} className={full ? "sm:col-span-2 block" : "block"}>
            <span className="text-subtle text-xs tracking-wide">{f.label}</span>
            {f.type === "textarea" ? (
              <textarea
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                rows={4}
                placeholder={f.placeholder}
                className="mt-1.5 w-full resize-none rounded-lg border-0 bg-bg-subtle px-3 py-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : f.type === "array" ? (
              <input
                value={
                  Array.isArray(values[f.key]) ? (values[f.key] as string[]).join(", ") : (values[f.key] as string) ?? ""
                }
                onChange={(e) => set(f.key, e.target.value)}
                placeholder="Comma-separated"
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            ) : f.type === "select" ? (
              <select
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "image" ? (
              <ImageField value={(values[f.key] as string) ?? ""} onChange={(v) => set(f.key, v)} />
            ) : (
              <input
                value={(values[f.key] as string) ?? ""}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="mt-1.5 h-10 w-full rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            )}
          </label>
        );
      })}
    </div>
  );
}

function toFormValues<T extends Row>(item: T, fields: FieldSchema[]): Record<string, unknown> {
  const out: Record<string, unknown> = { id: item.id };
  for (const f of fields) out[f.key] = item[f.key];
  return out;
}

function fromFormValues(values: Record<string, unknown>, fields: FieldSchema[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = values[f.key];
    if (f.type === "array") {
      out[f.key] = typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : (v ?? []);
    } else {
      out[f.key] = v ?? "";
    }
  }
  return out;
}
