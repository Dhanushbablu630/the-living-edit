import OpenAI from "openai";
import { NextResponse } from "next/server";

function studioGuideReply(message: string) {
  const prompt = message.toLowerCase();
  if (/hello|hi\b|hey/.test(prompt)) return "Hello — I’m Luu. The Living Edit creates considered residential and commercial interiors, from the first concept to the final visualisation. How can I help?";
  if (/bhk|home|apartment|villa/.test(prompt)) return "We can shape a 2, 3 or 4 BHK home around your lifestyle, layout and investment level. Start a project whenever you are ready and the studio will arrange a consultation.";
  if (/service|what.*do|offer/.test(prompt)) return "Our studio offers residential interiors, commercial design, 2D planning, 3D visuals and modeling, AutoCAD, Revit, SketchUp and walkthrough renders.";
  if (/price|budget|cost/.test(prompt)) return "Investment depends on the property size, scope and finishes. Share your details through Start a project and the studio can prepare a thoughtful estimate.";
  return "The Living Edit can help with interiors, planning, visualisation and design documentation. Choose Start a project to connect with the studio directly.";
}

export async function POST(request: Request) {
  let body: { mode?: string; message?: string } = {};
  try {
    body = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI is not configured.");

    const client = new OpenAI({ apiKey });
    const isChat = body.mode === "chat";
    const response = await client.responses.create({ model: "gpt-5", store: false, instructions: isChat ? "You are Luu, the warm, concise concierge for The Living Edit, a premium interior design studio. Answer the visitor's question in no more than 70 words. Be specific about services and process. Do not use markdown or ask for a long questionnaire. Invite them to start a consultation only when it naturally helps." : "You are Luu, a warm and discerning interior design consultant for The Living Edit. Turn the client details into a polished designer brief in 80 words or fewer. Mention the project type, city, budget, timing, desired mood, and likely priorities. Use plain text, no heading, no markdown, and do not invent details.", input: isChat ? body.message : JSON.stringify(body) });
    return NextResponse.json(isChat ? { reply: response.output_text } : { summary: response.output_text });
  } catch (error) {
    console.error("Luu request failed:", error);
    if (body.mode === "chat") {
      return NextResponse.json({ reply: studioGuideReply(body.message ?? ""), fallback: true });
    }
    return NextResponse.json({ error: "Luu could not prepare the brief right now." }, { status: 500 });
  }
}
