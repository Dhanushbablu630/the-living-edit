import fs from "node:fs";

const values = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const response = await fetch(`${values.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?select=id&limit=1`, {
  headers: {
    apikey: values.SUPABASE_SECRET_KEY,
    Authorization: `Bearer ${values.SUPABASE_SECRET_KEY}`,
    Prefer: "count=exact",
  },
});

if (!response.ok) throw new Error(`Supabase returned HTTP ${response.status}.`);
const count = response.headers.get("content-range")?.split("/").at(-1) ?? "unknown";
console.log(`Supabase connection verified. Current lead count: ${count}.`);
