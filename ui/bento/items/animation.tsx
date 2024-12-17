"use client";
import { motion } from "motion/react";

export function Animation() {
    return (
        <div className="">
            {/* top left */}
            { Array.from({ length: 5 }).map((_, index) => (
                <motion.div key={index} className="bg-gradient-to-tl from-cyan-600 to-blue-900 w-1/2 h-12 -mt-4"
                    style={{
                        y: index * 10,
                    }}
                />
            ))}


        </div>
    );
}

export default Animation;