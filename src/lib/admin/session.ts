import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { hasAdminSession } = await import("./auth.server");
  return { ok: await hasAdminSession() };
});

/** Use as a route's `beforeLoad` to gate any admin page behind the session cookie. */
export async function requireAdminOrRedirect() {
  const { ok } = await checkAdminSession();
  if (!ok) throw redirect({ to: "/admin/login" });
}
