"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlassCard } from "@/components/shared/glass-card";

const items = [
  ["builtbypixel", "BuiltByPixel client projects"],
  ["three-d-experiments", "3D Portfolio Experiments"],
  ["ai-workflows", "AI-assisted frontend workflows"],
] as const;

export function FeaturedWorkSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = wrapRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".project-card"), { opacity: 0.4, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%" } });
  }, []);

  return (
    <Section id="work">
      <SectionHeading eyebrow="Featured" title="Projects as Product Launches" />
      <div ref={wrapRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([slug, title]) => (
          <Link key={slug} href={`/work/${slug}`} className="project-card block h-full">
            <GlassCard className="h-full" round="2xl" innerClassName="flex min-h-[140px] flex-col p-6">
              <p className="text-lg text-fg">{title}</p>
              <p className="mt-auto pt-3 text-sm text-muted">Case study -&gt;</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
