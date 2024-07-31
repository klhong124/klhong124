"use client";
import React, { Suspense, useState } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, useMotionValue, MotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Scene from "@/ui/bento/items/scene";


export function TechBoard() {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState<boolean>(true);
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
            bounce: 0.2
        }}>
            <motion.button
                className={cn("h-full w-full overflow-visible")}
                ref={ref}
                initial={false}
                animate={isHover ? "hover" : "rest"}
                whileTap="press"
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.5 },
                    press: { scale: 1.4 }
                }}
                onHoverStart={() => {
                    resetMousePosition();
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    resetMousePosition();
                    setIsHover(true);
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
                    className={cn("h-full w-full absolute top-0 left-0", "border-2 border-dashed border-gray-400")}
                    variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 }
                    }}
                >
                    <Suspense fallback={null}>
                        <Scene
                            isHover={isHover}
                            isPress={isPress}
                            mouseX={mouseX}
                            mouseY={mouseY}
                        />
                    </Suspense>
                </motion.div>
                <motion.div
                    variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
                >
                    Tech
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
}

const spring = { stiffness: 600, damping: 30 };



export default TechBoard;