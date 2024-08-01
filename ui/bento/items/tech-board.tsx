"use client";
import React, { Suspense, useState } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, useMotionValue, MotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Scene from "@/ui/bento/items/scene";


export function TechBoard() {
    const [ref, bounds] = useMeasure({ scroll: true });
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isPress, setIsPress] = useState<boolean>(false);
    const mouseX: MotionValue<number> = useMotionValue(0);
    const mouseY: MotionValue<number> = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <MotionConfig transition={{
            type: "spring",
            duration: 0.7,
            stiffness: 100,
        }}>
            <motion.button
                className={cn("h-full w-full overflow-visible relative")}
                ref={ref}
                animate={isHover ? "hover" : "rest"}

                onHoverStart={() => {
                    resetMousePosition();
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    resetMousePosition();
                    setIsHover(false);
                }}
                onTapStart={() => setIsPress(true)}
                onTap={() => setIsPress(false)}
                onTapCancel={() => setIsPress(false)}
                onPointerMove={(e) => {
                    mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                    mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                }}
            >
                <motion.div
                    className={
                        cn("top-1 bottom-1 left-1 right-1")
                    }
                    variants={{
                        rest: { opacity: 0 },
                        hover: {
                            opacity: 1,
                        }
                    }}
                >
                    <div
                        className={
                            cn("w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                                "pointer-events-none scale-95",
                            )
                        }
                    >

                        <Suspense fallback={null}>
                            <Scene
                                isHover={isHover}
                                isPress={isPress}
                                mouseX={mouseX}
                                mouseY={mouseY}
                            />
                        </Suspense>
                    </div>
                </motion.div>
                <motion.div
                    className="text-white text-7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    Tech
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
}




export default TechBoard;