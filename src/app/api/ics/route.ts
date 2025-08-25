import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "MRZ Event";
  const date = searchParams.get("date") || new Date().toISOString().slice(0,10);
  const desc = searchParams.get("desc") || "MRZ Gang Event";
  const dt = date.replace(/-/g, "") + "T120000Z"; // noon UTC

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MRZ Gang//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@mrzgang`,
    `DTSTAMP:${dt}`,
    `DTSTART:${dt}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\\r\\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"mrz-${Date.now()}.ics\"`
    }
  });
}
