"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const SPRING = { stiffness: 170, damping: 15, mass: 0.5 };

// Layout that always applies, and the look that `className` replaces. Kept
// apart so an override never has to fight a built-in class.
const BASE = "relative inline-flex min-h-11 items-center justify-center text-sm font-medium transition-colors";
const LOOK =
  "rounded-full border border-white/20 bg-white/5 px-7 py-3 text-white backdrop-blur hover:border-white/40 hover:bg-white/10";

type MagneticButtonProps = {
  children: ReactNode;
  /** Renders an `<a>` when set, a `<button>` otherwise. */
  href?: string;
  /** How far the pill follows the cursor, as a fraction of the cursor's offset. */
  strength?: number;
  /** How far beyond the button the pull starts, in pixels. Adds to the layout size. */
  field?: number;
  /** Replaces the default look (radius, border, background, padding, colour). */
  className?: string;
};

/**
 * A pill that leans toward the cursor on a spring. The label travels further
 * than the pill, which reads as depth. The magnetic field reaches a little past
 * the button, so the pull starts just before you arrive.
 */
export function MagneticButton({ children, href, strength = 0.3, field = 16, className }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const labelX = useSpring(0, SPRING);
  const labelY = useSpring(0, SPRING);

  // Measured on the static wrapper, not the moving pill, so the pull does not
  // feed back into its own measurement.
  const pull = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    labelX.set(dx * strength * 0.6);
    labelY.set(dy * strength * 0.6);
  };

  const release = () => {
    x.set(0);
    y.set(0);
    labelX.set(0);
    labelY.set(0);
  };

  const pill = { style: { x, y }, className: `${BASE} ${className ?? LOOK}` };
  const label = (
    <motion.span className="pointer-events-none relative" style={{ x: labelX, y: labelY }}>
      {children}
    </motion.span>
  );

  return (
    <span className="inline-block" style={{ padding: field }} onPointerMove={pull} onPointerLeave={release}>
      {href ? (
        <motion.a href={href} {...pill}>
          {label}
        </motion.a>
      ) : (
        <motion.button type="button" {...pill}>
          {label}
        </motion.button>
      )}
    </span>
  );
}
