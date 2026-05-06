"use client";

import { motion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      {children}
    </motion.div>
  );
}
