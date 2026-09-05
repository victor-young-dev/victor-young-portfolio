import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type LeadershipInput = {
  slug: string;
  title: string;
  year: string;
  role: string;
  image: string;
  copy: string;
  sort_order: number;
};

export const listLeadership = createServerFn({ method: "GET" }).handler(() => listGeneric("leadership"));

export const createLeadership = createServerFn({ method: "POST" })
  .validator((data: LeadershipInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("leadership", data);
  });

export const updateLeadership = createServerFn({ method: "POST" })
  .validator((data: { id: number } & LeadershipInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("leadership", id, rest);
  });

export const deleteLeadership = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("leadership", data.id);
  });
