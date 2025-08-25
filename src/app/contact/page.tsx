"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Handshake, MailCheck, CalendarDays, ShieldCheck } from "lucide-react";

// =============================
// Validation
// =============================
const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(3, "Email or Instagram required"), // email or IG
  company: z.string().optional(),
  role: z.string().min(2, "Tell us your role"),
  collabType: z.enum([
    "Brand Integration",
    "Sponsorship",
    "Event/IRL",
    "Giveaway/Contest",
    "Shoutout/Cross-post",
    "Other",
  ]),
  budget: z.enum(["< ₹25k", "₹25k–₹1L", "₹1L–₹5L", "> ₹5L"]).optional(),
  city: z.string().optional(),
  date: z.string().optional(), // preferred date
  links: z.string().optional(),
  message: z.string().min(5, "A short message helps"),
  // Honeypot
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      reset();
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b10] to-black text-white">
      <Header />

      <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Meta + Message */}
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2 text-sm text-white/60">
              <Sparkles className="size-4" /> MRZ Gang
            </div>
            <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Business Collaborations</h1>
            <p className="mt-3 text-white/70 max-w-prose">
              We love partnering with brands, events, and creators. Share your idea and we’ll get back to you.
            </p>

            {/* Not hiring notice */}
            <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 opacity-80" />
                <div>
                  <div className="font-semibold">We’re not hiring right now</div>
                  <p className="text-sm text-white/70 mt-0.5">
                    This form is for <strong>collabs only</strong> (brand integrations, sponsorships, events, etc.).
                  </p>
                </div>
              </div>
            </div>

            {/* Availability blurb */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <CalendarDays className="size-4" />
              <span>
                Availability opens weekly. Share your preferred date and city; our team will confirm slots.
              </span>
            </div>

            {/* Mini stats / trust strip */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { k: "Avg. Views", v: "100k+" },
                { k: "Regions", v: "Kerala + India" },
                { k: "Formats", v: "Live • VOD • Reels" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xl font-extrabold">{s.v}</div>
                  <div className="text-xs text-white/60">{s.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Form Card */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-2 text-white/80">
            <Handshake className="size-5" />
            <h2 className="text-xl font-bold">Collab Request</h2>
          </div>

          <div className="mt-6 grid gap-3">
            <input
              placeholder="Your name"
              className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}

            <input
              placeholder="Email or Instagram (required)"
              className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
              {...register("contact")}
            />
            {errors.contact && <p className="text-xs text-red-400">{errors.contact.message}</p>}

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                placeholder="Company / Brand (optional)"
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("company")}
              />
              <input
                placeholder="Your role (creator/manager/brand)"
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("role")}
              />
            </div>
            {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}

            <div className="grid sm:grid-cols-3 gap-3">
              <select
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("collabType")}
                defaultValue="Brand Integration"
              >
                <option>Brand Integration</option>
                <option>Sponsorship</option>
                <option>Event/IRL</option>
                <option>Giveaway/Contest</option>
                <option>Shoutout/Cross-post</option>
                <option>Other</option>
              </select>

              <select
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("budget")}
                defaultValue="₹25k–₹1L"
              >
                <option>&lt; ₹25k</option>
                <option>₹25k–₹1L</option>
                <option>₹1L–₹5L</option>
                <option>&gt; ₹5L</option>
              </select>

              <input
                type="text"
                placeholder="City (optional)"
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("city")}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="date"
                placeholder="Preferred date"
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("date")}
              />
              <input
                placeholder="Links (deck, portfolio, reels)"
                className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
                {...register("links")}
              />
            </div>

            <textarea
              placeholder="Tell us about the collab idea (what, when, where)"
              rows={5}
              className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-white/10 outline-none"
              {...register("message")}
            />
            {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}

            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("website")}
            />

            <button
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-400 text-black font-bold disabled:opacity-70"
              disabled={status === "sending"}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <MailCheck className="size-4" /> Sending...
                </>
              ) : (
                <>
                  <Handshake className="size-4" /> Send Collab Request
                </>
              )}
            </button>

            {status === "sent" && (
              <div className="text-green-400 inline-flex items-center gap-2 mt-2">
                <MailCheck className="size-4" /> Thanks! We got your message.
              </div>
            )}
            {status === "error" && (
              <div className="text-red-400">Something went wrong. Try again.</div>
            )}

            <p className="text-xs text-white/50 mt-2 inline-flex items-center gap-2">
              <ShieldCheck className="size-3" /> We’ll only use your details to contact you about this collaboration.
            </p>
          </div>
        </motion.form>
      </section>

      <Footer />
    </div>
  );
}
