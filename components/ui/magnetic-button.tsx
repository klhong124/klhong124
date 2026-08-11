"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react";
import NextLink from "next/link";
import { cn } from "@/utils/cn";
import { spring } from "@/lib/motion/tokens";
import { useMotionEnabled } from "@/lib/motion/use-motion-enabled";

const VARIANTS = {
  primary: "bg-accent text-bg hover:bg-accent/90 border-transparent font-medium",
  secondary: "border-white/25 bg-white/5 text-fg hover:border-white/50 hover:bg-white/10",
} as const;

type Variant = keyof typeof VARIANTS;

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
  /** Renders a plain anchor with new-tab semantics instead of a Next.js Link. */
  external?: boolean;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  type?: HTMLMotionProps<"button">["type"];
  disabled?: boolean;
  onClick?: HTMLMotionProps<"button">["onClick"];
};

/**
 * Primary and secondary calls to action.
 *
 * Renders a real `<a>` when given an `href` and a real `<button>` otherwise. The
 * contact section previously nested a `<button>` inside an `<a>`, which is
 * invalid HTML and announces confusingly. Minimum height is 44px to clear the
 * touch-target guideline, and the magnetic pull is skipped under reduced motion.
 */
export function MagneticButton(props: LinkProps | ButtonProps) {
  const motionEnabled = useMotionEnabled();

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, spring.pointer);
  const springY = useSpring(offsetY, spring.pointer);
  const springStyle = motionEnabled ? { x: springX, y: springY } : undefined;

  const pull = (event: React.MouseEvent<HTMLElement>) => {
    if (!motionEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - (rect.left + rect.width / 2)) * 0.15);
    offsetY.set((event.clientY - (rect.top + rect.height / 2)) * 0.15);
  };

  const release = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-fluid-sm transition-colors",
    VARIANTS[props.variant ?? "secondary"],
    props.className,
  );

  const interaction = { onMouseMove: pull, onMouseLeave: release, onBlur: release };

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <motion.a
          href={props.href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
          style={springStyle}
          {...interaction}
        >
          {props.children}
          <span className="sr-only">(opens in a new tab)</span>
        </motion.a>
      );
    }

    return (
      <motion.span className="inline-block" style={springStyle} {...interaction}>
        <NextLink href={props.href} className={classes}>
          {props.children}
        </NextLink>
      </motion.span>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
      style={springStyle}
      {...interaction}
    >
      {props.children}
    </motion.button>
  );
}
