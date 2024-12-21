"use client";
import { useState, useEffect } from 'react';
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Window from '@/ui/window';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BentoCenter } from '@/ui/bento/grid';
import Hello from "@/ui/hello";
import { useMouse } from "@/hooks/useMouse";
import Loading from "@/ui/loading";
import Cursor from "@/ui/cursor";
import throttle from "@/utils/throttle";
import IndicatorText from "@/ui/indicatorText";


export default function Home() {
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();
  const [mouse, setMouse] = useMouse()
  const [inWindow, setInWindow] = useState(false);

  useEffect(() => {
    setPageReady(true);
    if (typeof window !== 'undefined') {
      setMouse(prevMouse => ({
        ...prevMouse,
        isClick: false,
        isHover: false,
      }));
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setMouse(prevMouse => ({
      ...prevMouse,
      x: event.clientX,
      y: event.clientY,
    }));
    setInWindow(true);
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
    }, 300);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={throttle(handleMouseMove, 100)} onMouseLeave={() => setInWindow(false)}>

      <Background
        className="relative flex justify-center items-center"
      >

        <MotionConfig
          transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
          }}
        >

          <BentoCenter className="flex-center">
            <Window
              className={cn("cursor-pointer size-full flex-center")}
              onTapStart={handleTapStart}
              onTap={handleTapCancel}
              onTapCancel={handleTapCancel}
              onMouseEnter={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              whileTap={{
                scale: 0.95
              }}
              initial={{
                maxWidth: "450px",
                maxHeight: "400px"
              }}
              animate={mouse.isClick ? {
                maxWidth: "1200px",
                maxHeight: "800px",
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                }
              } : {
                maxHeight: "400px"
              }}

            >
              <Link href="/explore" draggable={false}
                className='size-full flex-center select-none'
                onClick={handleClick} prefetch={true}>
                <AnimatePresence>

                  {(!mouse.isClick) ?
                    <motion.div
                      className='absolute-center w-full'
                      key="welcome-content"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 1,
                        }
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <span
                        className={cn(
                          "text-lg  block mb-2 text-center",
                        )}
                      >
                        👋🏽 Say hello to
                      </span>
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.2
                          }
                        }}
                        className={cn(
                          "text-primary text-4xl text-center",
                          "font-medium tracking-wide",
                        )}
                      >
                        @ryankwandev
                      </motion.h1>
                    </motion.div>
                    : <Hello
                      key="hello-animation"
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.3
                        }
                      }} />
                  }

                  {!pageReady && (
                    <Loading key="loading-screen" />
                  )}


                  {(mouse.isHover && !mouse.isClick) && (
                    <IndicatorText className="mt-auto mb-4">Click to Explore</IndicatorText>
                  )}
                </AnimatePresence>
              </Link>
            </Window>
            <TechStack />
          </BentoCenter>
        </MotionConfig>


      </Background>

      <AnimatePresence>
        {(inWindow && !mouse.isClick) && <Cursor />}
      </AnimatePresence>
    </div>

  );
}
