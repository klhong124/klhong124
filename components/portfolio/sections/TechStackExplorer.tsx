"use client";

import { useMemo, useState } from "react";
import {
  TECH_CATEGORIES,
  TECH_ITEMS,
  type TechCategory,
} from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { AnimatePresence, motion } from "motion/react";

const ALL: TechCategory | "All" = "All";

export default function TechStackExplorerSection() {
  const [filter, setFilter] = useState<(typeof ALL) | TechCategory>(ALL);

  const visible = useMemo(() => {
    if (filter === ALL) return TECH_ITEMS;
    return TECH_ITEMS.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <SectionShell
      id="stack"
      label="Stack Explorer"
      title="Categorized engineering instrument panel."
      subtitle="Hover-expanding pills, floating iconography, and instant motion feedback—mirroring how I reason about capabilities in real delivery rooms."
    >
      <Reveal>
        <GlassSurface className="p-6 lg:p-8">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label="All" />
            {TECH_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={cat}
              />
            ))}
          </div>

          <motion.div layout className="mt-10 flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <motion.span
                  layout
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group relative rounded-2xl border border-white/14 bg-black/70 px-5 py-3 text-sm text-slate-100 shadow-[0_12px_44px_-38px_rgba(99,102,241,0.9)]"
                >
                  <span className="relative z-10 font-medium">{item.name}</span>
                  <span className="relative z-10 ml-3 text-xs uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-100/90 transition-colors">
                    {item.category}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 top-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40"
                  />
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-br from-indigo-500/35 via-transparent to-sky-400/25 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </GlassSurface>
      </Reveal>
    </SectionShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all",
        active
          ? "border-indigo-300/60 bg-indigo-500/25 text-white shadow-[0_14px_42px_-34px_rgba(99,102,241,0.9)]"
          : "border-white/10 bg-transparent text-slate-400 hover:border-white/30 hover:text-slate-100",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
