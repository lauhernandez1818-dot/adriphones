import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "adrii_admin_session";

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "adriiphones-demo-v1-change-me";
}

export function getAdminAccessCode(): string {
  return process.env.ADMIN_ACCESS_CODE ?? "ADRII2026";
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyAccessCode(input: string): boolean {
  const code = input.trim();
  const expected = getAdminAccessCode();
  if (!code || !expected) return false;
  return safeEqual(code, expected);
}

export function createAdminSessionToken(): string {
  const nonce = randomBytes(16).toString("hex");
  const exp = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = `${nonce}.${exp}`;
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [nonce, exp, sig] = parts;
  if (!nonce || !exp || !sig) return false;

  const payload = `${nonce}.${exp}`;
  const expectedSig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");

  if (!safeEqual(sig, expectedSig)) return false;

  const expiresAt = Number(exp);
  if (!Number.isFinite(expiresAt) || Date.now() >= expiresAt) return false;

  return true;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function clearAdminCookieOptions() {
  return {
    ...adminCookieOptions(),
    maxAge: 0,
  };
}
