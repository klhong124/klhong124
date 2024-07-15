import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";
import Highlight from "@/ui/highlight";
import BentoGrid, { BentoGridItem } from "@/ui/bento-grid";
import { CardDemo } from "@/ui/card";
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
          COMING SOON... 1
        </BentoGridItem>
        <BentoGridItem id={2}>
          COMING SOON... 2
        </BentoGridItem>
        <BentoGridItem id={3}>
          COMING SOON...3
        </BentoGridItem>
        <BentoGridItem id={4}>
          <CardDemo />
        </BentoGridItem>
        <BentoGridItem id={5}>
          COMING SOON...5
        </BentoGridItem>
        <BentoGridItem id={6}>
          COMING SOON...6
        </BentoGridItem>
        <BentoGridItem id={7}>
          COMING SOON...   7     </BentoGridItem>
        <BentoGridItem id={8}>
          COMING SOON...8
        </BentoGridItem>
        <BentoGridItem id={9}>
          COMING SOON...9
        </BentoGridItem>
        <BentoGridItem id={10}>
          COMING SOON...10
        </BentoGridItem>
        <BentoGridItem id={11}>
          COMING SOON...11
        </BentoGridItem>
      </BentoGrid>
    </>
  );



}