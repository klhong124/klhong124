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
        highlights={["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Storybook"]}
        className="mt-6 max-w-measure-tight text-balance font-display text-fluid-2xl font-medium leading-snug text-fg"
      />
      {profile.introDetail.length > 0 && (
        <div className="mt-8 max-w-measure space-y-5">
          {profile.introDetail.map((paragraph) => (
            <p key={paragraph} className="text-pretty text-fluid-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </Section>
  );
}
