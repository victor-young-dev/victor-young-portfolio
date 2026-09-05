import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";

/**
 * Uploads a file and returns its public URL.
 *
 * Production (Vercel): needs `BLOB_READ_WRITE_TOKEN` — create a Blob store in
 * the Vercel dashboard (Storage tab) and it's injected automatically, same as
 * `DATABASE_URL`. Without it, uploads fail with an actionable error rather
 * than silently writing to a filesystem that resets on every request.
 *
 * Local dev: falls back to writing into `public/uploads/`, since the dev
 * server's disk is persistent for the life of the process.
 */
export const uploadFile = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const file = data.get("file");
    if (!(file instanceof File)) {
      throw new Error("No file provided.");
    }
    if (file.size > 15 * 1024 * 1024) {
      throw new Error("File is too large (15MB max).");
    }

    const ext = file.name.includes(".") ? file.name.split(".").pop() : undefined;
    const filename = `${randomUUID()}${ext ? `.${ext}` : ""}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(filename, file, { access: "public" });
      return { url: blob.url };
    }

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      throw new Error(
        "File upload needs Vercel Blob storage enabled for this project (Storage tab → Create Blob store). Paste an image URL instead for now.",
      );
    }

    const { writeFile, mkdir } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(join(uploadsDir, filename), bytes);
    return { url: `/uploads/${filename}` };
  });
