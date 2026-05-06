import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";

export function SystemsDesignSection() {
  return (
    <Section id="systems">
      <SectionHeading eyebrow="Systems" title="Frontend Architecture & Design Systems" />
      <GlassCard innerClassName="space-y-6">
        <p className="text-muted">Atomic design, Storybook workflow, design tokens, monorepo architecture, and CI/CD delivery paths.</p>
        <div className="grid gap-3 md:grid-cols-5">
          {[
            "Tokens",
            "Primitives",
            "Composites",
            "Screens",
            "Pipelines",
          ].map((step) => (
            <div key={step} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm">{step}</div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
