'use client'
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

const WindowControl = () => {
    const buttonColors = ["bg-red-400", "bg-yellow-400", "bg-green-400"];

    return (
        <div className="absolute top-0 left-0 h-0">
            <motion.div
                className={cn("flex gap-3 p-4 xl:p-6")}
            >
                {buttonColors.map((color, index) => (
                    <motion.span
                        key={color}
                        className={cn(
                            "block rounded-full",
                            "w-3 h-3",
                            color
                        )}
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 10,
                            delay: index * 0.1,
                        }}
                        custom={index}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default WindowControl;
