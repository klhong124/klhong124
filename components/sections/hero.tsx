import GlowingCard from "@/ui/glowing-card";
import WindowControl from "@/ui/windowControl";
import Dock from "@/ui/dock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TechStackScene } from "@/components/ui/tech-stack-scene";
import { profile } from "@/data/portfolio-content";
import type { DockItem } from "@/ui/dock";

/**
 * Passed to the dock rather than imported inside it, so the client bundle does
 * not have to include Zod and the entire content module to render five icons.
 * `title` doubles as the icon filename in /public/svg.
 */
const socialLinks: DockItem[] = [
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/ryankwandev/",
    label: "LinkedIn profile",
  },
  { title: "github", href: "https://github.com/klhong124", label: "GitHub profile" },
  { title: "x", href: "https://x.com/ryankwandev", label: "X profile" },
  { title: "medium", href: "https://medium.com/@ryankwandev", label: "Medium articles" },
  { title: "inbox", href: `mailto:${profile.email}`, label: `Email ${profile.email}` },
];

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
      // No forced full-viewport height on phones. The intro runs to six lines at
      // 390px, so `min-h-[100svh]` pushed the social dock below the fold and left
      // dead space above it. Content decides the height on mobile; the cinematic
      // full-screen framing kicks in from `sm` up, where it fits without cropping.
      className="section-wrap relative flex flex-col items-center justify-center py-8 sm:min-h-[100svh] sm:py-section-tight"
    >
      <TechStackScene />

      <GlowingCard className="max-w-3xl">
        {/* px-5 rather than px-6 on phones is not fussiness: at 390px it gives the
            row of CTAs 318px to work with instead of 302px, which is the
            difference between two buttons sitting side by side and each taking
            its own line. */}
        <div className="relative px-5 py-8 sm:px-10 sm:py-16">
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

      <Dock items={socialLinks} />
    </section>
  );
}

export default HeroSection;
