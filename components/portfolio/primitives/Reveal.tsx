"use client";

import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<MotionProps, "children">;

/** Viewport-triggered stagger-friendly reveal tuned for GPU-friendly transforms. */
export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
