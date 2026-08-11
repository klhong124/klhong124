import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturedWorkSection } from "@/components/sections/featured-work";
import { ExperienceSection } from "@/components/sections/experience";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ContactSection } from "@/components/sections/contact";

/**
 * Server component. Only the hero and the contact form ship JavaScript; the
 * remaining sections are static renders over local content.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWorkSection />
      <ExperienceSection />
      <TechStackSection />
      <ContactSection />
    </>
  );
}
