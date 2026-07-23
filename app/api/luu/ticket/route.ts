import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

type Ticket = { name?: string; phone?: string; email?: string; city?: string; projectType?: string; bedrooms?: string; style?: string; budget?: string; timeline?: string; inspiration?: string; services?: string[]; conversation?: unknown[] };

export async function POST(request: Request) {
  try {
    const ticket = await request.json() as Ticket;
    if (!ticket.name || !ticket.phone || !ticket.email) return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
    const summary = [ticket.projectType, ticket.bedrooms, ticket.city, ticket.style, ticket.budget, ticket.timeline, ticket.inspiration].filter(Boolean).join(" · ");
    const { error } = await createSupabaseAdminClient().from("client_tickets").insert({ name: ticket.name, phone: ticket.phone, email: ticket.email, city: ticket.city ?? null, project_type: [ticket.projectType, ticket.bedrooms].filter(Boolean).join(" · ") || null, style: ticket.style ?? null, budget: ticket.budget ?? null, timeline: ticket.timeline ?? null, services_requested: ticket.services ?? [], conversation_summary: summary || "Luu consultation", conversation: ticket.conversation ?? [] });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Luu ticket failed:", error);
    return NextResponse.json({ error: "We could not save the consultation just yet." }, { status: 500 });
  }
}
