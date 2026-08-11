import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { principles } from "@/data/portfolio-content";

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        eyebrow="Approach"
        title="How I work"
        description="Four things I keep coming back to, and what they cost in practice."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {principles.map((principle) => (
          <GlassCard key={principle.title} round="xl" innerClassName="p-6">
            <h3 className="text-fluid-lg font-semibold text-fg">{principle.title}</h3>
            <p className="mt-3 text-pretty text-muted">{principle.detail}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
