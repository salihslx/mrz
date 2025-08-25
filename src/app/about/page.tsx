"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Users2, PlayCircle, Instagram, Youtube, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const stats = [
    { label: "YouTube Followers", value: "1M+", icon: Youtube },
    { label: "Instagram Followers", value: "1M+", icon: Instagram },
    { label: "Discord Community", value: "50k+", icon: Users2 },
    { label: "Streams", value: "500+", icon: PlayCircle },
  ];

  const timeline = [
    {
      year: "2021",
      title: "Solo Grind (Nihad)",
      body:
        "MRZ Nihad starts the channel alone — learning, hustling, and shipping videos with zero backup.",
    },
    {
      year: "2023",
      title: "Founding Crew",
      body:
        "Close friends MRZ Munu and MRZ Shameer step in — the chemistry clicks and the content levels up.",
    },
    {
      year: "2025",
      title: "MRZ Circle Expands",
      body:
        "A wider friend circle forms. Other members join in on shoots and streams as the gang grows.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b10] to-black text-white">
       
     <Header />
      {/* HERO */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <Sparkles className="size-4" /> About MRZ Gang
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">
            High-Energy IRL. Crafted VOD. <span className="text-cyan-400">Team</span> at the center.
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            We’re a group of friends living for entertainment — creating for social media, inviting guests, and bringing
            up young talent. Our goal: to entertain, appreciate, and support while producing funny, viral
            reaction-driven content.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://www.youtube.com/@"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/15 hover:bg-white/10"
            >
              <Youtube className="size-4" /> YouTube
            </Link>
            <Link
              href="https://www.instagram.com/mrz_thoppi/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/15 hover:bg-white/10"
            >
              <Instagram className="size-4" /> Instagram
            </Link>
            <Link
              href="/contact?type=business"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold"
            >
              <Briefcase className="size-4" /> Business Collaboration
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-5 bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-white/5" />
              <div className="flex items-center gap-3">
                <Icon className="size-5" />
                <div className="text-sm text-white/60">{label}</div>
              </div>
              <div className="mt-2 text-3xl font-extrabold">{value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="container mx-auto px-4 pb-8 grid lg:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-black">Our Story</h2>
          <p className="mt-3 text-white/70">
            MRZ Gang is led by <strong>MRZ Nihad</strong>. It started with him, solo — late-night edits, noisy street
            shoots, and a lot of stubborn learning.
          </p>
          <p className="mt-3 text-white/70">
            Along the way, <strong>MRZ Munu</strong> and <strong>MRZ Shameer</strong> became the core crew. By 2025, a
            wider friends circle jumps into streams and IRL shoots while the core keeps the energy tight.
          </p>
        </motion.div>
      </section>

      {/* TEAM + TIMELINE */}
      <section className="container mx-auto px-4 pb-8">
        <h2 className="text-2xl md:text-3xl font-black">Team</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { name: "MRZ Nihad", role: "Leader / Creative Director" },
            { name: "MRZ Munu", role: "On-Cam / Ops" },
            { name: "MRZ Shameer", role: "On-Cam / Community" },
          ].map((m) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl border border-white/10 bg-white/5"
            >
              <div className="text-lg font-bold">{m.name}</div>
              <div className="text-white/60">{m.role}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-black mt-10">Timeline</h2>
        <div className="mt-6 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-6">
            {timeline.map((t) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="pl-10"
              >
                <div className="inline-flex items-center gap-2">
                  <span className="text-sm text-white/60">{t.year}</span>
                  <span className="size-2 rounded-full bg-cyan-400" />
                </div>
                <div className="text-lg font-bold mt-1">{t.title}</div>
                <div className="text-white/70">{t.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-10">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xl md:text-2xl font-black">Let’s build something wild.</div>
            <div className="text-white/70">Brand integration, IRL event, or a long-form doc — we’re game.</div>
          </div>
          <Link
            href="/contact?type=business"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold"
          >
            <Briefcase className="size-4" /> Start a Collaboration
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
