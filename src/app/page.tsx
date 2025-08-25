"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, PlayCircle, Youtube, Instagram, Twitch, Gamepad2, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero — minimal: heading + image */}
      <section className="container py-14 md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-black text-center"
        >
          MRZ Team
        </motion.h1>

        <div className="mt-8 md:mt-10 relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="/images/mrz.jpg"
            alt="MRZ Team"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Optional quick links / socials */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/streams-events"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-white text-black font-semibold hover:scale-105 transition"
          >
            <PlayCircle className="size-5" />
            Watch Live
          </a>
          <a
            href="/members"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 ring-1 ring-white/20 hover:bg-white/10 transition"
          >
            <Users className="size-5" />
            Meet the Team
          </a>
          <a
            href="https://youtube.com" // replace with real channel
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/20 hover:bg-white/10 transition text-sm"
          >
            <Youtube className="size-4" />
            YouTube
          </a>
          <a
            href="https://instagram.com" // replace with real handle
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/20 hover:bg-white/10 transition text-sm"
          >
            <Instagram className="size-4" />
            Instagram
          </a>
         
        </div>
      </section>

      {/* Events */}
      <section id="events" className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-4xl font-black flex items-center gap-3">
          <Calendar className="size-6" /> Pop-ups & IRL
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { city: "Calicut", date: "Sep 14", detail: "MRZ x Bamboo Boys meetup" },
            { city: "Thalassery", date: "Oct 05", detail: "Store launch + live vlog" },
            { city: "Kochi", date: "Oct 26", detail: "Gaming arena takeover" },
          ].map((e) => (
            <div key={e.city} className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
              <div className="text-sm text-white/60">{e.date}</div>
              <div className="mt-1 text-xl font-extrabold">{e.city}</div>
              <div className="text-white/70">{e.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Promotions (replaces collab/join) */}
      <section id="brand-promotions" className="container pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-500/10 p-8 md:p-12">
          <h3 className="text-2xl md:text-4xl font-black text-center">Brand Promotions</h3>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto text-center">
            Launches, takeovers, and creator-led campaigns tailored for Kerala’s youth audience.
            Product placements, reels/shorts, livestream integrations, store openings, and city pop-ups.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Product Placement", desc: "Integrated in streams, vlogs, and highlights." },
              { title: "Launch Collabs", desc: "Story + reel package with on-ground buzz." },
              { title: "IRL Events", desc: "Meetups and arena takeovers across Kerala." },
              { title: "Deliverables", desc: "Reels, shorts, livestream slots, recap vlogs." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 p-5 bg-black/40">
                <div className="text-lg font-bold">{c.title}</div>
                <div className="mt-1 text-white/70 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/contact#brand"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-white text-black font-bold hover:scale-105 transition"
            >
              <Gamepad2 className="size-5" />
              Promote Your Brand.!
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

