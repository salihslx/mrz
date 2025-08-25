// =============================
// app/members/page.tsx (Enhanced, flexible images)
// =============================
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Youtube, Instagram, Twitter, BadgeCheck, Gamepad2 } from "lucide-react";

// If you later want the 3D mascot back, uncomment these lines and the JSX section
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, OrbitControls } from "@react-three/drei";
// import { useRef } from "react";

// --- Members data
const members = [
  { name: "Mrz Thoppi (Nihad)", role: "Lead Creator", img: "/images/nihad.png", socials: { yt: "https://www.youtube.com/@mrzthoppi", ig: "https://www.instagram.com/", tw: "https://x.com/" }, featured: true },
  { name: "Mrz Shameer", role: "Streamer", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
  { name: "Mrz Rambo", role: "Gamer", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
  { name: "Mrz Jasi", role: "Content", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
  { name: "Mrz Mammu", role: "IRL Crew", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
  { name: "Mrz Adil", role: "Editor", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
  { name: "Mrz Vakeel", role: "Manager", img: "/images/", socials: { yt: "#", ig: "#", tw: "#" } },
];

// Small helper: consistent, flexible image that fits any size
function FlexibleImage({ src, alt, ratio = "4/3", fit = "cover" }: { src: string; alt: string; ratio?: `${number}/${number}` | "square" | "video"; fit?: "cover" | "contain" }) {
  const aspectClass = ratio === "square" ? "aspect-square" : ratio === "video" ? "aspect-video" : `aspect-[${ratio}]`;
  return (
    <div className={`${aspectClass} w-full relative overflow-hidden bg-white/5`}> {/* bg as subtle placeholder */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className={`rounded-none object-${fit} object-center`} // switch to object-contain to avoid any crop
        priority={false}
      />
    </div>
  );
}

function MemberCard({ p }: { p: (typeof members)[number] }) {
  return (
    <article className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
      {/* Choose your preferred ratio: "4/3" (default), "square", or "video" */}
      <FlexibleImage src={p.img} alt={p.name} ratio="4/3" fit="cover" />

      <div className="p-5">
        <div className="font-extrabold">{p.name}</div>
        <div className="text-sm text-white/70">{p.role}</div>
        <div className="mt-4 flex gap-2 text-sm">
          <a
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md ring-1 ring-white/15 hover:bg-white/10"
            href={p.socials.yt}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} on YouTube`}
          >
            <Youtube className="size-3" /> YouTube
          </a>
          <a
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md ring-1 ring-white/15 hover:bg-white/10"
            href={p.socials.ig}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} on Instagram`}
          >
            <Instagram className="size-3" /> IG
          </a>
          <a
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md ring-1 ring-white/15 hover:bg-white/10"
            href={p.socials.tw}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} on X`}
          >
            <Twitter className="size-3" /> X
          </a>
        </div>
      </div>
    </article>
  );
}

export default function MembersPage() {
  const leaders = members.filter((m) => m.featured);
  const rest = members.filter((m) => !m.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* HERO with flexible background image + overlay + ring */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.18),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(255,0,179,0.14),transparent_40%)]" />
        <div className="container py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-black">Core Crew</h1>
            <p className="mt-3 text-white/70">The creators, streamers, and IRL squad behind MRZ Gang.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10"><BadgeCheck className="size-4"/> Verified creators</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10"><Gamepad2 className="size-4"/> Live + IRL</span>
            </div>
          </div>

          {/* Flexible hero image card */}
          <div className="h-[360px] rounded-3xl border border-white/10 relative overflow-hidden">
            <Image
              src="/images/mrz.jpg"
              alt="MRZ montage"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover md:object-cover rounded-3xl md:scale-100 scale-90"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-black/20 rounded-3xl" />
            {/* Ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-10">
        {leaders.map((n) => (
          <article key={n.name} className="grid md:grid-cols-[1.1fr,1.6fr] gap-6 items-stretch rounded-3xl border border-white/10 bg-white/5 p-6">
            {/* Left: flexible portrait/cover */}
            <FlexibleImage src={n.img} alt={n.name} ratio="video" fit="cover" />

            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-4xl font-black">{n.name}</h2>
                <span className="text-xs px-2 py-1 rounded-full border border-white/15">{n.role}</span>
              </div>
              <p className="mt-3 text-white/70 max-w-prose">
                Nihad (aka <b>Mrz Thoppi</b>) is the most prominent face of MRZ Gang — a creator known for long-form live streams,
                gaming collabs, IRL events across Kerala, and high-energy vlogs. The team began as a gaming squad and grew into a
                full-on content collective with multiple creators and editors.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold" href={n.socials.yt} target="_blank" rel="noreferrer" aria-label="YouTube">
                  <Youtube className="size-4"/> YouTube
                </a>
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl ring-1 ring-white/20 hover:bg-white/10" href={n.socials.ig} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="size-4"/> Instagram
                </a>
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-xl ring-1 ring-white/20 hover:bg-white/10" href={n.socials.tw} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                  <Twitter className="size-4"/> X
                </a>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 max-w-md text-center">
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xl font-extrabold">Live</div>
                  <div className="text-xs text-white/60">Streaming weekly</div>
                </div>
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xl font-extrabold">IRL</div>
                  <div className="text-xs text-white/60">Events & meets</div>
                </div>
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xl font-extrabold">Team</div>
                  <div className="text-xs text-white/60">Editors & crew</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ALL MEMBERS GRID */}
      <section className="container pb-16">
        <h3 className="text-xl md:text-2xl font-black">All Members</h3>
        <p className="text-white/60 text-sm mt-1">Find their roles and socials below.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <MemberCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
