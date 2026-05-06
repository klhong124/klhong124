"use client";
import HeroSection from "@/components/heroSection";
import { AboutSection } from "@/components/sections/about";
import { FeaturedWorkSection } from "@/components/sections/featured-work";
import { SystemsDesignSection } from "@/components/sections/systems-design";
import { AiAugmentedSection } from "@/components/sections/ai-augmented";
import { ExperienceSectionV2 } from "@/components/sections/experience";
import { TechStackSectionV2 } from "@/components/sections/tech-stack";
import { ContactSectionV2 } from "@/components/sections/contact";
export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      <FeaturedWorkSection />
      <SystemsDesignSection />
      <AiAugmentedSection />
      <ExperienceSectionV2 />
      <TechStackSectionV2 />
      <ContactSectionV2 />
    </div>
  );
}
