import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { InkText } from "@/components/showcase/items/ink-text";
import { SpotlightCard } from "@/components/showcase/items/spotlight-card";
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
                so on tall cards it tucks behind the card (which sits at z-10)
                while the gutter part stays exposed for painting. It used to be
                -z-10, which put it behind this wrapper too, so the wrapper took
                every pointer event and the hover effect never fired. */}
            <div
              aria-hidden="true"
              className="absolute -top-12 left-0 aspect-[4/5] h-full"
            >
              <InkText text={`${index + 1}.`} viewBox="0 0 80 100" fontSize={88} className="h-full font-display" />
            </div>
            {/* h-full so both cards in a row end on the same line; the grid
                row stretches to the taller one. */}
            <SpotlightCard className="z-10 h-full">
              <h3 className="text-fluid-lg font-semibold text-fg">{principle.title}</h3>
              <p className="mt-3 text-pretty text-muted">{principle.detail}</p>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
