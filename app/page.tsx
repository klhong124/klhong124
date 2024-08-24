"use client";
import { useState, useLayoutEffect } from 'react';
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Window from '@/ui/window';
import MouseContext, { Mouse } from '@/hooks/useMouse';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import throttle from "@/utils/throttle";



export default function Home() {
  const router = useRouter();
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, isHover: false, isTap: false, isClick: false });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setMouse(prevMouse => ({
        ...prevMouse,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }));
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setMouse(prevMouse => ({
      ...prevMouse,
      x: event.clientX,
      y: event.clientY,
    }));
  };

  const handleHoverStart = () => {
    setMouse(prevMouse => ({
      ...prevMouse,
      isHover: true
    }));
  };

  const handleHoverEnd = () => {
    setMouse(prevMouse => ({
      ...prevMouse,
      isHover: false
    }));
  };

  const handleTapStart = () => {
    setMouse(prevMouse => ({
      ...prevMouse,
      isTap: true
    }));
  };

  const handleTapCancel = () => {
    setMouse(prevMouse => ({
      ...prevMouse,
      isTap: false
    }));
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setMouse(prevMouse => ({
      ...prevMouse,
      isClick: true
    }));
    router.prefetch('/explore');

    setTimeout(() => {
      router.push("/explore");
    }, 500);
  };


  return (


    <MouseContext.Provider value={mouse}>
      <Background className="h-screen w-screen relative flex justify-center items-center" onMouseMove={throttle(handleMouseMove, 100)}>
        <MotionConfig
          transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
          }}
        >
          <BentoGrid>
            <GridItem id={1} />
            <GridItem id={2} />
            <GridItem id={3} />
            <GridItem id={4} />
            <GridItem id={5} className="flex-center">
              <Window
                className={cn("cursor-pointer w-full h-full max-h-[400px] flex-center")}
                onTapStart={handleTapStart}
                onTap={handleTapCancel}
                onTapCancel={handleTapCancel}
                onMouseEnter={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                whileTap={{
                  scale: 0.95
                }}
              >
                <Link href="/explore"
                  className='w-full h-full flex-center'
                  onClick={handleClick} prefetch={true}>

                  <div className='absolute-center w-full'>
                    <span
                      className={cn(
                        "text-lg text-secondary block mb-2 text-center",
                      )}
                    >
                      Web Developer | Front-end Specialist | UX Enthusiast
                    </span>
                    <motion.h1
                      className={cn(
                        "text-primary text-6xl text-center",
                        "font-medium tracking-wide pb-2",
                      )}
                    >
                      Ryan K.
                    </motion.h1>
                  </div>


                  <AnimatePresence>
                    {(mouse.isHover && !mouse.isClick) && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 1,
                            delay: 0.5
                          }
                        }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "font-medium tracking-wide text-secondary",
                          "mt-auto mb-4",
                        )}
                      >
                        - Click to Explore -
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </Window>
              <TechStack />
            </GridItem>
            <GridItem id={6} />
            <GridItem id={7} />
            <GridItem id={8} />
            <GridItem id={9} />
            <GridItem id={10} />
            <GridItem id={11} />
          </BentoGrid>
        </MotionConfig>



      </Background>
    </MouseContext.Provider>


  );
}