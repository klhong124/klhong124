"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useVisibility } from "@/hooks/useVisibility";

const bentoConfig: { [key: number]: string } = {
    1: " xl:col-span-2 xl:row-span-4 xl:order-1   md:order-2 md:col-span-2 md:row-span-5   order-2 col-span-2 row-span-3", //Profile
    2: " xl:col-span-2 xl:row-span-2 xl:order-2   md:order-8 md:col-span-2 md:row-span-2   order-5 col-span-2", //Pixel Perfect
    3: " xl:col-span-1 xl:row-span-3 xl:order-3   md:order-4 md:row-span-3                 order-3 row-span-2", //Experience
    4: " xl:col-span-1 xl:row-span-3 xl:order-4   md:order-5 md:row-span-3                 order-4 row-span-2", //Location
    5: " xl:col-span-2 xl:row-span-6 xl:order-5   md:col-span-4 md:row-span-6 md:order-1   order-1 col-span-2 row-span-4", //Introduction
    6: " xl:col-span-2 xl:row-span-3 xl:order-6   md:order-3 md:col-span-2 md:row-span-3   order-6 col-span-2 row-span-2", //Code-Patterns
    7: " xl:col-span-1 xl:row-span-3 xl:order-7   md:order-6 md:row-span-3                 order-7 row-span-2", //Animation
    8: " xl:col-span-1 xl:row-span-4 xl:order-8   md:order-7 md:row-span-6                 order-8 row-span-4", // SkillSet
    9: " xl:col-span-2 xl:row-span-4 xl:order-9   md:order-10 md:col-span-2 md:row-span-3  order-10 col-span-2 row-span-3", // Work
    10: "xl:col-span-1 xl:row-span-3 xl:order-10  md:order-9 md:row-span-3                 order-9 row-span-2", // Optimization
    11: "xl:col-span-3 xl:row-span-2 xl:order-11  md:order-11 md:col-span-4 md:row-span-3  order-11 col-span-2 row-span-3", // SoftSkills
};

const motionConfig = {
    ease: "easeOut",
    duration: 0.3
}
const animationConfig: {
    [key: number]: {
        initial: Record<string, any>;
        animate: Record<string, any>;
        transition: Record<string, any>;
    }
} = {
    1: {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ...motionConfig }
    },
    2: {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ...motionConfig }
    },
    3: {
        initial: { x: "calc(100% + 24px)", y: "-100%", opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: {
            opacity: { ...motionConfig, delay: 0.3 },
            x: { ...motionConfig, delay: 0.8 },
            y: { ...motionConfig, delay: 0.3 }
        }
    },
    4: {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.8 }
    },
    6: {
        initial: { x: "100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.1 }
    },
    7: {
        initial: { x: "-100%", y: "calc(100% + 24px)", opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: {
            x: { ...motionConfig },
            y: { ...motionConfig, delay: 0.5 }
        }
    },
    8: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.2 }
    },
    9: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.6 }
    },
    10: {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.5 }
    },
    11: {
        initial: { x: "50%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { ...motionConfig, delay: 0.4 }
    },
};

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    const { setIsVisible } = useVisibility();

    return (
        <motion.section
            onMouseEnter={() => {
                setIsVisible(true);
            }}

            className={cn(
                "grid gap-2 md:gap-4 p-2 md:p-4 w-screen",
                "xl:grid-cols-6 xl:grid-rows-10 xl:gap-4 xl:h-screen xl:max-w-screen-3xl xl:min-h-[900px]",
                "md:grid-cols-4 md:grid-rows-[repeat(20,minmax(0,1fr))] md:max-w-screen-lg md:h-[2160px]",
                "grid-cols-2 grid-rows-[repeat(22,minmax(0,1fr))] h-[2860px]",
                className
            )}
        >
            {children}
        </motion.section >
    );
};

export const BentoGridItem = ({
    children,
    className,
    id,
}: {
    children?: React.ReactNode;
    className?: string;
    id: number;
}) => {
    const { isVisible } = useVisibility();

    return (
        <motion.section

            className={cn(
                "w-full relative glass overflow-hidden",
                bentoConfig[id],
                className
            )}
            initial={"hidden"}
            variants={{
                "hidden": animationConfig[id]?.initial,
                "visible": animationConfig[id]?.animate
            }}
            animate={isVisible ? "visible" : "hidden"}
            transition={isVisible ? animationConfig[id]?.transition || {} : { duration: 0 }}
        >
            {children}
        </motion.section>

    );
};

export default BentoGrid;