"use client";

import { TESTIMONIALS } from "@/data/portfolio-content";
import { GlassSurface } from "@/components/portfolio/primitives/GlassSurface";
import { Reveal } from "@/components/portfolio/primitives/Reveal";
import { SectionShell } from "@/components/portfolio/primitives/SectionShell";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <SectionShell
      id="voices"
      label="Signal / Noise"
      title="Manager feedback as premium proof."
      subtitle={
        <>
          Cards echo Notion + Linear calm: generous spacing, glass depth, and typography that lets the words do
          the convincing. Replace quotes in <code className="text-indigo-200/90">data/portfolio-content.ts</code>{" "}
          with verbatim testimonials when you publish.
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((quote, i) => (
          <Reveal key={quote.author + quote.role} delay={0.06 * i}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 24 }}>
              <GlassSurface className="h-full p-7">
                <Quote className="h-6 w-6 text-indigo-200/85" aria-hidden />
                <blockquote className="mt-6 space-y-6">
                  <p className="text-[15px] leading-relaxed text-slate-200">{`“${quote.quote}”`}</p>
                  <footer className="border-t border-white/10 pt-4 text-sm">
                    <cite className="not-italic font-semibold text-white">{quote.author}</cite>
                    <p className="text-slate-400">{quote.role}</p>
                  </footer>
                </blockquote>
              </GlassSurface>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
