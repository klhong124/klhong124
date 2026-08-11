import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Pills } from "@/components/ui/pills";
import { stackGroups } from "@/data/portfolio-content";

export function TechStackSection() {
  return (
    <Section id="stack" labelledBy="stack-heading">
      <SectionHeading
        id="stack-heading"
        eyebrow="Stack"
        title="What I build with"
        description="Grouped by the job it does rather than by how fashionable it is."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stackGroups.map((group) => (
          <GlassCard key={group.label} round="xl" innerClassName="p-5">
            <h3 className="mb-4 text-fluid-base font-semibold text-fg">{group.label}</h3>
            <Pills items={group.items} label={group.label} />
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
