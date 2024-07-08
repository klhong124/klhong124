import FlipWords from "@/ui/flip-words";
import Background from "@/ui/background";


export default function Home() {

  return (
    <Background>
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Crafting High-Efficiency Websites <br />
        with <FlipWords className="text-white" />
      </div>
    </Background>
  );



}