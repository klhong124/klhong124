"use client";
import { motion, useMotionTemplate, AnimatePresence } from "motion/react";
import { useMouse } from '@/hooks/useMouse';
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

export const Background = ({
    children,
    ...prop
}: {
    children: React.ReactNode;
    [key: string]: any;
}) => {
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
            className="relative flex items-center bg-stone-950 justify-center w-full overflow-hidden min-h-screen"
        >
            <div className={cn("absolute inset-0 pointer-events-none bg-dot-thick-neutral-800")} />

            {/* Highlight */}
            <AnimatePresence>
                {
                    !!mouse.x && <motion.div
                        className="pointer-events-none bg-dot-emerald-900 absolute inset-0"
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
                    />
                }
            </AnimatePresence>

            {/* Radial gradient for the container to give a faded look */}
            <div className={cn("absolute pointer-events-none inset-0 bg-stone-950 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]")} />

            <main {...prop}>{children}</main>
        </section >

    );
};

export default Background;