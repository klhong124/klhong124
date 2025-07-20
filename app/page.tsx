"use client";
import HeroSection from "@/components/heroSection";
import BentoSection from "@/components/bentoSection";
import WorkSection from "@/components/workSection";
export default function Home() {

  return (
    <div  className="relative">
      {/* Hero Section */}
        <HeroSection />

      {/* Bento Grid Section */}
        <BentoSection />

      {/* Work Section */}
      <WorkSection />
    </div>
  );
}


