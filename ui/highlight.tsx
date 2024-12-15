"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import React from "react";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const brandColors = {
        react: "from-sky-500/50 to-sky-700/50 text-sky-200",
        vue: "from-emerald-500/50 to-emerald-700/50 text-emerald-200",
    };

    return (
        <motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 2,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block px-2 rounded-md bg-gradient-to-r`,
                className,
                brandColors[children?.toString().toLowerCase() as 'react' | 'vue']
            )}
        >
            {children}
        </motion.span>
    );
};

export default Highlight;