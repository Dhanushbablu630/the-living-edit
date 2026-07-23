import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

const fields = ["name", "phone", "email", "city", "property", "budget", "timeline", "message"] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lead = Object.fromEntries(fields.map((field) => [field, String(body[field] ?? "").trim()]));

    if (!lead.name || !lead.phone || !lead.email || !lead.city || !lead.property || !lead.budget || !lead.timeline) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const { error } = await createSupabaseAdminClient().from("leads").insert(lead);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote submission failed:", error);
    return NextResponse.json({ error: "We could not save your enquiry. Please call us instead." }, { status: 500 });
  }
}
