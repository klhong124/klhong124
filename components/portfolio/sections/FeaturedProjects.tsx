"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECT_STUDIES, type ProjectStudy } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedProjectsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell
      id="projects"
      label="Case Studies"
      title="Featured projects distilled as SaaS-caliber narratives."
      subtitle="Each vignette interrogates architecture, optimizations, friction, and the engineering choices that defended the UX north star."
    >
      <div className="space-y-28">
        {PROJECT_STUDIES.map((study, idx) => {
          const alignRight = idx % 2 === 1;
          return (
            <Reveal key={study.slug}>
              <GlassSurface className="overflow-visible p-0">
                <div
                  className={[
                    "grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch",
                    alignRight ? "lg:[&>*:first-child]:order-2" : "",
                  ].join(" ")}
                >
                  <CaseStudyPreview study={study} index={idx} reduceMotion={!!reduceMotion} />

                  <div className="space-y-7 p-8 lg:p-10">
                    <div className="flex items-start gap-5">
                      <div>
                        <h3 className="text-3xl font-semibold leading-tight text-white">
                          {study.title}
                        </h3>
                        <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
                          {study.subtitle}
                        </p>
                      </div>
                      <motion.div
                        className="rounded-2xl border border-white/14 bg-white/[0.09] p-3 text-indigo-200"
                        animate={reduceMotion ? undefined : { y: [-2, 2, -2], rotate: [-2, 2, -2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        aria-hidden
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.div>
                    </div>

                    <TechRow label="Stack" items={[...study.stack]} />

                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <h4 className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          Architecture moves
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                          {study.architecture.map((row) => (
                            <li key={row}>{row}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          Performance levers
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                          {study.performance.map((row) => (
                            <li key={row}>{row}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                        Engineering impact
                      </h4>
                      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-200 md:grid-cols-2">
                        {study.impact.map((row) => (
                          <li
                            key={row}
                            className="rounded-2xl border border-white/[0.1] bg-black/52 px-3 py-2"
                          >
                            {row}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                        Challenges conquered
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {study.challenges[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassSurface>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

function CaseStudyPreview({
  study,
  index,
  reduceMotion,
}: {
  study: ProjectStudy;
  index: number;
  reduceMotion: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(study.demoImage) && !imageFailed;

  return (
    <motion.div
      className="group relative min-h-[320px] lg:min-h-[420px]"
      whileHover={reduceMotion ? undefined : { scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] blur-3xl opacity-70 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 30% -10%, ${study.gradient[0]}, transparent), radial-gradient(circle at 120% 30%, ${study.gradient[2]}, transparent)`,
        }}
      />
      <div className="absolute inset-px overflow-hidden rounded-[24px_0px_0px_24px] border border-white/14 bg-neutral-950 lg:rounded-[inherit]">
        {showImage ? (
          <>
            <Image
              src={study.demoImage!}
              alt={study.demoImageAlt ?? `${study.title} product screenshot`}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 52vw"
              priority={index === 0}
              onError={() => setImageFailed(true)}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
              style={{
                background: `linear-gradient(135deg, ${study.gradient[0]}33 0%, transparent 45%, ${study.gradient[2]}22 100%)`,
              }}
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/92 via-neutral-950/94 to-neutral-950/88 backdrop-blur-2xl"
            aria-hidden
          />
        )}

        <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-6 sm:p-8 lg:min-h-[420px]">
          {!showImage && (
            <div className="flex flex-1 flex-col items-center justify-center space-y-3 px-6 text-center">
              <motion.p
                className="text-xs uppercase tracking-[0.42em] text-indigo-200/90"
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.75, 1, 0.75], letterSpacing: ["0.38em", "0.5em"] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {study.slug.replace(/-/g, " · ")}
              </motion.p>
              <p className="text-[13px] text-slate-400">Immersive product preview</p>
              <motion.div
                className="mx-auto mt-6 h-[3px] w-24 rounded-full"
                animate={
                  reduceMotion
                    ? undefined
                    : { scaleX: [0.82, 1, 0.82], opacity: [0.6, 1, 0.6] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: `linear-gradient(90deg, ${study.gradient[0]}, ${study.gradient[1]}, ${study.gradient[2]})`,
                }}
              />
            </div>
          )}
          {showImage && (
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-indigo-100/95">
                {study.slug.replace(/-/g, " · ")}
              </p>
              <p className="max-w-prose text-xs leading-snug text-slate-300/95">
                Visual reference from related shipped work — details in the narrative beside this panel.
              </p>
              <motion.div
                className="mt-3 h-[3px] w-20 rounded-full"
                animate={
                  reduceMotion
                    ? undefined
                    : { scaleX: [0.85, 1, 0.85], opacity: [0.7, 1, 0.75] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: `linear-gradient(90deg, ${study.gradient[0]}, ${study.gradient[1]}, ${study.gradient[2]})`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TechRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <motion.span
            whileHover={{ y: -1.5 }}
            key={item}
            className="rounded-full bg-white/[0.09] px-3 py-1 text-xs text-indigo-100/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.11)] backdrop-blur"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
