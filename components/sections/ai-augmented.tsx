import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";

export function AiAugmentedSection() {
  return (
    <Section id="ai">
      <SectionHeading eyebrow="AI-Augmented" title="Creative Operating System" />
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <p className="font-mono text-sm text-cyan-300">Cursor Session</p>
          <p className="mt-4 text-sm text-muted">Plan -&gt; Research -&gt; Patch loops for architecture-first execution and faster debugging cycles.</p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted">Prompt patterns: scoped context, reusable review rubrics, and DX-focused refactor templates.</p>
          <p className="mt-4 text-sm text-amber-300">Try command palette: cmd/ctrl + K</p>
        </GlassCard>
      </div>
    </Section>
  );
}
