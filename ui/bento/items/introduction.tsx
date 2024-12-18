"use client";
import WindowControl from "@/ui/windowControl";
import Hello from "@/ui/hello";
import { motion } from "motion/react";
import Highlight from "@/ui/highlight";
import { cn } from "@/utils/cn";

export default function introduction() {
    return (
        <>
            <WindowControl />

            <Hello animated />
            <motion.p className={cn(
                "text-md text-gray-400 absolute-center text-center mt-16 w-full",
                "3xl:px-24 2xl:px-12 xl:px-8"
            )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
            >

                I am Ryan, a London based
                <Highlight>Web Developer</Highlight>
                <Highlight animationDelay={0.3}>Front-end Specialist</Highlight>
                <Highlight animationDelay={0.6}>UX Enthusiast</Highlight>
                with a passion for crafting stunning applications.
            </motion.p>


        </>
    );
}