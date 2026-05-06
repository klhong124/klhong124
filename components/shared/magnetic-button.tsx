"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/utils/cn";

export function MagneticButton({
  children,
  className,
  onClick,
  type,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  return (
    <motion.button
      onClick={onClick}
      type={type}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className={cn(
        "rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-fg transition hover:border-white/40 hover:bg-white/10",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
