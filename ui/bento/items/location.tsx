"use client";
import DottedMap from "dotted-map";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";
const map = new DottedMap({ height: 40, grid: "vertical" });

map.addPin({
    lat: 53.4808,
    lng: -2.2426,
    data: "Manchester",
});


const points = map.getPoints();

const Background = ({ ...props }: {
    className?: string;
}) => {
    return (
        <svg
            viewBox="0 0 80 40"
            {...props}
        >
            {points.map((point, index) => (
                point.data
                    ? <motion.circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        initial={{
                            r: 0.3,
                            opacity: 0.25
                        }}
                        animate={{
                            r: [0.3, 0.5, 0.3],
                            opacity: [0.25, 1, 0.25]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity
                        }}
                        fill="white"
                    />
                    : <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={0.3}
                        fill="white"
                        style={{ opacity: 0.25 }}
                    />
            ))}
        </svg>
    );
}

const Location = () => {
    return (
        <div className="size-full relative ">
            <Background />
            <div className={cn("absolute bottom-0 w-full text-center",
                "bg-gradient-to-t from-stone-900 from-65% to-transparent")}
            >
                <div className="flex-center mb-6">
                    <div>
                        <div>
                            <span className="text-secondary">
                                Based in
                            </span>
                            <span className="mx-2">🇬🇧</span>
                        </div>
                        <span className={cn("text-4xl text-primary font-semibold tracking-wider mt-4")}>
                            LONDON
                        </span>
                    </div>
                </div>
                <div className="opacity-50 mb-4">
                    <span className="text-secondary">
                        from
                    </span>
                    <span className="mx-2">🇭🇰</span>
                    <span className="text-secondary">Hong Kong</span>
                </div>
            </div>
        </div >
    );
}

export default Location;