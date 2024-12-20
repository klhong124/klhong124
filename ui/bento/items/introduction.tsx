"use client";
import WindowControl from "@/ui/windowControl";
import Hello from "@/ui/hello";
import { motion } from "motion/react";
import Highlight from "@/ui/highlight";
import { cn } from "@/utils/cn";

export default function introduction() {
    return (
        <div className="flex-center flex-wrap h-full">
            <WindowControl />
            <Hello animated />
            <motion.p className={cn(
                "text-md text-gray-400  text-center mt-28 p-12 w-full max-w-2xl",
            )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
            >

                I am Ryan, a
                <Highlight>Web Developer</Highlight>
                <Highlight animationDelay={1.2}>Front-end Specialist</Highlight>
                <Highlight animationDelay={2.4}>UX Enthusiast</Highlight>
                with a passion for crafting stunning applications.
            </motion.p>
        </div>
    );
}