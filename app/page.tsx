import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";
import Highlight from "@/ui/highlight";
import BentoGrid, { BentoGridItem } from "@/ui/bento-grid";
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
            By the power of <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight> or more
          </div>
        </div>
      </Background >
      <BentoGrid className="-mt-24">
        <BentoGridItem id={1}>
          INCREASED PERFORMANCE 146%
        </BentoGridItem>
        <BentoGridItem id={2}>
          AVAILABLE NOW!
        </BentoGridItem>
        <BentoGridItem id={3}>
          HI!
        </BentoGridItem>
        <BentoGridItem id={4}>
          BEST IN CLASS
        </BentoGridItem>
        <BentoGridItem id={5}>
          100% VECTOR
        </BentoGridItem>
        <BentoGridItem id={6}>
          DASHBOARD
        </BentoGridItem>
        <BentoGridItem id={7}>
          NEW!
        </BentoGridItem>
        <BentoGridItem id={8}>
          DUO TONE COLOR
        </BentoGridItem>
        <BentoGridItem id={9}>
          ADD TO FAVORITES
        </BentoGridItem>
        <BentoGridItem id={10}>
          FACE
        </BentoGridItem>
        <BentoGridItem id={11}>
          PLACE FOR YOUR TEXT
        </BentoGridItem>
      </BentoGrid>
    </>
  );



}