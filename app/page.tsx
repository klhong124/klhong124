import Background from "@/ui/background";
import TechStack from '@/ui/bento/items/tech-stack';
import { cn } from "@/utils/cn";

export default function Home() {

  return (
    <div>
      <Background>

        <div className={cn(
          "h-screen w-screen flex justify-center items-center",
        )}>

          <TechStack />

        </div>

      </Background >
    </div >
  );



}