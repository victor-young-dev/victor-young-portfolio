import { createServerFn } from "@tanstack/react-start";

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { createAdminSession, verifyPassword } = await import("./auth.server");
    if (!verifyPassword(data.password)) {
      return { ok: false as const };
    }
    await createAdminSession();
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearAdminSession } = await import("./auth.server");
  clearAdminSession();
});
