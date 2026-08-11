"use client";

import { memo, type PropsWithChildren } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { useGlow } from "@/lib/motion/use-glow";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";
import { spring } from "@/lib/motion/tokens";
import { GLOW_GRADIENT_DARK, GLOW_GRADIENT_LIGHT } from "@/lib/motion/glow-gradients";

const ROUND_MAP = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

type RoundKey = keyof typeof ROUND_MAP;

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
  const rounded = ROUND_MAP[round];
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
      className={cn("relative", rounded, className)}
      style={{ padding: `${borderWidth}px` }}
      // Scale is a compositor-only transform, so the lift costs no layout.
      whileHover={motionEnabled ? { scale: 1.01 } : undefined}
      whileTap={motionEnabled ? { scale: 0.99 } : undefined}
      transition={spring.settle}
    >
      <div
        className={cn(
          "glass relative h-full min-h-0 overflow-hidden p-6",
          rounded,
          innerClassName,
        )}
      >
        {children}
      </div>
      <div
        ref={glowRef}
        aria-hidden="true"
        style={cssVars}
        className={cn(
          "glow-effect pointer-events-none absolute inset-0 transition-opacity duration-300",
          rounded,
        )}
      />
    </motion.div>
  );
});
