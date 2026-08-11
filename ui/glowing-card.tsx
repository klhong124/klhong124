"use client";
import { memo, type PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { useGlow } from "@/lib/motion/use-glow";
import { GLOW_GRADIENT_DARK, GLOW_GRADIENT_LIGHT } from "@/lib/motion/glow-gradients";

type GlowingCardProps = PropsWithChildren<{
  blur?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  borderWidth?: number;
}>;

/**
 * The hero's glass card.
 *
 * This used to animate `width` and `height` between two fixed pixel pairs
 * (500x400 and 580x500) on click, which both shifted layout in the middle of the
 * hero and overflowed any viewport narrower than 500px. It is now a fluid
 * container: the content decides the height and the width is capped by a max,
 * so there is nothing to shift and it fits a phone.
 */
const GlowingCard = memo(
  ({ children, blur = 4, proximity = 80, spread = 50, className, borderWidth = 3 }: GlowingCardProps) => {
    const glowRef = useGlow({ proximity });

    const cssVars = {
      "--spread": spread,
      "--start": "0",
      "--active": "0",
      "--glowingeffect-border-width": `${borderWidth}px`,
      "--gradient-light": GLOW_GRADIENT_LIGHT,
      "--gradient-dark": GLOW_GRADIENT_DARK,
      "--blur": `${blur}px`,
    } as React.CSSProperties;

    return (
      <div
        className={cn("glass relative w-full rounded-3xl", className)}
        style={{ padding: `${borderWidth}px` }}
      >
        {children}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={cssVars}
          className={cn(
            "glow-effect pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300",
            "before:absolute before:rounded-3xl before:border-transparent before:bg-fixed before:opacity-[var(--active)] before:transition-opacity before:duration-300 before:content-['']",
          )}
        />
      </div>
    );
  },
);

GlowingCard.displayName = "GlowingCard";
export default GlowingCard;
