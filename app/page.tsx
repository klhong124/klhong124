import FlipWords from "@/ui/flip-words";


export default function Home() {

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Crafting High-Efficiency Websites <br />
        with <FlipWords className="text-white" />
      </div>
    </div>
  );



}