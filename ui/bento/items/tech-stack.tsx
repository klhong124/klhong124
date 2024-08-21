"use client";
import React, { Suspense, memo, useEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, MotionValue, useMotionValue } from "framer-motion";
import Scene from "@/ui/bento/items/scene";
import { useHover } from "@/context/hover"; // Add this import
import { useMousePosition } from "@/context/mouse";
import useMeasure from "react-use-measure";

const TechStack = memo(() => {
    const isHover = useHover();

    const [ref, bounds] = useMeasure({ scroll: true });
    const { x, y } = useMousePosition();

    const mouseX: MotionValue<number> = useMotionValue(0);
    const mouseY: MotionValue<number> = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        if (!isHover) {
            resetMousePosition()
        } else {
            mouseX.set(x - bounds.x - bounds.width / 2);
            mouseY.set(y - bounds.y - bounds.height / 2);
        }
    }, [x, y, bounds]);

    return (
        <MotionConfig transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
        }}>
            <motion.button
                className={cn("overflow-visible")}
                animate={isHover ? "hover" : "rest"}
                onHoverStart={() => resetMousePosition()}
                onHoverEnd={() => resetMousePosition()}
                ref={ref}
            >

                <motion.div
                    className={cn("w-full h-full",
                        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                        "pointer-events-none",
                    )}
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
                    <Suspense fallback={<></>}>
                        <Scene
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    </Suspense>
                </motion.div>

            </motion.button>
        </MotionConfig>
    );
});

export default TechStack;