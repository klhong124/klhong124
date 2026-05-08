"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { cn } from "@/utils/cn";
import { useHero } from "@/hooks/useHero";

/** Shared conic gradients for `.glow-effect` (globals.scss). */
export const GLOW_GRADIENT_LIGHT = `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
         radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
         radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
         radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #dd7bbb 0%,
           #d79f1e calc(25% / 5),
           #5a922c calc(50% / 5),
           #4c7894 calc(75% / 5),
           #dd7bbb calc(100% / 5)
         )`;

export const GLOW_GRADIENT_DARK = `radial-gradient(circle, #a78bfa 10%, #a78bfa00 20%),
         radial-gradient(circle at 40% 40%, #fde047 5%, #fde04700 15%),
         radial-gradient(circle at 60% 60%, #6ee7b7 10%, #6ee7b700 20%),
         radial-gradient(circle at 40% 60%, #7dd3fc 10%, #7dd3fc00 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #a78bfa 0%,
           #fde047 calc(25% / 5),
           #6ee7b7 calc(50% / 5),
           #7dd3fc calc(75% / 5),
           #a78bfa calc(100% / 5)
         )`;

export type GlowingBorderLayerProps = {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
};

/** Pointer-reactive border glow; pairs with `.glow-effect` in globals. */
export const GlowingBorderLayer = memo(function GlowingBorderLayer({
  blur = 4,
  inactiveZone = 0.01,
  proximity = 80,
  spread = 50,
  glow = true,
  className,
  disabled = false,
  movementDuration = 1,
  borderWidth = 3,
}: GlowingBorderLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const effectiveDisabled = disabled || reduceMotion;

  const handleMove = useCallback(
    (e?: MouseEvent | PointerEvent | { x: number; y: number }) => {
      if (!containerRef.current || effectiveDisabled) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const element = containerRef.current;
        if (!element) return;

        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = e && "x" in e ? e.x : lastPosition.current.x;
        const mouseY = e && "y" in e ? e.y : lastPosition.current.y;

        if (e && "x" in e) {
          lastPosition.current = { x: mouseX, y: mouseY };
        }

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty("--active", isActive && glow ? "1" : "0");

        if (!isActive) return;

        const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
        const targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        animate(currentAngle, newAngle, {
          duration: movementDuration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => {
            element.style.setProperty("--start", String(value));
          },
        });
      });
    },
    [effectiveDisabled, glow, inactiveZone, movementDuration, proximity],
  );

  useEffect(() => {
    if (effectiveDisabled) return;
    const handleScroll = () => handleMove();
    const handlePointerMove = (e: PointerEvent) => handleMove(e);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove, effectiveDisabled]);

  const cssVars = {
    "--spread": spread,
    "--start": "0",
    "--active": "0",
    "--glowingeffect-border-width": `${borderWidth}px`,
    "--gradient-light": GLOW_GRADIENT_LIGHT,
    "--gradient-dark": GLOW_GRADIENT_DARK,
    "--blur": `${blur}px`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      style={cssVars}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity duration-300",
        "before:content-[''] before:rounded-[inherit] before:absolute before:border-transparent before:bg-fixed before:transition-opacity before:duration-300 before:opacity-[var(--active)] glow-effect",
        className,
      )}
    />
  );
});

GlowingBorderLayer.displayName = "GlowingBorderLayer";

interface GlowingCardProps extends GlowingBorderLayerProps {
  className?: string;
  borderWidth?: number;
}

const GlowingCard = memo(
  ({
    children,
    blur = 4,
    inactiveZone = 0.01,
    proximity = 80,
    spread = 50,
    glow = true,
    className,
    disabled = false,
    movementDuration = 1,
    borderWidth = 3,
  }: PropsWithChildren<GlowingCardProps>) => {
    const [{ isClick }] = useHero();

    return (
      <motion.div
        className={cn("relative h-full rounded-3xl glass-landing", className)}
        style={{ padding: `${borderWidth}px` }}
        initial="rest"
        animate={!isClick ? "rest" : "expanded"}
        variants={{
          rest: {
            width: "500px",
            height: "400px",
          },
          expanded: {
            width: "580px",
            height: "500px",
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
        }}
      >
        {children}
        <GlowingBorderLayer
          blur={blur}
          inactiveZone={inactiveZone}
          proximity={proximity}
          spread={spread}
          glow={glow}
          disabled={disabled}
          movementDuration={movementDuration}
          borderWidth={borderWidth}
        />
      </motion.div>
    );
  },
);

GlowingCard.displayName = "GlowingCard";
export default GlowingCard;
