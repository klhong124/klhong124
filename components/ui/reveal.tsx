"use client";

import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { reveal, revealTransition } from "@/lib/motion/tokens";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

type RevealProps = {
  children: React.ReactNode;
  /** Small offsets only; anything larger reads as movement for its own sake. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
};

/**
 * Scroll-triggered entrance using transform and opacity only.
 *
 * Under reduced motion this renders the final state directly — no animation, no
 * `whileInView` observer, and no risk of content being stuck invisible if the
 * observer never fires.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const motionEnabled = useMotionEnabled();
  const Component = motion[as];

  if (!motionEnabled) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={reveal.hidden}
      whileInView={reveal.visible}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </Component>
  );
}
