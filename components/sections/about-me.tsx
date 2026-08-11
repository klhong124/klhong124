import { Section } from "@/components/ui/section";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { profile } from "@/data/portfolio-content";

/**
 * The self-intro used to sit inside the hero card, which made the card the
 * only thing on the first screen doing any work. Moving it here keeps the
 * hero to name / role / CTAs and gives the intro room to be a statement
 * rather than a caption.
 */
export function AboutMeSection() {
  return (
    <Section id="about-me" labelledBy="about-me-heading" space="tight">
      <h2
        id="about-me-heading"
        className="text-fluid-sm uppercase tracking-[0.2em] text-accent"
      >
        About me
      </h2>
      <ScrollRevealText
        text={profile.intro}
        highlights={["fast", "accessible", "Next.js", "React", "TypeScript", "motion"]}
        className="mt-6 max-w-measure-tight text-balance font-display text-fluid-2xl font-medium leading-snug text-fg"
      />
    </Section>
  );
}
