import { HeroSection } from "@/components/sections/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutMeSection } from "@/components/sections/about-me";
import { AboutSection } from "@/components/sections/about";
import { WorkSection } from "@/components/sections/featured-work";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ContactSection } from "@/components/sections/contact";

/**
 * Server component. Only the hero, the About Me scroll effect and the contact
 * form ship JavaScript; the remaining sections are static renders over local
 * content.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Below the full-screen hero on purpose: `sticky top-0` means it only
          pins to the viewport once you scroll past the intro. */}
      <SiteHeader />
      <AboutMeSection />
      <AboutSection />
      <WorkSection />
      <TechStackSection />
      <ContactSection />
    </>
  );
}
