"use client";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
export function Optimization() {
    return (
        <motion.div
            className={cn(
                "size-full rounded-2xl flex flex-col justify-center",
                "text-left px-6"
            )}
        >
            <div className={cn("text-primary pb-3",
                "text-xl")}>
                Testing, Deployment, and Performance optimization
            </div>
        </motion.div>
    );
}

export default Optimization;