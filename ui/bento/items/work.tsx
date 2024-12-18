"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/utils/cn";

const TextHoverEffect = ({ text }: {
    text: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
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
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className="select-none"
            >
                <defs>
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                        cx="50%"
                        cy="50%"
                        r="25%"
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
                        animate={maskPosition}
                        transition={{ duration: 0, ease: "easeOut" }}

                    // example for a smoother animation below

                    //   transition={{
                    //     type: "spring",
                    //     stiffness: 300,
                    //     damping: 50,
                    //   }}
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

const Thumbnail = ({ year, img, link, ...props }: {
    year: number;
    img: string;
    link: string;
    [key: string]: any;
}) => {
    return (
        <div className={cn('absolute min-w-[350px] top-12')} {...props}>
            <motion.div
                style={{
                    perspective: "1000px",
                }}
                className={cn(
                    "relative",

                )}>
                <Image
                    src={img}
                    alt="thumbnail"
                    width={350}
                    height={250}
                    className={cn(
                        "[transform-style:preserve-3d]",
                        "[transform:rotateY(-60deg)_rotateX(-2deg)]",
                        "shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
                    )}
                />
            </motion.div>
        </div>
    );
};

const Work = () => {
    return (
        <div className="w-full h-full relative">
            {
                [...Array(4)].map((_, index) => (
                    <Thumbnail
                        style={{
                            right: `${index * 80}px`,
                        }}
                        key={index}
                        year={2022}
                        img="/images/cdp.png"
                        link="https://cdpfrontend.prod.kubrickgroup.cloud/" />
                ))
            }

            <TextHoverEffect text="WORK" />
        </div>
    );
};

export default Work;