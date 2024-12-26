"use client";
import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import { motion, MotionConfig, useInView } from "motion/react";
import throttle from "@/utils/throttle";
import { cn } from "@/utils/cn";

export function Experience() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        margin: "0px 0px -260px 0px",
    });

    const [isTight, setIsTight] = useState<boolean>(false);

    const updateDimensions = useCallback(() => {
        const onResize = throttle(() => {
            if (!ref.current) return;
            setIsTight(ref.current.clientWidth < 250);
        }, 1000);
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [ref]);

    useLayoutEffect(() => {
        updateDimensions();
    }, []);


    return (
        <MotionConfig
            transition={{
                type: "spring",
                duration: 1,
            }}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                className={cn(
                    "size-full rounded-2xl flex flex-col justify-center",
                    isTight ? "text-left p-4" : "items-center p-8 "
                )}
            >
                <div className={cn("text-primary pb-3",
                    isTight ? "text-4xl" : "xl:text-5xl md:text-4xl 3xl:text-6xl")}>
                    {new Date().getFullYear() - 2020} years
                </div>
                <div className="text-secondary">of web dev experience</div>
            </motion.div >
        </MotionConfig >
    );
}


export default Experience;