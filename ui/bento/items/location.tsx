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
        <div className="size-full relative">
            <Background />
            <div className="flex-center mt-2">
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

            <div className="absolute bottom-6 opacity-50 w-full text-center">
                <span className="text-secondary">
                    from
                </span>
                <span className="mx-2">🇭🇰</span>
                <span className="text-secondary">Hong Kong</span>
            </div>
        </div>
    );
}

export default Location;