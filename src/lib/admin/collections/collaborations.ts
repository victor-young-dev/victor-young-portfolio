import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type CollaborationInput = { title: string; role: string; copy: string; sort_order: number };

export const listCollaborations = createServerFn({ method: "GET" }).handler(() => listGeneric("collaborations"));

export const createCollaboration = createServerFn({ method: "POST" })
  .validator((data: CollaborationInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("collaborations", data);
  });

export const updateCollaboration = createServerFn({ method: "POST" })
  .validator((data: { id: number } & CollaborationInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("collaborations", id, rest);
  });

export const deleteCollaboration = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("collaborations", data.id);
  });
