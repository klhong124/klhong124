"use client";
import React, { Suspense, useState, memo } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, useMotionValue, MotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Scene from "@/ui/bento/items/scene";

const TechStack = memo(() => {
    const [ref, bounds] = useMeasure({ scroll: true });
    const [isHover, setIsHover] = useState<boolean>(true);
    const mouseX: MotionValue<number> = useMotionValue(0);
    const mouseY: MotionValue<number> = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleHoverStart = () => {
        resetMousePosition();
        setIsHover(true);
    };

    const handleHoverEnd = () => {
        resetMousePosition();
        setIsHover(false);
    };

    const handlePointerMove = (e: any) => {
        mouseX.set(e.clientX - bounds.x - bounds.width / 2);
        mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    };

    return (
        <MotionConfig transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
        }}>
            <motion.button
                className={cn("h-full w-full overflow-visible relative cursor-default rounded-2xl")}
                ref={ref}
                animate={isHover ? "hover" : "rest"}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onPointerMove={handlePointerMove}
            >
                <motion.div
                    className={cn("top-1 bottom-1 left-1 right-1")}
                    variants={{
                        rest: {
                            opacity: 0,
                            transition: {
                                type: "linear"
                            }
                        },
                        hover: {
                            opacity: 1,
                        }
                    }}
                >
                    <div
                        className={cn("w-[800px] h-[800px] scale-150",
                            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                            "pointer-events-none",
                        )}
                    >
                        <Suspense fallback={<></>}>
                            <Scene
                                isHover={isHover}
                                mouseX={mouseX}
                                mouseY={mouseY}
                            />
                        </Suspense>
                    </div>
                </motion.div>
                <motion.div
                    variants={{
                        hover: {
                            scale: 1.2,
                        }
                    }}
                    className={cn("text-center")}
                >
                    <span className={cn(
                        "text-xl text-secondary",
                    )}>Modern Development
                    </span>
                    <h1 className={cn(
                        "text-primary text-6xl text-center",
                        "font-medium tracking-wide",
                    )}>
                        TechStack
                    </h1>
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
});

export default TechStack;