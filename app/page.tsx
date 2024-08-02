import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";
import Highlight from "@/ui/highlight";
import BentoGrid, { BentoGridItem as GridItem } from "@/ui/bento/grid";
import { CardDemo } from "@/ui/bento/items/card";
import TechStack from "@/ui/bento/items/tech-stack";
import PixelPerfect from "@/ui/bento/items/pixel-perfect";
import ComingSoon from "@/ui/bento/items/coming-soon";
import { cn } from "@/utils/cn";

export default function Home() {

  return (
    <div>
      <Background>
        <div className={cn(
          "h-screen flex items-center justify-center",
        )}>
          <div>
            <div className={cn(
              "text-xl sm:text-4xl md:text-5xl mx-auto font-semibold tracking-wide",
              "text-slate-300"
            )}>
              Crafting High-Efficiency Websites <br />
              with <FlipWords className="text-slate-300" />
            </div>
            <div className="mt-2 sm:mt-4">
              With the power of <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight> and more
            </div>
          </div>

        </div>
        <BentoGrid className="-mt-12 overflow-x-hidden">
          <GridItem id={1}>
            <ComingSoon />
          </GridItem>
          <GridItem id={2}>
            <ComingSoon />
          </GridItem>
          <GridItem id={3}>
            <ComingSoon />
          </GridItem>
          <GridItem id={4}>
            <CardDemo />
          </GridItem>
          <GridItem id={5}>
            <TechStack />
          </GridItem>
          <GridItem id={6}>
            <ComingSoon />
          </GridItem>
          <GridItem id={7}>
            <ComingSoon />
          </GridItem>
          <GridItem id={8}>
            <ComingSoon />
          </GridItem>
          <GridItem id={9}>
            <ComingSoon />
          </GridItem>
          <GridItem id={10}>
            <ComingSoon />
          </GridItem>
          <GridItem id={11}>
            <PixelPerfect />
          </GridItem>
        </BentoGrid>
      </Background >

    </div>
  );



}