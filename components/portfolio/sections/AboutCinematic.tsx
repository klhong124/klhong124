"use client";

import {
  ARCHITECTURE_PILLARS,
  PHILOSOPHY_CARDS,
  TIMELINE_SNIPPETS,
} from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion, useReducedMotion } from "motion/react";

export default function AboutCinematicSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell
      id="about"
      label="Profile · Systems Mindset"
      title="Frontend architect with disciplined product instincts."
      subtitle="Crafting cinematic product surfaces anchored in scalable runtime architecture—not decoration for its own sake."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
        <Reveal>
          <GlassSurface className="p-8 lg:p-10">
            <h3 className="text-xl font-semibold text-white">Cinematic introspection</h3>
            <p className="mt-4 leading-relaxed text-slate-300/95">
              I partner with organizations that treat the browser as an operating surface: motion,
              typography, shaders, GraphQL payloads, caching, observability—all orchestrated toward
              unmistakable polish.
            </p>
          </GlassSurface>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {PHILOSOPHY_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * i}>
              <GlassSurface className="h-full p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/85">
                  {card.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300/95">{card.body}</p>
              </GlassSurface>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <GlassSurface className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-200/90">
                Timeline snippets
              </p>
              <p className="mt-1 text-lg text-white">Momentum across eras & mandates</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-400">
              Scroll horizontally on narrow viewports · GPU-friendly reveals
            </span>
          </div>
          <div
            className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-4"
            aria-label="Career milestones"
          >
            {TIMELINE_SNIPPETS.map((snippet, i) => (
              <motion.figure
                key={snippet.year}
                initial={{ opacity: 0.15, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={[
                  "min-w-[260px] max-w-[300px] snap-start rounded-[18px]",
                  "border border-white/[0.12] bg-black/52 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                ].join(" ")}
              >
                <figcaption className="text-sm font-semibold text-indigo-200/95">
                  {snippet.year}
                </figcaption>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{snippet.label}</p>
              </motion.figure>
            ))}
          </div>
        </GlassSurface>
      </Reveal>

      <Reveal>
        <GlassSurface className="p-8">
          <h3 className="text-xl font-semibold text-white">Systems design mindset</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300/95">
            Every interface decision radiates outward: SSR boundaries, CDN behaviors, typography
            loading, suspense fallbacks. I obsess over translating those primitives into repeatable
            systems—living Storybook inventories, guarded GraphQL selectors, disciplined motion ramps.
          </p>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {ARCHITECTURE_PILLARS.slice(0, 2).map((pillar, i) => (
              <div key={pillar.title}>
                <dt className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  0{i + 1}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-slate-200">
                  <span className="font-semibold text-white">{pillar.title}</span>
                  {" · "}
                  {pillar.body}
                </dd>
              </div>
            ))}
          </dl>
        </GlassSurface>
      </Reveal>
    </SectionShell>
  );
}
