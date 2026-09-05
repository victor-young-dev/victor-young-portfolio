import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type CapabilityInput = { title: string; items: string[]; sort_order: number };

export const listCapabilities = createServerFn({ method: "GET" }).handler(() => listGeneric("capabilities"));

export const createCapability = createServerFn({ method: "POST" })
  .validator((data: CapabilityInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("capabilities", data, ["items"]);
  });

export const updateCapability = createServerFn({ method: "POST" })
  .validator((data: { id: number } & CapabilityInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("capabilities", id, rest, ["items"]);
  });

export const deleteCapability = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("capabilities", data.id);
  });
