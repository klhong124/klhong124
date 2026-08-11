import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";
import { bio } from "@/content/bio";

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="How I work" description={bio.intro} />
      <div className="grid gap-6 md:grid-cols-2">
        {bio.philosophy.map((item) => (
          <GlassCard key={item.title}>
            <h3 className="text-lg text-fg">{item.title}</h3>
            <p className="mt-2 text-muted">{item.detail}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
