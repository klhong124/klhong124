import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";
import Highlight from "@/ui/highlight";
import BentoGrid, { BentoGridItem as GridItem } from "@/ui/bento/grid";
import { CardDemo } from "@/ui/bento/items/card";
import TechBoard from "@/ui/bento/items/tech-board";
import ComingSoon from "@/ui/bento/items/coming-soon";
export default function Home() {

  return (
    <>
      <Background>
        <div className="px-2 text-neutral-600 dark:text-neutral-300 relative overflow-hidden">
          <div className=" text-xl sm:text-4xl mx-auto font-normal">
            Crafting High-Efficiency Websites <br />
            with <FlipWords className="text-white" />
          </div>
          <div className="mt-2 sm:mt-4">
            With the power of <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight> and more
          </div>
        </div>
      </Background >
      <BentoGrid className="-mt-24">
        <GridItem id={1}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={2}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={3}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={4}>
          <CardDemo />
        </GridItem>
        <GridItem id={5}>
          <TechBoard />
        </GridItem>
        <GridItem id={6}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={7}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={8}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={9}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={10}>
          <ComingSoon/>
        </GridItem>
        <GridItem id={11}>
          <ComingSoon/>
        </GridItem>
      </BentoGrid>
    </>
  );



}