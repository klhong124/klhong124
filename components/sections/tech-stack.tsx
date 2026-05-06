"use client";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";
import { stack } from "@/content/stack";

export function TechStackSectionV2() {
  return (
    <Section id="stack">
      <SectionHeading eyebrow="Stack" title="Tools I Ship With" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(stack).map(([group, tools]) => (
          <GlassCard key={group} round="xl" innerClassName="p-4">
            <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-fg">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => <span key={tool} className="rounded-full border border-white/15 px-3 py-1 text-xs text-muted">{tool}</span>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
