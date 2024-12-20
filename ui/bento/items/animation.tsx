"use client";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
export function Animation() {
    return (
        <motion.div
            className={cn(
                "size-full rounded-2xl flex flex-col justify-center",
                "text-left px-6"
            )}
        >
            <div className="text-secondary">
                release the power of
            </div>
            <div className={cn("text-primary pb-3",
                "text-2xl")}>
                Animation x Interaction
            </div>
        </motion.div>
    );
}

export default Animation;