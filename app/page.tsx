"use client";
import { Suspense, useState, useLayoutEffect } from 'react';
import Loading from '@/ui/loading';
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Window from '@/ui/window';
import MouseContext, { Mouse } from '@/context/mouse';
import { cn } from "@/utils/cn";
import { motion, MotionConfig } from "framer-motion";



export default function Home() {
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, isHover: false, isTap: false });

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

  return (
    <Suspense fallback={<Loading />}>
      <MouseContext.Provider value={mouse}>
        <Background className="h-screen w-screen relative flex justify-center items-center" onMouseMove={handleMouseMove}>
          <MotionConfig
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 100,
            }}
          >
            <Window
              className={cn("cursor-pointer")}
              onTapStart={handleTapStart}
              onTap={handleTapCancel}
              onTapCancel={handleTapCancel}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              whileTap={{
                scale: 0.95
              }}
            >
              <motion.div
                className={cn("")}
              >
                <motion.span
                  className={cn(
                    "text-lg text-secondary",
                  )}
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 1,
                      ease: "easeInOut"
                    }
                  }}
                >
                  Web Developer | Front-end Specialist | UX Enthusiast
                </motion.span>
                <motion.h1
                  className={cn(
                    "text-primary text-7xl text-center",
                    "font-medium tracking-wide pb-2",
                  )}
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 1,
                      ease: "easeInOut"
                    }
                  }}
                >
                  Ryan Kwan
                </motion.h1>
              </motion.div>
            </Window>
          </MotionConfig>
          <TechStack />

        </Background>
      </MouseContext.Provider>
    </Suspense >
  );
}