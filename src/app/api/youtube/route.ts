// app/api/youtube/route.ts
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");
    const max = Number(searchParams.get("maxResults") || 8);
    if (!channelId) {
      return NextResponse.json({ error: "Missing channelId" }, { status: 400 });
    }

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(
      channelId
    )}`;

    const res = await fetch(feedUrl, {
      // cache ~5 minutes; adjust as you like
      next: { revalidate: 300 },
      headers: { "user-agent": "Mozilla/5.0" }, // helps avoid occasional 403s
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Failed to fetch YouTube RSS", detail: text },
        { status: res.status }
      );
    }

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      // keep tag names as-is (yt:, media:) so we can read them
      removeNSPrefix: false,
    });
    const json = parser.parse(xml);

    // RSS shape: feed.entry[]; handle single or missing entries
    const entries = Array.isArray(json?.feed?.entry)
      ? json.feed.entry
      : json?.feed?.entry
      ? [json.feed.entry]
      : [];

    // Map entries into a compact list for the client
    const items = entries.slice(0, max).map((e: any) => {
      const vid = e["yt:videoId"];
      const title = e.title;
      const publishedAt = e.published;
      // media:group.media:thumbnail can be array or object
      const mediaGroup = e["media:group"] || {};
      const thumbRaw = mediaGroup["media:thumbnail"];
      const thumbUrl = Array.isArray(thumbRaw) ? thumbRaw[0]?.url : thumbRaw?.url;

      return {
        id: vid,
        title,
        publishedAt,
        thumbnail: thumbUrl || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${vid}`,
      };
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
