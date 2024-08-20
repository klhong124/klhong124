import Background from "@/ui/background";
import TechStack from '@/ui/bento/items/tech-stack';
import { cn } from "@/utils/cn";

export default function Home() {

  return (
    <div>
      <Background>

        <div className={cn(
          "h-screen w-screen",
        )}>
                <TechStack />

          {/* <div>
            <div className={cn(
              "text-xl sm:text-4xl md:text-5xl mx-auto tracking-wide",
              "text-slate-300"
            )}>
              Crafting High-Efficiency Websites <br />
              with <FlipWords className="text-slate-300" />
            </div>
            <div className="mt-2 sm:mt-4">
              With the power of <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight> and more
            </div>
          </div> */}

        </div>

      </Background >
    </div >
  );



}