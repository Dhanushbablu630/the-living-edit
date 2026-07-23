import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cookieName, validAdminSession } from "@/lib/admin-session";

export async function adminAuthorized() {
  return validAdminSession((await cookies()).get(cookieName)?.value);
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
