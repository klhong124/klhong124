"use client";

import { ARCHITECTURE_PILLARS } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Layers, Shield, Workflow } from "lucide-react";

const ICONS = {
  layers: Layers,
  book: BookOpen,
  a11y: Shield,
  box: Workflow,
} as const;

export default function ArchitectureSystemsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell
      id="architecture"
      label="Frontend Architecture"
      title="Composable systems—not one-off miracles."
      subtitle="Storybook rituals, atomic structure, accessibility guardrails, and monorepo-friendly boundaries that keep ambitious UI shippable at scale."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {ARCHITECTURE_PILLARS.map((pillar, i) => {
          const Icon = ICONS[pillar.icon as keyof typeof ICONS];
          return (
            <Reveal key={pillar.title} delay={0.06 * i}>
              <GlassSurface className="h-full p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-indigo-200/85">
                      Pillar 0{i + 1}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{pillar.body}</p>
                  </div>
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/14 bg-black/62 text-indigo-200"
                    animate={
                      reduceMotion ? undefined : { rotate: [-3, 3, -3], y: [-1.5, 1.5, -1.5] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 6 + i,
                      ease: "easeInOut",
                    }}
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </GlassSurface>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <GlassSurface className="p-10">
          <div className="flex flex-wrap items-start justify-between gap-8 pb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/85">
                Living diagram · motion-assisted
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Design-token led delivery</h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
                Tokens flow into primitives → composites → shells. SSR boundaries hydrate only what’s
                needed; Storybook stories become contract tests for regressions spanning layout,
                focus order, motion curves, and data edge cases.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-neutral-950/96 via-neutral-900/96 to-neutral-950/94 p-10">
            <motion.div
              aria-hidden
              className="absolute inset-x-[-10%] top-[-30%] h-[220px] bg-[radial-gradient(circle,_rgba(99,102,241,0.5),transparent_72%)]"
              animate={{
                rotate: reduceMotion ? 0 : [-4, 4, -4],
                opacity: reduceMotion ? 0.55 : [0.4, 0.75, 0.45],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <ArchitectureFlowGraphic />
          </div>
        </GlassSurface>
      </Reveal>
    </SectionShell>
  );
}

function ArchitectureFlowGraphic() {
  const reduceMotion = useReducedMotion();

  const nodes = [
    { title: "Design Tokens", subtitle: "Color · type · space · motion" },
    { title: "Primitives", subtitle: "Buttons · inputs · media" },
    { title: "Composites", subtitle: "Modules · cards · overlays" },
    { title: "Page Shell", subtitle: "Layout · routing · loaders" },
    { title: "Runtime Ops", subtitle: "Instrumentation · prefetch" },
  ];

  return (
    <div className="relative z-10 min-h-[360px]" role="img" aria-label="Architecture flow visualization">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="portfolio-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        {reduceMotion ? (
          <>
            <line
              x1="18%"
              y1="26%"
              x2="82%"
              y2="26%"
              stroke="rgba(99,102,241,0.35)"
              strokeWidth="1.5"
            />
            <line
              x1="50%"
              y1="36%"
              x2="50%"
              y2="74%"
              stroke="rgba(148,163,184,0.35)"
              strokeWidth="1.2"
              strokeDasharray="6 12"
            />
          </>
        ) : (
          <>
            <motion.path
              d="M 18% 26% H 82%"
              stroke="url(#portfolio-flow)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              fill="none"
            />
            <motion.path
              d="M 50% 36% V 74%"
              stroke="rgba(148,163,184,0.45)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="6 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              fill="none"
            />
          </>
        )}
      </svg>

      <div className="relative mx-auto grid h-full gap-14">
        <div className="grid gap-10 sm:grid-cols-3">
          {nodes.slice(0, 3).map((node) => (
            <motion.div
              key={node.title}
              initial={{ opacity: 0.3, scale: 0.96 }}
              whileHover={{ opacity: 1, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="rounded-2xl border border-white/[0.12] bg-white/[0.07] px-5 py-4 text-center backdrop-blur"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Layer
              </p>
              <p className="mt-3 text-[15px] font-semibold text-white">{node.title}</p>
              <p className="mt-1 text-[13px] text-slate-400">{node.subtitle}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {nodes.slice(3).map((node) => (
            <motion.div
              key={node.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="rounded-2xl border border-white/[0.12] bg-black/58 px-5 py-6"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                Runtime
              </p>
              <p className="mt-3 text-lg font-semibold text-white">{node.title}</p>
              <p className="mt-2 text-[13px] text-slate-400">{node.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
