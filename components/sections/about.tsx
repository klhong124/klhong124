import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import TextHoverEffect from "@/ui/textHoverEffect";
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
        {principles.map((principle, index) => (
          <div key={principle.title} className="relative pl-20">
            {/* Decorative outlined numeral in the gutter, as tall as the card
                itself and nudged upward. Width follows from the aspect ratio,
                so on tall cards it can tuck slightly behind the glass (-z-10)
                while the gutter part stays exposed for the hover reveal. */}
            <div
              aria-hidden="true"
              className="absolute -top-12 left-0 -z-10 aspect-[4/5] h-full"
            >
              <TextHoverEffect viewBox="0 0 80 100" textClassName="text-[88px]">
                {`${index + 1}.`}
              </TextHoverEffect>
            </div>
            <GlassCard round="xl" innerClassName="p-6">
              <h3 className="text-fluid-lg font-semibold text-fg">{principle.title}</h3>
              <p className="mt-3 text-pretty text-muted">{principle.detail}</p>
            </GlassCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
