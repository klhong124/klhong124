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
        <BentoGridItem span={[2, 4]}>
          INCREASED PERFORMANCE 146%
        </BentoGridItem>
        <BentoGridItem span={[2, 2]}>
          AVAILABLE NOW!
        </BentoGridItem>
        <BentoGridItem span={[1, 3]}>
          HI!
        </BentoGridItem>
        <BentoGridItem span={[1, 3]}>
          BEST IN CLASS
        </BentoGridItem>
        <BentoGridItem span={[2, 6]}>
          100% VECTOR
        </BentoGridItem>
        <BentoGridItem span={[2, 3]}>
          DASHBOARD
        </BentoGridItem>
        <BentoGridItem span={[1, 3]}>
          NEW!
        </BentoGridItem>
        <BentoGridItem span={[1, 4]}>
          DUO TONE COLOR
        </BentoGridItem>
        <BentoGridItem span={[2, 4]}>
          ADD TO FAVORITES
        </BentoGridItem>
        <BentoGridItem span={[1, 3]}>
          FACE
        </BentoGridItem>
        <BentoGridItem span={[3, 2]}>
          PLACE FOR YOUR TEXT
        </BentoGridItem>
      </BentoGrid>
    </>
  );



}