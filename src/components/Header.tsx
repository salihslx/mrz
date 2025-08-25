"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, Briefcase, Menu, X, Youtube } from "lucide-react";

const NAV = [
  { href: "/streams-events", label: "Streams" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-transparent pt-3 px-3">
      {/* Top accent line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="container flex items-center justify-between py-3 rounded-lg lg:rounded-xl border border-white/10 bg-black/50 backdrop-blur shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)]">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          
          <div className="leading-tight">
            <span className="font-black tracking-tight text-xl md:text-2xl text-teal-50">
              MRZ
            </span>
         
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className="relative px-4 py-2 group">
                <span className="relative z-10 text-white/80 group-hover:text-white">{item.label}</span>
                {/* Edge-shaped highlight */}
                {active ? (
                  <motion.span
                    layoutId="edge-pill"
                    className="absolute inset-0"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  >
                    <span
                      className="block h-full w-full"
                      style={{
                        clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 10,
                        backdropFilter: "blur(2px)",
                      }}
                    />
                  </motion.span>
                ) : (
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{
                      clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                    }}
                  />
                )}
              </Link>
            );
          })}

          <span className="w-px h-6 bg-white/10 mx-1" />

          {/* Socials */}
          <a
            href="https://www.youtube.com/@"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="rounded-full p-2 ring-1 ring-white/10 hover:bg-white/10"
          >
            <Youtube className="size-4" />
          </a>
          <a
            href="https://www.instagram.com/mrz_thoppi/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full p-2 ring-1 ring-white/10 hover:bg-white/10"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="mailto:business@mrzgang.com"
            aria-label="Email"
            className="rounded-full p-2 ring-1 ring-white/10 hover:bg-white/10"
          >
            <Mail className="size-4" />
          </a>

          {/* Business Collab CTA */}
          <Link
            href="/contact?type=business"
            className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-cyan-400  text-black font-semibold hover:scale-105 active:scale-100 transition shadow-lg shadow-fuchsia-500/10"
          >
            <Briefcase className="size-4" /> Promotions!
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-xl p-2 ring-1 ring-white/10 hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="md:hidden overflow-hidden border-t border-white/10 bg-black/70"
      >
        <div className="container py-3 grid gap-2">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 ${active ? "bg-white/10" : "ring-1 ring-white/10"}`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 pt-2">
            <a href="https://www.youtube.com/@" target="_blank" rel="noreferrer" className="flex-1 rounded-xl px-3 py-2 ring-1 ring-white/10 text-center">YouTube</a>
            <a href="https://www.instagram.com/mrz_thoppi/" target="_blank" rel="noreferrer" className="flex-1 rounded-xl px-3 py-2 ring-1 ring-white/10 text-center">Instagram</a>
            <a href="mailto:business@mrzgang.com" className="flex-1 rounded-xl px-3 py-2 ring-1 ring-white/10 text-center">Email</a>
          </div>

          <Link
            href="/contact?type=business"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-cyan-400 text-black font-semibold"
          >
            <Briefcase className="size-4" /> Promotions!
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

