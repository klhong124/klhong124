"use client";
import Hero from '@/ui/hero';
import { MotionConfig } from "motion/react";
import { HeroContextProvider } from "@/hooks/useHero";
import Dock from "@/ui/dock";
import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import SoftSkills from '@/ui/bento/items/soft-skills';
import SkillSet from "@/ui/bento/items/skill-set";
import Profile from "@/ui/bento/items/profile";
import Animation from "@/ui/bento/items/animation";
import Location from "@/ui/bento/items/location";
import Work from "@/ui/bento/items/work";
import Testing from "@/ui/bento/items/optimization";
import { VisibilityProvider } from "@/hooks/useVisibility";
// @ts-ignore
import ReactFullpage from '@fullpage/react-fullpage';
import TextHoverEffect from "@/ui/textHoverEffect";
import WindowControl from '@/ui/windowControl';
import Timeline from "@/ui/timeline";
import { cn } from '@/utils/cn';

export default function Home() {
  return (
    <ReactFullpage
      credits={{ enabled: false }}
      scrollingSpeed={700}
      scrollOverflow={true}
      // licenseKey={"1234567890"}
      render={({ }) => (
        <div id="fullpage-wrapper">
          <div className="section h-screen ">
            <HeroContextProvider>
              <MotionConfig
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  stiffness: 100,
                }}
              >
                <Hero />
              </MotionConfig>
              <Dock />
            </HeroContextProvider>
          </div>
          <div className="section w-screen mt-12 overflow-y-auto">
            <VisibilityProvider>
              <BentoGrid className="h-full mx-auto">
                <GridItem id={1}>
                  <Location />
                </GridItem>
                <GridItem id={2}>
                  <PixelPerfect />
                </GridItem>
                <GridItem id={3}>
                  <Experience />
                </GridItem>
                <GridItem id={4}>
                  <Location />
                </GridItem>
                <GridItem id={5}>
                  <Profile />
                </GridItem>
                <GridItem id={6}>
                  <CodePattern />
                </GridItem>
                <GridItem id={7}>
                  <Animation />
                </GridItem>
                <GridItem id={8}>
                  <SkillSet />
                </GridItem>
                <GridItem id={9}>
                  <Work />
                </GridItem>
                <GridItem id={10}>
                  <Testing />
                </GridItem>
                <GridItem id={11}>
                  <SoftSkills />
                </GridItem>
              </BentoGrid>
            </VisibilityProvider>
          </div>

          <div className="section h-screen">
            <div className="flex-center">

              <div
                className={cn("glass max-w-5xl py-24 px-6 md:px-24 my-24 mx-6 md:mx-24")}
              >
                <TextHoverEffect>WORK</TextHoverEffect>
                <Timeline />
                <WindowControl />
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}


