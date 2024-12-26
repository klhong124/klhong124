"use client";
import Background from "@/ui/background";
import TechStack from '@/ui/tech-stack';
import Hero from '@/ui/hero';
import { cn } from "@/utils/cn";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BentoCenter } from '@/ui/bento/grid';
import Hello from "@/ui/hello";
import { useHero, HeroContextProvider } from "@/hooks/useHero";
import Loading from "@/ui/loading";
import IndicatorText from "@/ui/indicatorText";


export default function Home() {


  return (
    <div
      className="relative w-screen h-screen overflow-hidden"

    >
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
            <HeroContextProvider>
              <Hero
                className={cn("cursor-pointer size-full flex-center")}            >
                <HeroContent />

              </Hero>
              <TechStack />
            </HeroContextProvider>
          </BentoCenter>
        </MotionConfig>


      </Background>
    </div>

  );
}


const HeroContent = () => {
  const router = useRouter();
  const [{ isHover, isClick }, setHero] = useHero();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setHero(prev => ({
      ...prev,
      isClick: true
    }));
    router.prefetch('/explore');

    setTimeout(() => {
      router.push("/explore");
    }, 300);
  };

  return (
    <Link href="/explore" draggable={false}
      className='size-full flex-center select-none'
      onClick={handleClick} prefetch={true}>
      <AnimatePresence>
        {(!isClick) ?
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


        {/* <Loading key="loading-screen" /> */}



        {(isHover && !isClick) && (
          <IndicatorText className="mt-auto mb-4">Click to Explore</IndicatorText>
        )}
      </AnimatePresence>
    </Link>
  )
}