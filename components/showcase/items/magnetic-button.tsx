"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const SPRING = { stiffness: 170, damping: 15, mass: 0.5 };

type MagneticButtonProps = {
  children: ReactNode;
  /** Renders an `<a>` when set, a `<button>` otherwise. */
  href?: string;
  /** How far the pill follows the cursor, as a fraction of the cursor's offset. */
  strength?: number;
  className?: string;
};

/**
 * A pill that leans toward the cursor on a spring. The label travels further
 * than the pill, which reads as depth. The magnetic field is a little larger
 * than the button, so the pull starts just before you reach it.
 */
export function MagneticButton({ children, href, strength = 0.3, className = "" }: MagneticButtonProps) {
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

  const pill = {
    style: { x, y },
    className: `relative inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10 ${className}`,
  };
  const label = (
    <motion.span className="pointer-events-none relative" style={{ x: labelX, y: labelY }}>
      {children}
    </motion.span>
  );

  return (
    <span className="inline-block p-4" onPointerMove={pull} onPointerLeave={release}>
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
