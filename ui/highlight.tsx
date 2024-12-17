"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import React from "react";

export const Highlight = ({
    children,
    animationDelay = 0,
    className,
}: {
    children: React.ReactNode;
    className?: string;
    animationDelay?: number;
}) => {

    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 1,
                ease: "linear",
                delay: 2.5 +animationDelay,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline-block",
            }}
            className={cn(
                `relative inline-block px-2 rounded-md bg-gradient-to-br mx-1 mt-1`,
                `from-sky-600/50 to-sky-800/50 text-sky-200`,
                className,
            )}
        >
            {children}
        </motion.span>
    );
};

export default Highlight;