"use client";
import { motion } from "motion/react";
import TextHoverEffect from "@/ui/textHoverEffect";
import Timeline from "@/ui/timeline";
import WindowControl from "@/ui/windowControl";
import { GlassCard } from "@/components/shared/glass-card";

const WorkSection = () => {
    return (
        <motion.div
            className="relative"
        >
            <div className="flex-center h-full">
                <motion.div
                    className="max-w-5xl my-24 mx-6 md:mx-24"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <GlassCard round="3xl" innerClassName="py-24 px-6 md:px-24">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <TextHoverEffect>WORK</TextHoverEffect>
                    </motion.div>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Timeline />
                    </motion.div>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <WindowControl />
                    </motion.div>
                    </GlassCard>
                </motion.div>
            </div>
        </motion.div>
    )
}



export default WorkSection;