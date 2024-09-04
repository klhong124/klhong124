"use client";
import { useState, useLayoutEffect } from 'react';
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Window from '@/ui/window';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BentoCenter } from '@/ui/bento/grid';
import Hello from "@/ui/hello";
import Dock from "@/ui/dock";
import { useMouse } from "@/hooks/useMouse";
import Backdrop from "@/ui/backdrop";
import Loading from "@/ui/loading";
import Cursor from "@/ui/cursor";
import throttle from "@/utils/throttle";


export default function Home() {
  const [pageReady, setPageReady] = useState(false);
  const router = useRouter();
  const [mouse, setMouse] = useMouse()
  const [inWindow, setInWindow] = useState(false);

  useLayoutEffect(() => {
    setPageReady(true);
    if (typeof window !== 'undefined') {
      setMouse(prevMouse => ({
        ...prevMouse,
        isClick: false,
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
        <Backdrop />

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
                maxHeight: "400px"
              }}
              animate={mouse.isClick ? {
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
                    <motion.div className='absolute-center w-full'
                      key="main-content"
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
                          "text-lg text-secondary block mb-2 text-center",
                        )}
                      >
                        Web Developer | Front-end Specialist | UX Enthusiast
                      </span>
                      <motion.h1
                        className={cn(
                          "text-primary text-4xl text-center",
                          "font-medium tracking-wide",
                        )}
                      >
                        Ryan Kwan - Portfolio 25'
                      </motion.h1>
                    </motion.div>
                    : <Hello
                      exit={{
                        opacity: 0,
                      }} />
                  }

                  {!pageReady && (
                    <Loading />
                  )}


                  {(mouse.isHover && !mouse.isClick) && (
                    <motion.span
                      key="click-to-explore"
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
          </BentoCenter>
        </MotionConfig>


      </Background>
      <Dock />
      <AnimatePresence>
        {inWindow && <Cursor />}
      </AnimatePresence>
    </div>

  );
}
