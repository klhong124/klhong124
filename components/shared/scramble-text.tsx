"use client";
import { motion } from "motion/react";

export function ScrambleText({ text }: { text: string }) {
  return <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{text}</motion.span>;
}
