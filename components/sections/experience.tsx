import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";
import { experience } from "@/content/experience";

export function ExperienceSectionV2() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Timeline" title="Experience" />
      <div className="space-y-4 border-l border-white/15 pl-6">
        {experience.map((item) => (
          <div key={`${item.year}-${item.name}`} className="relative">
            <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full bg-accent" aria-hidden />
            <GlassCard round="xl" innerClassName="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.year}</p>
              <h3 className="text-xl text-fg">{item.name}</h3>
              <p className="text-sm text-muted">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-muted">{tag}</span>)}
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
