import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Pills } from "@/components/ui/pills";
import { ExternalLinkList } from "@/components/ui/external-link-list";
import { timeline } from "@/data/portfolio-content";

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Where I have worked"
        description="Most recent first. Live links where the work is public."
      />
      <ol className="space-y-6 border-l border-white/15 pl-6 md:pl-8">
        {timeline.map((item) => (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-7 size-3 rounded-full bg-accent md:-left-[39px]"
            />
            <GlassCard round="xl" innerClassName="p-6">
              {item.image && (
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-surface">
                  <Image
                    src={item.image}
                    alt={`Screenshot from work at ${item.company}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-top"
                  />
                </div>
              )}
              <p className="text-fluid-sm uppercase tracking-[0.2em] text-muted">{item.period}</p>
              <h3 className="mt-2 text-fluid-xl font-semibold text-fg">{item.company}</h3>
              <p className="text-fluid-base text-accent">
                {item.role}
                {item.location && <span className="text-muted"> · {item.location}</span>}
              </p>
              <p className="mt-3 max-w-measure text-pretty text-muted">{item.summary}</p>

              <ul className="mt-4 space-y-2">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/70"
                    />
                    <span className="text-pretty">{achievement}</span>
                  </li>
                ))}
              </ul>

              {item.links.length > 0 && <ExternalLinkList className="mt-4" links={item.links} />}

              <Pills
                className="mt-5"
                items={item.stack}
                label={`Technologies used at ${item.company}`}
              />
            </GlassCard>
          </li>
        ))}
      </ol>
    </Section>
  );
}
