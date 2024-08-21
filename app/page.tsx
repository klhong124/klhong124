"use client";
import { Suspense, lazy, useState } from 'react';
const Background = lazy(() => import("@/ui/background"));
const TechStack = lazy(() => import('@/ui/bento/items/tech-stack'));
import MouseContext from '@/context/mouse';
import HoverContext from '@/context/hover';
import { cn } from "@/utils/cn";
import { Window } from "@/ui/window";



export default function Home() {
  const [isHover, setIsHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleHoverStart = () => {
    setIsHover(true);
  };

  const handleHoverEnd = () => {
    setIsHover(false);
  };


  return (
    <Suspense fallback={<>Loading</>}>
      <MouseContext.Provider value={mousePosition}>
        <Background className="h-screen w-screen relative flex justify-center items-center" onMouseMove={handleMouseMove}>
          <HoverContext.Provider value={isHover}>
            <Window
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            >
              <div
                className={cn("text-center")}
              >
                <span className={cn(
                  "text-lg text-secondary",
                )}>Web Developer | Front-end Specialist | UX Enthusiast
                </span>
                <h1 className={cn(
                  "text-primary text-7xl text-center",
                  "font-medium tracking-wide pb-2",
                )}>
                  Ryan Kwan
                </h1>
              </div>
            </Window>
            <TechStack />
          </HoverContext.Provider>

        </Background>
      </MouseContext.Provider>
    </Suspense>
  );
}