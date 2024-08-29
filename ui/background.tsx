"use client";
import { motion, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useMouse } from '@/hooks/useMouse';
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import { usePathname } from "next/navigation";

export const Background = ({
    children,
    ...prop
}: {
    children: React.ReactNode;
    [key: string]: any;
}) => {
    const [mouse, setMouse] = useMouse()
    const pathname = usePathname();


    const handleMouseMove = (event: React.MouseEvent) => {
        setMouse(prevMouse => ({
            ...prevMouse,
            x: event.clientX,
            y: event.clientY,
        }));
    };

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
            className="relative flex items-center bg-stone-950 justify-center w-full overflow-hidden"
            onMouseMove={throttle(handleMouseMove, 100)}
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