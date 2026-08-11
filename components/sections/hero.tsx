"use client";

import { motion } from "motion/react";
import GlowingCard from "@/ui/glowing-card";
import WindowControl from "@/ui/windowControl";
import Dock from "@/ui/dock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TechStackScene } from "@/components/ui/tech-stack-scene";
import { profile } from "@/data/portfolio-content";
import { stagger } from "@/lib/motion/tokens";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

/**
 * Above the fold.
 *
 * The previous hero showed "Say hello to / @ryankwandev / Click to Explore" and
 * hid the actual positioning behind a click on a plain <div> — unreachable by
 * keyboard, and invisible to a recruiter skimming on a phone. Everything that
 * answers "who is this and what do they do" is now present on first paint, with
 * no interaction required.
 *
 * The entrance stagger is short and applies to opacity and transform only, so
 * the LCP text is legible almost immediately rather than after the ~1s of
 * delays the old variants introduced.
 */
export function HeroSection() {
  const motionEnabled = useMotionEnabled();

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

          <motion.div
            variants={motionEnabled ? stagger.container : undefined}
            initial={motionEnabled ? "hidden" : false}
            animate="visible"
          >
            <motion.p
              variants={stagger.item}
              className="text-fluid-sm uppercase tracking-[0.2em] text-accent"
            >
              {profile.location}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={stagger.item}
              className="mt-4 text-balance font-display text-fluid-4xl font-semibold text-fg"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={stagger.item}
              className="mt-3 text-fluid-xl text-fg/90"
            >
              {profile.role}{" "}
              <span className="text-muted">
                currently at {profile.currently}
              </span>
            </motion.p>

            <motion.p
              variants={stagger.item}
              className="mt-6 max-w-measure text-pretty text-fluid-base text-muted"
            >
              {profile.intro}
            </motion.p>

            <motion.div variants={stagger.item} className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/work" variant="primary">
                See my work
              </MagneticButton>
              <MagneticButton href="#contact">Get in touch</MagneticButton>
              <MagneticButton href="https://parfetts.co.uk" external>
                Parfetts, live
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </GlowingCard>

      <Dock />
    </section>
  );
}

export default HeroSection;
