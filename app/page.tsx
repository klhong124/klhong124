import HeroSection from "@/components/heroSection";
import PortfolioBelowFold from "@/components/portfolio/BelowFold";
import { SmoothScrollProvider } from "@/components/portfolio/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative">
        <HeroSection />
        <PortfolioBelowFold />
      </div>
    </SmoothScrollProvider>
  );
}


