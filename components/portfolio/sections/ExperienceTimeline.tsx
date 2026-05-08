"use client";

import { EXPERIENCE_HIGHLIGHTS } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function ExperienceTimelineSection() {
  const [openId, setOpenId] = useState(EXPERIENCE_HIGHLIGHTS[0]?.id);

  const active = useMemo(
    () => EXPERIENCE_HIGHLIGHTS.find((r) => r.id === openId) ?? EXPERIENCE_HIGHLIGHTS[0],
    [openId],
  );

  return (
    <SectionShell
      id="experience"
      label="Trajectory"
      title="Interactive vertical journeys—engineering impact, not resumes."
      subtitle={
        <>
          Highlights across <strong className="text-slate-200">BuiltByPixel</strong>,
          {" "}<strong className="text-slate-200">Ezekia</strong>,
          {" "}<strong className="text-slate-200">Kubrick Group</strong>, and {" "}
          <strong className="text-slate-200">Goodest Lab</strong> · motion transitions between each
          mandate preserve narrative clarity.
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <GlassSurface className="p-6 lg:p-8">
              <p className="text-[11px] uppercase tracking-[0.32em] text-indigo-200/85">
                Now shipping
              </p>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-white">
                {active?.company}
              </h3>
              <p className="mt-2 text-sm text-indigo-100/85">{active?.role}</p>
              <p className="mt-8 text-[13px] uppercase tracking-[0.24em] text-slate-500">
                Era
              </p>
              <p className="text-lg text-slate-200">{active?.period}</p>

              <div className="mt-8 space-y-2">
                {active?.metrics.slice(0, 2).map((m) => (
                  <p key={m} className="text-sm leading-snug text-slate-400">
                    · {m}
                  </p>
                ))}
              </div>

              {active?.link && (
                <Link
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-indigo-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300/80"
                >
                  Live context
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </GlassSurface>
          </div>
        </Reveal>

        <div className="space-y-5">
          {EXPERIENCE_HIGHLIGHTS.map((role, index) => {
            const isOpen = role.id === openId;
            return (
              <Reveal key={role.id} delay={0.05 * index}>
                <motion.div
                  layout
                  className={[
                    "isolate overflow-hidden rounded-[22px]",
                    "border border-white/[0.12]",
                    "bg-gradient-to-b from-white/[0.1] to-black/30",
                    "backdrop-blur-[18px] backdrop-saturate-150",
                    "shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_20px_50px_-35px_rgba(0,0,0,0.65)]",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(role.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 rounded-[22px] px-5 py-5 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300/70"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {role.period}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white">{role.company}</p>
                      <p className="text-sm text-slate-400">{role.role}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-black/50"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 text-slate-200" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-white/[0.06]"
                      >
                        <div className="space-y-6 px-5 pb-6 pt-4">
                          <p className="text-[15px] leading-relaxed text-slate-300">{role.summary}</p>

                          <div className="flex flex-wrap gap-2">
                            {role.stack.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-100/90"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Achievements
                              </p>
                              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                {role.metrics.map((m) => (
                                  <li key={m}>· {m}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Collaboration story
                              </p>
                              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                {role.highlights.map((h) => (
                                  <li key={h}>· {h}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
