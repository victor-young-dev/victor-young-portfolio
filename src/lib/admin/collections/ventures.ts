import { createServerFn } from "@tanstack/react-start";
import { deleteGeneric, insertGeneric, listGeneric, updateGeneric } from "@/lib/admin/sql-helpers";

type VentureInput = {
  slug: string;
  title: string;
  year: string;
  role: string;
  image: string;
  copy: string;
  href: string | null;
  sort_order: number;
};

export const listVentures = createServerFn({ method: "GET" }).handler(() => listGeneric("ventures"));

export const createVenture = createServerFn({ method: "POST" })
  .validator((data: VentureInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    return insertGeneric("ventures", data);
  });

export const updateVenture = createServerFn({ method: "POST" })
  .validator((data: { id: number } & VentureInput) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    const { id, ...rest } = data;
    return updateGeneric("ventures", id, rest);
  });

export const deleteVenture = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await (await import("@/lib/admin/auth.server")).requireAdmin();
    await deleteGeneric("ventures", data.id);
  });
