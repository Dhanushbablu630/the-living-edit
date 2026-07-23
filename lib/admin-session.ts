import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "living_edit_admin";

function signature(payload: string) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSession() {
  const payload = String(Date.now() + 1000 * 60 * 60 * 24 * 14);
  return `${payload}.${signature(payload)}`;
}

export function validAdminSession(value?: string) {
  if (!value || !process.env.ADMIN_PASSWORD) return false;
  const [payload, received] = value.split(".");
  if (!payload || !received || Number(payload) < Date.now()) return false;
  const expected = signature(payload);
  return received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

export { cookieName };
