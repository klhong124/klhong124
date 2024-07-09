import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";
import Highlight from "@/ui/highlight";


export default function Home() {

  return (
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
  );



}