import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  contact: z.string(),
  company: z.string().optional(),
  role: z.string(),
  collabType: z.string(),
  budget: z.string().optional(),
  city: z.string().optional(),
  date: z.string().optional(),
  links: z.string().optional(),
  message: z.string(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Honeypot: if filled, treat as spam
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    // TODO: Send to your destination (email, Notion, Slack, DB, etc.)
    // Example: console.log or forward to an email service
    console.log("Collab request:", data);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Invalid" }, { status: 400 });
  }
}
