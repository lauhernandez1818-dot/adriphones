"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  getAdminAccessCode,
  getAdminSessionToken,
} from "@/lib/admin-auth";

export async function adminLogin(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim();

  if (!code || code !== getAdminAccessCode()) {
    redirect("/admin?error=auth");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, getAdminSessionToken(), adminCookieOptions());
  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin");
}
