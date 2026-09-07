import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadFile } from "@/lib/admin/upload";
import { inputClass } from "@/components/admin/admin-ui";

/** Paste a URL, or upload a file straight from disk — either lands in the same field. */
export function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = () => inputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const result = await uploadFile({ data: form });
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-1.5">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL, or upload"
          className={`${inputClass} mt-0`}
        />
        <button
          type="button"
          onClick={pickFile}
          disabled={busy}
          className="border-border bg-bg-elevated flex h-10 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-xs text-muted shadow-[var(--shadow-border)] transition-colors hover:text-fg disabled:opacity-50"
        >
          <Upload className="size-3.5" />
          {busy ? "Uploading…" : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      </div>
      {error ? <p className="text-danger mt-1.5 text-xs">{error}</p> : null}
      {value ? (
        <img
          src={value}
          alt=""
          className="mt-3 h-24 w-40 rounded-lg bg-bg-subtle object-cover shadow-[var(--shadow-border)]"
        />
      ) : null}
    </div>
  );
}
