import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type ServiceInput = { title: string; copy: string; items: string[]; sort_order: number };

export const listServices = createServerFn({ method: "GET" }).handler(() => listGeneric("services"));

export const createService = createServerFn({ method: "POST" })
  .validator((data: ServiceInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("services", data, ["items"]);
  });

export const updateService = createServerFn({ method: "POST" })
  .validator((data: { id: number } & ServiceInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("services", id, rest, ["items"]);
  });

export const deleteService = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("services", data.id);
  });
