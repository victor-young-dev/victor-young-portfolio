import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type ExperienceInput = { title: string; org: string; dates: string; copy: string; sort_order: number };

export const listExperience = createServerFn({ method: "GET" }).handler(() => listGeneric("experience"));

export const createExperience = createServerFn({ method: "POST" })
  .validator((data: ExperienceInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("experience", data);
  });

export const updateExperience = createServerFn({ method: "POST" })
  .validator((data: { id: number } & ExperienceInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("experience", id, rest);
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("experience", data.id);
  });
