"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const brandColors = {
        react: "from-sky-400 to-sky-600 dark:text-sky-100 text-sky-950",
        vue: "from-emerald-400 to-emerald-600 dark:text-emerald-100 text-emerald-950",
        graphql: "from-rose-400 to-rose-600 dark:text-rose-100 text-rose-950",
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