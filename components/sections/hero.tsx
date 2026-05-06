"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/shared/section";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { GradientText } from "@/components/shared/gradient-text";

const roles = ["Frontend Engineer", "UI Architect", "AI-Augmented Developer", "Systems Designer"];

export function HeroSectionV2() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(timer);
  }, []);
  return (
    <Section id="hero" className="min-h-[85vh] pt-24">
      <p className="mb-6 inline-flex rounded-full border border-white/20 px-3 py-1 text-xs text-muted">
        Currently @ BuiltByPixel - Next.js · GraphQL · Algolia
      </p>
      <h1 className="font-display text-5xl leading-tight md:text-8xl">
        <GradientText>FRONTEND</GradientText>
        <br />
        ARCHITECT
      </h1>
      <motion.p key={roles[index]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 text-xl text-muted">
        {roles[index]}
      </motion.p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#work"><MagneticButton>View Projects</MagneticButton></a>
        <a href="/Ryan-Kwan-CV.pdf"><MagneticButton>Download CV</MagneticButton></a>
        <a href="#contact"><MagneticButton>Contact</MagneticButton></a>
      </div>
    </Section>
  );
}
