import GlowingCard from "@/ui/glowing-card";
import WindowControl from "@/ui/windowControl";
import Dock from "@/ui/dock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TechStackScene } from "@/components/ui/tech-stack-scene";
import { profile } from "@/data/portfolio-content";

/**
 * Above the fold.
 *
 * The previous hero showed "Say hello to / @ryankwandev / Click to Explore" and
 * hid the actual positioning behind a click on a plain <div> — unreachable by
 * keyboard, and invisible to a recruiter skimming on a phone. Everything that
 * answers "who is this and what do they do" is now present on first paint.
 *
 * Deliberately a server component with no entrance animation. The hero contains
 * the LCP text, and any staggered fade means shipping HTML with `opacity: 0`
 * inline — which delays the largest paint and, worse, strands the text invisible
 * if JavaScript fails. The character in this section comes from the glow, the
 * dock and the 3D backdrop, all of which are decorative and safely gated.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="section-wrap relative flex min-h-[100svh] flex-col items-center justify-center py-section-tight"
    >
      <TechStackScene />

      <GlowingCard className="max-w-3xl">
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <WindowControl />

          <p className="text-fluid-sm uppercase tracking-[0.2em] text-accent">{profile.location}</p>

          <h1
            id="hero-heading"
            className="mt-4 text-balance font-display text-fluid-4xl font-semibold text-fg"
          >
            {profile.name}
          </h1>

          <p className="mt-3 text-fluid-xl text-fg/90">
            {profile.role} <span className="text-muted">currently at {profile.currently}</span>
          </p>

          <p className="mt-6 max-w-measure text-pretty text-fluid-base text-muted">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticButton href="/work" variant="primary">
              See my work
            </MagneticButton>
            <MagneticButton href="#contact">Get in touch</MagneticButton>
            <MagneticButton href="https://parfetts.co.uk" external>
              Parfetts, live
            </MagneticButton>
          </div>
        </div>
      </GlowingCard>

      <Dock />
    </section>
  );
}

export default HeroSection;
