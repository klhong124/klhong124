"use client";
import { motion, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useMouse } from "@/hooks/useMouse";
import { cn } from "@/utils/cn";

export const Background = ({
    children,
    ...prop
}: {
    children: React.ReactNode;
    [key: string]: any;
}) => {
    const mouse = useMouse();

    const maskImageStyle = useMotionTemplate`
        radial-gradient(
            300px circle at ${mouse.x}px ${mouse.y}px,
            black 0%,
            transparent 100%
        )
    `;

    return (
        <section
            className="relative flex items-center bg-stone-950 justify-center w-full overflow-hidden"
        >
            <div className={cn("absolute inset-0 pointer-events-none bg-dot-thick-neutral-800",
                !mouse.isClick ? "bg-dot-thick-neutral-800" : "bg-black"
            )} />


            <AnimatePresence>
                {!mouse.isClick && (
                    <>
                        {/* Radial gradient for the container to give a faded look */}
                        <div className={cn("absolute pointer-events-none inset-0  bg-stone-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]")}></div>

                        {/* Highlight */}
                        <motion.div
                            className="pointer-events-none bg-dot-emerald-900 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                            style={{
                                WebkitMaskImage: maskImageStyle,
                                maskImage: maskImageStyle,
                            }}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "linear",
                                }
                            }}
                        />
                    </>
                )}
            </AnimatePresence>

            <main {...prop}>{children}</main>
        </section >
    );
};

export default Background;