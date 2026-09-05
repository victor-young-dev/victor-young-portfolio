import { useRef, useState } from "react";
import { FileText, Trash2, Upload, Youtube } from "lucide-react";
import {
  createGalleryItem,
  deleteGalleryItem,
} from "@/lib/admin/collections/work";
import { uploadFile } from "@/lib/admin/upload";

type GalleryRow = {
  id: number;
  work_item_id: number;
  kind: "image" | "video" | "document";
  src: string | null;
  youtube_id: string | null;
  title: string | null;
  sort_order: number;
};

const YOUTUBE_RE = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

/** Detects a YouTube link automatically; anything else is treated as an image unless "Document" is picked. */
export function GalleryEditor({
  workItemId,
  items,
  onChange,
}: {
  workItemId: number;
  items: GalleryRow[];
  onChange: () => Promise<void>;
}) {
  const [url, setUrl] = useState("");
  const [asDocument, setAsDocument] = useState(false);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = async () => {
    if (!url.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const youtubeMatch = url.match(YOUTUBE_RE);
      if (youtubeMatch && !asDocument) {
        await createGalleryItem({
          data: {
            work_item_id: workItemId,
            kind: "video",
            src: null,
            youtube_id: youtubeMatch[1],
            title: title || null,
            sort_order: items.length,
          },
        });
      } else if (asDocument) {
        await createGalleryItem({
          data: {
            work_item_id: workItemId,
            kind: "document",
            src: url,
            youtube_id: null,
            title: title || "Document",
            sort_order: items.length,
          },
        });
      } else {
        await createGalleryItem({
          data: {
            work_item_id: workItemId,
            kind: "image",
            src: url,
            youtube_id: null,
            title: null,
            sort_order: items.length,
          },
        });
      }
      setUrl("");
      setTitle("");
      await onChange();
    } finally {
      setBusy(false);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const result = await uploadFile({ data: form });
      await createGalleryItem({
        data: {
          work_item_id: workItemId,
          kind: "image",
          src: result.url,
          youtube_id: null,
          title: title || null,
          sort_order: items.length,
        },
      });
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async (id: number) => {
    setBusy(true);
    try {
      await deleteGalleryItem({ data: { id } });
      await onChange();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border-border mt-4 border-t pt-4">
      <p className="text-subtle text-xs tracking-wide uppercase">Gallery</p>
      <div className="mt-2 flex flex-col gap-2">
        {items.map((g) => (
          <div key={g.id} className="border-border flex items-center justify-between gap-3 rounded-md border px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              {g.kind === "video" ? (
                <Youtube className="text-subtle size-4 shrink-0" />
              ) : g.kind === "document" ? (
                <FileText className="text-subtle size-4 shrink-0" />
              ) : (
                <img src={g.src ?? undefined} alt="" className="size-8 shrink-0 rounded object-cover" />
              )}
              <span className="truncate text-sm">
                {g.kind === "video" ? g.title || `YouTube: ${g.youtube_id}` : g.title || g.src}
              </span>
            </div>
            <button type="button" onClick={() => remove(g.id)} disabled={busy} className="text-subtle hover:text-danger shrink-0">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        {items.length === 0 ? <p className="text-subtle text-sm">No gallery items yet.</p> : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste an image URL, a YouTube link, or a document URL"
          className="h-9 min-w-0 flex-1 rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="h-9 w-40 rounded-md border-0 bg-bg-subtle px-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <label className="flex items-center gap-1.5 text-xs text-muted">
          <input type="checkbox" checked={asDocument} onChange={(e) => setAsDocument(e.target.checked)} />
          Document
        </label>
        <button
          type="button"
          onClick={add}
          disabled={busy || !url.trim()}
          className="border-border h-9 rounded-md border px-3 text-xs text-muted hover:text-fg disabled:opacity-50"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="border-border flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs text-muted hover:text-fg disabled:opacity-50"
        >
          <Upload className="size-3.5" />
          Upload image
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      </div>
      {error ? <p className="text-danger mt-1.5 text-xs">{error}</p> : null}
      <p className="text-subtle mt-2 text-xs">
        YouTube links (youtube.com or youtu.be) are detected automatically and rendered as a click-to-play video.
      </p>
    </div>
  );
}
