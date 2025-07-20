"use client";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
export function Optimization() {
    return (
        <motion.div
            className={cn(
                "size-full rounded-2xl flex flex-col justify-center",
                "text-left px-8"
            )}
        >
            <div className={cn("text-secondary pb-3 opacity-80",
                "text-xl leading-relaxed")}>
                I’ve worked for several organizations on a variety of projects, such as a used car online trading marketplace, an in-house e-learning platform, a CMS system, a robust UI component library, and a job-matching platform. These experiences allowed me to contribute to both team-based projects and individual engineering tasks, including end-user testing and building new software applications.
            </div>
        </motion.div>
    );
}

export default Optimization;