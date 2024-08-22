"use client";
import { Suspense, useState, useLayoutEffect } from 'react';
import Loading from '@/ui/loading';
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Window from '@/ui/window';
import MouseContext, { Mouse } from '@/hooks/useMouse';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';



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
    setTimeout(() => {
      router.push("/explore");
    }, 500);
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
              <Link href="/explore" className="w-full h-full relative flex" onClick={handleClick} prefetch={true}>

                <div className={cn("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full")}>
                  <span
                    className={cn(
                      "text-lg text-secondary block mb-2 text-center",
                    )}
                  >
                    Web Developer | Front-end Specialist | UX Enthusiast
                  </span>
                  <motion.h1
                    className={cn(
                      "text-primary text-7xl text-center",
                      "font-medium tracking-wide pb-2",
                    )}
                  >
                    Ryan Kwan
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
                        "mt-auto mx-auto mb-4"
                      )}
                    >
                      - Click to Explore -
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </Window>
          </MotionConfig>
          <TechStack />

        </Background>
      </MouseContext.Provider>
    </Suspense >
  );
}