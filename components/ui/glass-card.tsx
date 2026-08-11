"use client";

import { memo, useCallback, useEffect, useRef, type PropsWithChildren } from "react";
import { animate, motion } from "motion/react";
import { cn } from "@/utils/cn";

const ROUND_MAP = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  /** Matches landing `GlowingCard` */
  "3xl": "rounded-3xl",
} as const;

type RoundKey = keyof typeof ROUND_MAP;

type GlassCardProps = PropsWithChildren<{
  className?: string;
  /** Applied to the inner glass panel (e.g. custom padding) */
  innerClassName?: string;
  borderWidth?: number;
  glowBlur?: number;
  glowSpread?: number;
  glowProximity?: number;
  /** Corner radius preset — outer, inner fill, and glow ring stay aligned */
  round?: RoundKey;
}>;

/** Glass panel with landing-style conic glow + spring “grow” on hover */
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
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const handleMove = useCallback(
    (e?: MouseEvent | { x: number; y: number }) => {
      const el = containerRef.current;
      if (!el) return;

      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(() => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const mouseX = e?.x ?? lastPosition.current.x;
        const mouseY = e?.y ?? lastPosition.current.y;
        if (e) lastPosition.current = { x: mouseX, y: mouseY };

        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
        const inactiveRadius = 0.5 * Math.min(width, height) * 0.01;

        if (distanceFromCenter < inactiveRadius) {
          el.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - glowProximity &&
          mouseX < left + width + glowProximity &&
          mouseY > top - glowProximity &&
          mouseY < top + height + glowProximity;

        el.style.setProperty("--active", isActive ? "1" : "0");
        if (!isActive) return;

        const currentAngle = parseFloat(el.style.getPropertyValue("--start")) || 0;
        const targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        animate(currentAngle, newAngle, {
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value) => el.style.setProperty("--start", String(value)),
        });
      });
    },
    [glowProximity],
  );

  useEffect(() => {
    const onScroll = () => handleMove();
    const onPointer = (ev: PointerEvent) => handleMove(ev);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [handleMove]);

  const lightGradient = `radial-gradient(circle, #7dd3fc 12%, #7dd3fc00 22%),
         radial-gradient(circle at 40% 40%, #a78bfa 6%, #a78bfa00 16%),
         radial-gradient(circle at 60% 60%, #6ee7b7 10%, #6ee7b700 20%),
         radial-gradient(circle at 40% 60%, #fde047 8%, #fde04700 18%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #7dd3fc 0%,
           #a78bfa calc(25% / 5),
           #6ee7b7 calc(50% / 5),
           #fde047 calc(75% / 5),
           #7dd3fc calc(100% / 5)
         )`;

  const darkGradient = `radial-gradient(circle, rgb(var(--accent) / 0.45) 10%, transparent 22%),
         radial-gradient(circle at 35% 30%, #a78bfa 8%, #a78bfa00 18%),
         radial-gradient(circle at 65% 55%, #22d3ee 8%, #22d3ee00 18%),
         radial-gradient(circle at 45% 65%, #c4b5fd 6%, #c4b5fd00 16%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #a78bfa 0%,
           #22d3ee calc(25% / 5),
           #c4b5fd calc(50% / 5),
           #fde68a calc(75% / 5),
           #a78bfa calc(100% / 5)
         )`;

  const cssVars = {
    "--spread": glowSpread,
    "--start": "0",
    "--active": "0",
    "--glowingeffect-border-width": `${borderWidth}px`,
    "--gradient-light": lightGradient,
    "--gradient-dark": darkGradient,
    "--blur": `${glowBlur}px`,
  } as React.CSSProperties;

  return (
    <motion.div
      className={cn("relative", rounded, className)}
      style={{ padding: `${borderWidth}px` }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      <div className={cn("glass relative h-full min-h-0 overflow-hidden p-6", rounded, innerClassName)}>{children}</div>
      <div
        ref={containerRef}
        style={cssVars}
        className={cn(
          "pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300 glow-effect",
          rounded,
        )}
      />
    </motion.div>
  );
});
