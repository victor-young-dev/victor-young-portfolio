import { createHash, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { getCookie, setCookie } from "@tanstack/react-start/server";

/**
 * The admin gate — one shared password, not a user-account system. Deliberately
 * separate from `authMiddleware` (`@/lib/auth/middleware`), which is the opt-in
 * Better Auth per-user system this app never turned on.
 */

// SHA-256 of the admin password. Never store the raw password in source.
const PASSWORD_HASH = "e0b8e8d387879a90b70efcc39680e44b63b0ce1ee58823dd993a539b34a48a7d";
// Symmetric signing key for the session cookie — server-only, never sent to the client.
const SESSION_SECRET = new TextEncoder().encode(
  "e21f5c495717afe639f4528a4750f4721776a5d796a826f3eb93d2e6c4765f50",
);

const COOKIE_NAME = "vy_admin_session";
const SESSION_TTL = "7d";

function hashPassword(password: string): Buffer {
  return createHash("sha256").update(password, "utf8").digest();
}

/** Constant-time compare so a wrong guess can't be timed against the real hash. */
export function verifyPassword(password: string): boolean {
  const given = hashPassword(password);
  const expected = Buffer.from(PASSWORD_HASH, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function createAdminSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(SESSION_SECRET);

  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminSession(): void {
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function hasAdminSession(): Promise<boolean> {
  const token = getCookie(COOKIE_NAME);
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET, { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await hasAdminSession())) {
    throw new Error("Unauthorized");
  }
}
