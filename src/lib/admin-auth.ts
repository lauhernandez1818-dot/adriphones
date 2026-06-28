import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "adrii_admin_session";

export function getAdminAccessCode(): string {
  return process.env.ADMIN_ACCESS_CODE ?? "ADRII2026";
}

export function getAdminSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "adriiphones-demo-v1";
  return createHash("sha256")
    .update(`${secret}:${getAdminAccessCode()}`)
    .digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === getAdminSessionToken();
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  };
}
