import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";
import { bio } from "@/content/bio";
import { stats } from "@/content/stats";

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="How I Think" description={bio.intro} />
      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-semibold text-fg">{item.value}+</p>
                <p className="text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <ul className="space-y-3 text-muted">
            <li>Systems: {bio.philosophy[0]}</li>
            <li>Motion: {bio.philosophy[1]}</li>
            <li>DX: {bio.philosophy[2]}</li>
          </ul>
        </GlassCard>
      </div>
    </Section>
  );
}
