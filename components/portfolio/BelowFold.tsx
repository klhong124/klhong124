import AboutCinematicSection from "@/components/portfolio/sections/AboutCinematic";
import AIWorkflowSection from "@/components/portfolio/sections/AIWorkflow";
import ArchitectureSystemsSection from "@/components/portfolio/sections/ArchitectureSystems";
import ContactPremiumSection from "@/components/portfolio/sections/ContactPremium";
import ExperienceTimelineSection from "@/components/portfolio/sections/ExperienceTimeline";
import FeaturedProjectsSection from "@/components/portfolio/sections/FeaturedProjects";
import TechStackExplorerSection from "@/components/portfolio/sections/TechStackExplorer";
import TestimonialsSection from "@/components/portfolio/sections/TestimonialsSection";

export default function PortfolioBelowFold() {
  return (
    <div
      id="portfolio-os"
      className="relative z-10 border-t border-stone-800/40 bg-transparent text-slate-50"
    >
      <AboutCinematicSection />
      <ExperienceTimelineSection />
      <FeaturedProjectsSection />
      <ArchitectureSystemsSection />
      <AIWorkflowSection />
      <TechStackExplorerSection />
      <TestimonialsSection />
      <ContactPremiumSection />
    </div>
  );
}
