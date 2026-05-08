"use client";

import { AI_FLOW_STEPS } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion } from "motion/react";

export default function AIWorkflowSection() {
  return (
    <SectionShell
      id="ai-workflow"
      label="AI-Augmented Frontend"
      title="Context engineering pipelines for senior IC throughput."
      subtitle={
        <>
          Futuristic-but-elegant workstation aesthetic: Cursor-native loops, deterministic reviews, and AI
          scaffolding that respects architecture, accessibility, and release discipline.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <Reveal>
          <GlassSurface className="p-0 overflow-hidden border border-emerald-500/10">
            <div className="border-b border-white/14 bg-[#07110d]/97 px-5 py-3 text-xs font-mono text-emerald-200/95">
              <span className="rounded bg-emerald-500/25 px-2 py-[2px] text-[10px] uppercase tracking-[0.2em]">
                cursor · agent mode
              </span>
              <span className="ml-4 text-emerald-100/85">portfolio-refactor ● feature/premium-os</span>
            </div>
            <motion.div className="space-y-0 bg-[linear-gradient(to_bottom,#060d0a,#030508)] font-mono text-[13px] leading-relaxed text-emerald-100/90">
              {[
                "> packaging context bundles (tokens, loaders, regressions)...",
                "> synthesizing differential plan with SSR + suspense guardrails ✓",
                "> generating PR outline + QA matrix for Storybook deltas... ✓",
                "> streaming patchset → awaiting human LGTM ✓",
              ].map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.25, 1, 1] }}
                  transition={{ repeat: Infinity, duration: 6, delay: i * 0.4 }}
                  className="border-b border-white/[0.04] px-5 py-3"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </GlassSurface>
        </Reveal>

        <div className="space-y-5">
          {AI_FLOW_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.05 * i}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                <GlassSurface className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-fuchsia-200/85">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{step.body}</p>
                    </div>
                    <div className="grid h-28 w-28 flex-shrink-0 place-items-center rounded-3xl border border-fuchsia-500/35 bg-black/72">
                      <NodeGrid glyph={i === 3 ? "</>" : "◆"} />
                    </div>
                  </div>
                </GlassSurface>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <GlassSurface className="p-10">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/85">
                AI node graph preview
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Operational guardrails built-in</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                Debugging with AI-assisted traces, refactor plans with deterministic diff reviews, productivity
                systems that prioritize deep work windows—engineering leadership without theatrics.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            {["Context", "PRP", "Diff", "CI", "UX", "Review"].map((label, i) => (
              <motion.div
                key={label}
                className="rounded-2xl border border-white/[0.12] bg-black/72 px-3 py-4 text-center text-sm text-slate-200"
                animate={{ y: [0, i % 2 ? -6 : -2, 0] }}
                transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                {label}
              </motion.div>
            ))}
            <motion.div className="md:col-span-6 rounded-3xl border border-dashed border-fuchsia-500/40 bg-fuchsia-500/5 px-6 py-5 text-sm text-fuchsia-100/95">
              Human-maintained choke points for auth flows, monetization primitives, accessibility audits, and
              anything touching customer trust.
            </motion.div>
          </div>
        </GlassSurface>
      </Reveal>
    </SectionShell>
  );
}

function NodeGrid({ glyph }: { glyph: string }) {
  return (
    <div className="grid grid-cols-4 gap-[3px]" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.span
          key={i}
          className={`h-[5px] w-[5px] rounded-[2px] ${
            [2, 5, 10, 12].includes(i) ? "bg-fuchsia-400/95" : "bg-white/14"
          }`}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.08 }}
        />
      ))}
      <span className="col-span-4 text-center pt-5 text-xl text-fuchsia-200">{glyph}</span>
    </div>
  );
}
