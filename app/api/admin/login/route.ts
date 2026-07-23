import { NextResponse } from "next/server";
import { cookieName, createAdminSession } from "@/lib/admin-session";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "Add ADMIN_PASSWORD to .env.local first." }, { status: 503 });
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, createAdminSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 14, path: "/" });
  return response;
}
