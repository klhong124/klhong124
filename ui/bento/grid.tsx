"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

const bentoConfig: { [key: number]: string } = {
    1: " xl:col-span-2 xl:row-span-4 xl:order-1   order-2 col-span-2 row-span-2", //Profile
    2: " xl:col-span-2 xl:row-span-2 xl:order-2   order-3 col-span-2", //Pixel Perfect
    3: " xl:col-span-1 xl:row-span-3 xl:order-3   order-4", //Experience
    4: " xl:col-span-1 xl:row-span-3 xl:order-4   order-5", //Location
    5: " xl:col-span-2 xl:row-span-6 xl:order-5   row-start-2 col-span-4 row-span-3 order-1", //Introduction
    6: " xl:col-span-2 xl:row-span-3 xl:order-6   order-8 col-span-2", //Code-Patterns
    7: " xl:col-span-1 xl:row-span-3 xl:order-7   order-6 row-span-2", //Animation
    8: " xl:col-span-1 xl:row-span-4 xl:order-8   order-7 row-span-3", // SkillSet
    9: " xl:col-span-2 xl:row-span-4 xl:order-9   order-9 col-span-2 row-span-2", // Work
    10: "xl:col-span-1 xl:row-span-3 xl:order-10  order-10 row-span-2", // Optimization
    11: "xl:col-span-3 xl:row-span-2 xl:order-11  order-11 col-span-3", // Hashtag
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
        transition: { ...motionConfig, delay: 0.3 }
    },
    3: {
        initial: { x: "calc(100% + 24px)", y: "-100%", opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: {
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

        initial: { y: "200%", opacity: 0 },
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
    return (
        <div
            className={cn(
                "grid gap-4 p-4 min-h-[900px] w-screen ",
                "xl:grid-cols-6 xl:grid-rows-10 xl:gap-4 xl:h-screen xl:max-w-screen-3xl",
                "grid-cols-4 grid-rows-10 h-[200vh] max-w-screen-lg",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    children,
    className,
    id,
    invisible = false,
}: {
    children?: React.ReactNode;
    className?: string;
    id: number;
    invisible?: boolean;
}) => {
    return (
        <motion.section
            className={cn(
                "backdrop-blur-xs",
                " w-full relative rounded-3xl",
                id !== 5 && "overflow-hidden",
                !invisible && "border-2 border-stone-100/10  shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                !invisible && "[background-image:radial-gradient(96%_100%_at_top,rgba(255,255,255,0.2),rgba(255,255,255,0))] bg-stone-900/30",
                bentoConfig[id],
                className
            )}
            initial={animationConfig[id]?.initial || {}}
            animate={animationConfig[id]?.animate || {}}
            transition={animationConfig[id]?.transition || {}}
        >
            {children}
        </motion.section>

    );
};

export const BentoCenter = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <BentoGrid>
            <BentoGridItem id={1} invisible />
            <BentoGridItem id={2} invisible />
            <BentoGridItem id={3} invisible />
            <BentoGridItem id={4} invisible />
            <BentoGridItem id={5} className={className} invisible>
                {children}
            </BentoGridItem>
            <BentoGridItem id={6} invisible />
            <BentoGridItem id={7} invisible />
            <BentoGridItem id={8} invisible />
            <BentoGridItem id={9} invisible />
            <BentoGridItem id={10} invisible />
            <BentoGridItem id={11} invisible />
        </BentoGrid>
    );
};


export default BentoGrid;