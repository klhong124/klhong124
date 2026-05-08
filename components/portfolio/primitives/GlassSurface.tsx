"use client";

import { cn } from "@/utils/cn";
import { GlowingBorderLayer } from "@/ui/glowing-card";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type GlassSurfaceProps = {
  children: ReactNode;
  className?: string;
  /** Pointer-reactive conic border (same system as hero GlowingCard). */
  glow?: boolean;
  glowBorderWidth?: number;
};

export function GlassSurface({
  children,
  className,
  glow = true,
  glowBorderWidth = 2,
}: GlassSurfaceProps) {
  const reduceMotion = useReducedMotion();
  const showGlow = glow && !reduceMotion;

  return (
    <div
      className={cn(
        "relative min-h-0 min-w-0 rounded-[26px]",
        showGlow && "shadow-[0_40px_100px_-55px_rgba(0,0,0,0.75)]",
      )}
      style={showGlow ? { padding: `${glowBorderWidth}px` } : undefined}
    >
      <div
        className={cn(
          "relative isolate border border-white/[0.14]",
          "bg-[linear-gradient(145deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_42%,rgba(12,14,28,0.86)_100%)]",
          "backdrop-blur-[18px] shadow-[0_0_0_1px_rgba(255,255,255,0.07)_inset,0_30px_80px_-38px_rgba(0,0,0,0.88)]",
          "overflow-hidden",
          showGlow ? "rounded-[23px]" : "rounded-[26px]",
          className,
        )}
      >
        {!reduceMotion ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-[-20%] top-[-30%] h-[340px] w-[340px] rounded-full bg-indigo-500/35 blur-3xl"
              animate={{ x: [0, 120, -40], y: [0, 70, -20], opacity: [0.32, 0.52, 0.4] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute bottom-[-40%] right-[-10%] h-[380px] w-[380px] rounded-full bg-sky-500/30 blur-3xl"
              animate={{ x: [0, -90, 30], y: [0, -50, 20], opacity: [0.28, 0.45, 0.34] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
          </>
        ) : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(99,102,241,0.45),transparent_55%)] opacity-30"
          />
        )}
        <div className="relative z-10 min-h-0">{children}</div>
      </div>
      {showGlow && (
        <GlowingBorderLayer
          borderWidth={glowBorderWidth}
          proximity={72}
          spread={48}
          blur={3}
        />
      )}
    </div>
  );
}
