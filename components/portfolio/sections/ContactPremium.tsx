"use client";

import { useState } from "react";
import { CONTACT } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { MagneticLink } from "@/components/portfolio/primitives/MagneticLink";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";

const STATUS = "Accepting select collaborations";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ryankwandev/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/klhong124", icon: Github },
  { label: "Email", href: `mailto:${CONTACT.email}?subject=Frontend%20architecture%20discussion`, icon: Mail },
] as const;

export default function ContactPremiumSection() {
  // const calendly = CONTACT.calendly;
  const [sentHint, setSentHint] = useState(false);

  return (
    <SectionShell
      id="contact"
      label="Let’s orchestrate what's next."
      title="Memorable endings start with decisive CTAs."
      subtitle="Availability, tactile buttons, cinematic motion fades, and deterministic mailto-backed forms—premium without fluff."
      className="pb-36"
    >
      <Reveal>
        <GlassSurface className="overflow-hidden p-0 lg:p-0">
          <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.76fr)]">
            <motion.div className="space-y-8 p-10" layout>
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100/95">
                <Sparkles className="h-4 w-4" aria-hidden />
                {STATUS}
              </div>
              <div>
                <p className="text-sm text-slate-400">{CONTACT.availability}</p>
              </div>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = String(fd.get("name") ?? "").trim();
                  const topic = String(fd.get("topic") ?? "").trim();
                  const message = String(fd.get("message") ?? "").trim();
                  const lines = [
                    "Hi Ryan,",
                    "",
                    name ? `From: ${name}` : "",
                    topic ? `Topic / company: ${topic}` : "",
                    "",
                    message || "I’d love to connect about frontend architecture and systems work.",
                  ].filter((line) => line.length > 0);
                  const body = encodeURIComponent(lines.join("\n"));
                  window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
                    topic || "Frontend architecture inquiry",
                  )}&body=${body}`;
                  setSentHint(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.label layout className="space-y-2 text-sm text-slate-300">
                    Name
                    <input
                      name="name"
                      className="w-full rounded-2xl border border-white/14 bg-black/72 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-indigo-300/55 focus:ring-indigo-400/50"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                    />
                  </motion.label>
                  <motion.label layout className="space-y-2 text-sm text-slate-300">
                    Topic / Company
                    <input
                      name="topic"
                      className="w-full rounded-2xl border border-white/14 bg-black/72 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-indigo-300/55 focus:ring-indigo-400/50"
                      placeholder="Design system reinvention"
                      autoComplete="organization"
                    />
                  </motion.label>
                </div>
                <motion.label layout className="block space-y-2 text-sm text-slate-300">
                  Context
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full resize-y rounded-3xl border border-white/14 bg-black/72 px-4 py-3 text-white outline-none ring-1 ring-transparent transition focus:border-indigo-300/55 focus:ring-indigo-400/50"
                    placeholder="Share goals, timelines, stacks, appetite for motion + AI workflows."
                  />
                </motion.label>
                <motion.button
                  layout
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-600 px-5 py-3 text-[15px] font-semibold text-white shadow-[0_25px_80px_-52px_rgba(99,102,241,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200/85"
                >
                  Send brief via mail client
                </motion.button>
                {sentHint && (
                  <p className="text-center text-[13px] text-slate-400" aria-live="polite">
                    If your mail client did not launch, tap email in the sidebar.
                  </p>
                )}
              </form>
            </motion.div>

            <div className="space-y-8 border-l border-white/14 bg-gradient-to-b from-white/[0.08] via-transparent to-black/55 p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Magnetic shortcuts</p>
                <div className="mt-6 flex flex-col gap-4">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <MagneticLink
                        key={s.label}
                        href={s.href}
                        external={!s.href.startsWith("mailto")}
                        className="justify-start gap-3 !px-4 !py-4"
                      >
                        <Icon className="h-5 w-5 text-indigo-100" aria-hidden />
                        {s.label}
                      </MagneticLink>
                    );
                  })}
                </div>
              </div>

              {/* Calendly — uncomment when `NEXT_PUBLIC_CALENDLY_URL` is set in `.env.local`
              {calendly ? (
                <MagneticLink href={calendly} external className="w-full justify-between">
                  Schedule via Calendly
                </MagneticLink>
              ) : (
                <GlassSurface glow={false} className="p-5 text-[13px] leading-relaxed text-slate-400">
                  Hook up <code className="text-indigo-200">NEXT_PUBLIC_CALENDLY_URL</code> inside{" "}
                  <span className="text-slate-200">`.env.local`</span> to light up the Calendly CTA.
                </GlassSurface>
              )}
              */}

              <motion.div
                aria-hidden
                className="h-32 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_65%)]"
                animate={{ opacity: [0.8, 1, 0.85] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </GlassSurface>
      </Reveal>
    </SectionShell>
  );
}
