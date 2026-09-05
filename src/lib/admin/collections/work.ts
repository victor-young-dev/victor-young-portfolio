import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { deleteGeneric, insertGeneric, updateGeneric, type JsonRow } from "@/lib/admin/sql-helpers";

type WorkItemInput = {
  kind: "product" | "client";
  slug: string;
  title: string;
  year: string;
  status: string;
  arm: string;
  summary: string;
  body: string;
  image: string | null;
  tags: string[];
  href: string | null;
  sort_order: number;
};

export const listWorkItems = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const [items, galleries] = await Promise.all([
    sql.query<JsonRow>("select * from work_items order by kind, sort_order, id"),
    sql.query<JsonRow>("select * from gallery_items order by sort_order, id"),
  ]);
  return { items, galleries };
});

export const createWorkItem = createServerFn({ method: "POST" })
  .validator((data: WorkItemInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("work_items", data, ["tags"]);
  });

export const updateWorkItem = createServerFn({ method: "POST" })
  .validator((data: { id: number } & WorkItemInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("work_items", id, rest, ["tags"]);
  });

export const deleteWorkItem = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("work_items", data.id);
  });

type GalleryItemInput = {
  work_item_id: number;
  kind: "image" | "video" | "document";
  src: string | null;
  youtube_id: string | null;
  title: string | null;
  sort_order: number;
};

export const createGalleryItem = createServerFn({ method: "POST" })
  .validator((data: GalleryItemInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("gallery_items", data);
  });

export const updateGalleryItem = createServerFn({ method: "POST" })
  .validator((data: { id: number } & GalleryItemInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("gallery_items", id, rest);
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("gallery_items", data.id);
  });
