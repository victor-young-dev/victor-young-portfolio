import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type StoryStepInput = { step: string; copy: string; sort_order: number };

export const listStorySteps = createServerFn({ method: "GET" }).handler(() => listGeneric("story_steps"));

export const createStoryStep = createServerFn({ method: "POST" })
  .validator((data: StoryStepInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("story_steps", data);
  });

export const updateStoryStep = createServerFn({ method: "POST" })
  .validator((data: { id: number } & StoryStepInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("story_steps", id, rest);
  });

export const deleteStoryStep = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("story_steps", data.id);
  });
