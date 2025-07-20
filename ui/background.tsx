"use client";
import { motion, useMotionTemplate, AnimatePresence } from "motion/react";
import { useMouse } from '@/hooks/useMouse';
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import LetterGlitch from '@/ui/letter-glitch';

export const Background = () => {
    const [mouse] = useMouse()
    const pathname = usePathname();

    const maskImageStyle =
        useMotionTemplate`
        radial-gradient(
            300px circle at ${mouse.x}px ${mouse.y}px,
            black 0%,
            transparent 100%
        )
    `;

    return (

        <section
            className="bg-stone-950 fixed top-0 left-0 w-screen h-screen -z-50"
        >

            <div className={cn("absolute inset-0 pointer-events-none bg-dot-thick-neutral-800")} />

            <AnimatePresence>
                {
                    !!mouse.x && <motion.div
                        className="pointer-events-none  absolute inset-0"
                        style={{
                            WebkitMaskImage: maskImageStyle,
                            maskImage: maskImageStyle,
                        }}
                        animate={{
                            opacity: pathname === "/" ? 1 : 0.3,
                        }}
                        transition={{
                            duration: 1,
                        }}
                    >
                        <LetterGlitch
                            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                            glitchSpeed={20}
                            centerVignette={true}
                            outerVignette={false}
                            smooth={true}
                        />
                    </motion.div>
                }
            </AnimatePresence>

            <div className={cn("absolute pointer-events-none inset-0 bg-stone-950 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]")} />


        </section >

    );
};

export default Background;