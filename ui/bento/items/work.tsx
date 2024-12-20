"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import jobs from "@/utils/jobs";
import { cn } from "@/utils/cn";

const TextHoverEffect = ({ text }: {
    text: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage: number = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage: number = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <motion.div className="absolute w-full h-[200%]"
            initial={{
                bottom: '-98%'
            }}
            whileHover={{
                bottom: '-95%'
            }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 300 100"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className="select-none"
            >
                <defs>
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        {hovered && (
                            <>
                                <stop offset="0%" stopColor={"var(--yellow-500)"} />
                                <stop offset="25%" stopColor={"var(--red-500)"} />
                                <stop offset="50%" stopColor={"var(--blue-500)"} />
                                <stop offset="75%" stopColor={"var(--cyan-500)"} />
                                <stop offset="100%" stopColor={"var(--violet-500)"} />
                            </>
                        )}
                    </linearGradient>

                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="20%"
                        initial={{
                            cx: '50%',
                            cy: '50%'
                        }}
                        animate={{
                            ...maskPosition
                        }}
                        transition={{ duration: 0, ease: "easeOut" }}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </motion.radialGradient>
                    <mask id="textMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#revealMask)"
                        />
                    </mask>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.5"
                    className="font-[helvetica] font-bold stroke-neutral-500 fill-transparent text-7xl  "
                    style={{ opacity: hovered ? 0.7 : 0 }}
                >
                    {text}
                </text>
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="1"
                    className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-500 "
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{
                        strokeDashoffset: 0,
                        strokeDasharray: 1000,
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    {text}
                </motion.text>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="0.5"
                    mask="url(#textMask)"
                    className="font-[helvetica] font-bold fill-transparent text-7xl  "
                >
                    {text}
                </text>
            </svg>
        </motion.div>
    );
};

const Thumbnail = ({ img, ...props }: {
    img: string;
    [key: string]: any;
}) => {
    return (
        <motion.div
            {...props}
        >
            <motion.div
                className={cn(
                    "[transform-style:preserve-3d]",
                    "[transform-origin:center]",
                    "[transform:rotateY(-50deg)]",
                    "shadow-[0_15px_25px_rgba(0,0,0,0.2)]",
                    'rounded-xl overflow-hidden',
                    'w-[280px] h-[160px]',
                    'border-2 border-stone-100/10',
                    "relative"
                )}
            >
                <Image
                    src={img}
                    alt="thumbnail"
                    className="object-cover object-right-top"
                    fill
                    sizes="100%"
                    priority
                />
            </motion.div>
        </motion.div >
    );
};

const Work = () => {
    return (
        <div className="w-full h-full relative">
            <TextHoverEffect text="WORK" />

            <div className={cn('flex flex-row-reverse items-center justify-center',
                'xl:scale-[0.7] 2xl:scale-100'
            )}>
                {
                    [...jobs].reverse().map((job, index) => (
                        <Thumbnail
                            className={cn('w-12')}
                            style={{
                                perspective: "1000px",
                                scale: 1 + index * 0.04,
                            }}
                            initial={{
                                x: -120,
                                y: 50
                            }}
                            whileHover={{
                                x: index === jobs.length - 1 ? -120 : -100,
                            }}
                            key={index}
                            img={job.img}
                        />
                    ))
                }
            </div>


        </div>
    );
};

export default Work;