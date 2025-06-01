'use client'

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import jobs from "@/utils/jobs";
import { cn } from "@/utils/cn";

const Timeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState(1000);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setHeight(rect.height);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 30%", "end 100%"],
        layoutEffect: true
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            ref={containerRef}
        >
            <div ref={ref} className="relative mx-auto pb-20">
                {jobs.sort((a, b) => b.year - a.year).map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start py-5 md:py-20 md:gap-10"
                    >
                        <div className="flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-1/2">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
                            </div>
                            {jobs[index - 1]?.year !== item.year && (
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                                    {item.year}
                                </h3>
                            )}
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="text-2xl text-left font-bold text-primary">
                                {item.name}
                            </h3>
                            {item.title && (
                                <h4 className="text-secondary font-semibold opacity-90 mt-1">
                                    {item.title}
                                </h4>
                            )}

                            <div className="flex flex-wrap gap-2 my-4">
                                {
                                    item.tags?.map((tag, index) => (
                                        <span key={index} className=" text-sm text-neutral-400 py-1 px-4 border border-neutral-400 rounded-full">
                                            {tag}
                                        </span>
                                    ))
                                }
                            </div>
                            <p className="text-neutral-400 whitespace-pre-line">
                                {item.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-6">
                                {
                                    item.images && (
                                        Array.isArray(item.images) ? (
                                            item.images.map((image, idx) => (
                                                <div key={idx} className="w-[calc(50%-8px)] min-w-[200px] aspect-video relative">
                                                    <Image
                                                        className={cn(
                                                            "border border-neutral-700 rounded-lg",
                                                            "object-cover object-top",
                                                            "shadow-[0_15px_25px_rgba(0,0,0,0.2)]",
                                                        )}
                                                        src={image}
                                                        alt={`${item.name} ${idx + 1}`}
                                                        fill
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-2/3 min-w-[200px] aspect-video relative">
                                                <Image
                                                    className={cn(
                                                        "border border-neutral-700 rounded-lg",
                                                        "object-cover object-top",
                                                        "shadow-[0_15px_25px_rgba(0,0,0,0.2)]",
                                                    )}
                                                    src={item.images}
                                                    alt={item.name}
                                                    fill
                                                />
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-neutral-600 from-[0%] via-neutral-500 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    )

};


export default Timeline;