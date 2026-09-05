import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type AchievementInput = { title: string; issuer: string; date: string; image: string | null; sort_order: number };

export const listAchievements = createServerFn({ method: "GET" }).handler(() => listGeneric("achievements"));

export const createAchievement = createServerFn({ method: "POST" })
  .validator((data: AchievementInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("achievements", data);
  });

export const updateAchievement = createServerFn({ method: "POST" })
  .validator((data: { id: number } & AchievementInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("achievements", id, rest);
  });

export const deleteAchievement = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("achievements", data.id);
  });
