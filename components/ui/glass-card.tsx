"use client";

import { memo, type PropsWithChildren } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { useGlow } from "@/lib/motion/use-glow";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";
import { spring } from "@/lib/motion/tokens";
import { GLOW_GRADIENT_DARK, GLOW_GRADIENT_LIGHT } from "@/lib/motion/glow-gradients";

/**
 * Corner radius of the glass panel itself, in px (Tailwind's xl, 2xl and 3xl).
 * The wrapper and the glow ring sit further out, so their radii grow by the
 * border width at each step and all three curves share one centre. They all
 * used to take the same class, which made the ring's corners tighter than the
 * card's.
 */
const RADIUS = {
  xl: 12,
  "2xl": 16,
  "3xl": 24,
} as const;

type RoundKey = keyof typeof RADIUS;

type GlassCardProps = PropsWithChildren<{
  className?: string;
  /** Applied to the inner glass panel, e.g. custom padding. */
  innerClassName?: string;
  borderWidth?: number;
  glowBlur?: number;
  glowSpread?: number;
  glowProximity?: number;
  /** Corner radius preset — outer, inner fill and glow ring stay aligned. */
  round?: RoundKey;
}>;

/** Glass panel with a pointer-tracked conic glow and a subtle hover lift. */
export const GlassCard = memo(function GlassCard({
  children,
  className,
  innerClassName,
  borderWidth = 2,
  glowBlur = 4,
  glowSpread = 48,
  glowProximity = 72,
  round = "2xl",
}: GlassCardProps) {
  const radius = RADIUS[round];
  const glowRef = useGlow({ proximity: glowProximity });
  const motionEnabled = useMotionEnabled();

  const cssVars = {
    "--spread": glowSpread,
    "--start": "0",
    "--active": "0",
    "--glowingeffect-border-width": `${borderWidth}px`,
    "--gradient-light": GLOW_GRADIENT_LIGHT,
    "--gradient-dark": GLOW_GRADIENT_DARK,
    "--blur": `${glowBlur}px`,
  } as React.CSSProperties;

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ padding: `${borderWidth}px`, borderRadius: radius + borderWidth }}
      // Scale is a compositor-only transform, so the lift costs no layout.
      //
      // Deliberately no `whileTap`: Motion adds `tabindex="0"` to anything with a
      // tap gesture, which put 22 empty tab stops on the homepage. The card is a
      // presentational wrapper — where it needs to be activated, the caller wraps
      // it in a real link or button.
      whileHover={motionEnabled ? { scale: 1.01 } : undefined}
      transition={spring.settle}
    >
      <div
        className={cn("glass relative h-full min-h-0 overflow-hidden p-6", innerClassName)}
        style={{ borderRadius: radius }}
      >
        {children}
      </div>
      <div
        ref={glowRef}
        aria-hidden="true"
        // The ring is drawn borderWidth outside this box and inherits its
        // radius, so this box's radius is the ring's outer radius.
        style={{ ...cssVars, borderRadius: radius + 2 * borderWidth }}
        className="glow-effect pointer-events-none absolute inset-0 transition-opacity duration-300"
      />
    </motion.div>
  );
});
