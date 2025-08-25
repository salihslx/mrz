"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Youtube,
  Instagram,
  Twitch,
  Facebook,
  Twitter,
  Music4 as Tiktok,
  CalendarCheck2,
  PlayCircle,
  Sparkles,
} from "lucide-react";

const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "";

const INSTAGRAM_URLS: string[] = [
  "https://www.instagram.com/p/Cx-Fake123/",
  "https://www.instagram.com/reel/Cy-Fake456/",
  "https://www.instagram.com/p/Cz-Fake789/",
];

const UPCOMING = [
  { city: "Calicut", date: "2025-09-14", detail: "Bamboo Boys collab & fan meetup" },
  { city: "Thalassery", date: "2025-10-05", detail: "Store launch & live vlog" },
  { city: "Kochi", date: "2025-10-26", detail: "Gaming arena takeover" },
];

function cn(...cls: (string | false | null | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export default function Page() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!channelId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/youtube?channelId=${channelId}&maxResults=8`, { cache: "no-store" });
        if (!res.ok) throw new Error("YouTube RSS error");
        const data = await res.json();
        if (!cancelled) setVideos(data.items || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load videos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!INSTAGRAM_URLS.length) return;
    const scriptId = "instagram-embed-script";
    if (document.getElementById(scriptId)) {
      // @ts-ignore
      window?.instgrm?.Embeds?.process?.();
      return;
    }
    const s = document.createElement("script");
    s.id = scriptId;
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
    s.onload = () => {
      // @ts-ignore
      window?.instgrm?.Embeds?.process?.();
    };
  }, []);

  const SocialButton = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/20 hover:bg-white/10 transition"
    >
      <Icon className="size-4" /> {label}
    </a>
  );

  const shimmer = "bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-[shimmer_1.5s_infinite]";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b10] to-black text-white">
      <Header />

      {/* Hero / Live */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <Sparkles className="size-4" />
            MRZ Gang
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Live & VOD</h1>
          <p className="mt-2 text-white/70 max-w-prose">
            Catch the latest streams, IRL chaos, and full replays — all in one hub.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SocialButton href="https://www.youtube.com/@" icon={Youtube} label="YouTube" />
            <SocialButton href="https://www.instagram.com/" icon={Instagram} label="Instagram" />
            <SocialButton href="https://www.twitch.tv/" icon={Twitch} label="Twitch" />
            <SocialButton href="https://www.facebook.com/" icon={Facebook} label="Facebook" />
            <SocialButton href="https://x.com/" icon={Twitter} label="X (Twitter)" />
            <SocialButton href="https://www.tiktok.com/@" icon={Tiktok} label="TikTok" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl overflow-hidden border border-white/10 aspect-video shadow-2xl"
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/live_stream?channel=${channelId || "UCxxxxxxxxxxxxxxxx"}`}
            title="MRZ Gang Live"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </section>

      {/* VOD / Recent Uploads */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-black">Recent Uploads</h2>
          <a
            href={`https://www.youtube.com/channel/${channelId}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline hover:no-underline"
          >
            View channel
          </a>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/10 overflow-hidden">
                <div className={cn("aspect-video", shimmer)} />
                <div className="p-3 space-y-2">
                  <div className={cn("h-4 w-3/4 rounded", shimmer)} />
                  <div className={cn("h-3 w-1/2 rounded", shimmer)} />
                </div>
              </div>
            ))}

          {!loading && videos.length > 0 &&
            videos.map((v) => (
              <motion.a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 overflow-hidden hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-video">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                  <PlayCircle className="absolute bottom-3 right-3 size-6 opacity-80" />
                </div>
                <div className="p-3">
                  <div className="font-semibold line-clamp-2">{v.title}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {new Date(v.publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.a>
            ))}

          {!loading && !videos.length && (
            <div className="rounded-2xl border border-white/10 p-6 text-white/70">
              <div className="font-semibold">No recent uploads found</div>
              <div className="text-sm mt-1">
                Ensure <code className="px-1 py-0.5 bg-white/10 rounded">NEXT_PUBLIC_YOUTUBE_CHANNEL_ID</code> is set.
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-500/30 p-4 text-red-300">
              Failed to load videos: {error}
            </div>
          )}
        </div>
      </section>

      {/* Instagram Embed Strip 
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Instagram className="size-5" />
          <h2 className="text-2xl md:text-3xl font-black">Instagram Highlights</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {INSTAGRAM_URLS.map((url, i) => (
            <motion.div
              key={url + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <blockquote
                  className="instagram-media w-full h-full"
                  data-instgrm-permalink={url}
                  data-instgrm-captioned
                  data-instgrm-version="14"
                  style={{ background: "#000", margin: 0, width: "100%", minWidth: 0 }}
                />
              </div>
              <div className="p-4 text-center text-white/80 text-sm bg-black/30">
                Featured Post {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>*/}

      {/* Upcoming IRL */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center gap-2">
          <CalendarCheck2 className="size-5" />
          <h2 className="text-2xl md:text-3xl font-black">Upcoming IRL</h2>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {UPCOMING.map((e) => (
            <motion.div
              key={e.city}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 p-5 bg-white/5 hover:bg-white/10 transition"
            >
              <div className="text-sm text-white/60">{new Date(e.date).toDateString()}</div>
              <div className="mt-1 text-xl font-extrabold">{e.city}</div>
              <div className="text-white/70">{e.detail}</div>
              <a
                className="mt-3 inline-flex items-center gap-2 underline hover:no-underline"
                href={`/api/ics?title=${encodeURIComponent("MRZ " + e.city)}&date=${encodeURIComponent(
                  e.date
                )}&desc=${encodeURIComponent(e.detail)}`}
              >
                <CalendarCheck2 className="size-4" /> Add to Calendar
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -468px 0 }
          100% { background-position: 468px 0 }
        }
      `}</style>
    </div>
  );
}
