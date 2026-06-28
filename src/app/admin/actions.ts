"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  clearAdminCookieOptions,
  createAdminSessionToken,
  verifyAccessCode,
} from "@/lib/admin-auth";

export async function adminLogin(formData: FormData) {
  const code = String(formData.get("code") ?? "");

  if (!verifyAccessCode(code)) {
    redirect("/admin?error=auth");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions());
  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "", clearAdminCookieOptions());
  redirect("/admin");
}
