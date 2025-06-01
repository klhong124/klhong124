'use client'
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TextHoverEffect = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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

    if (!isMounted) {
        return (
            <div className={className}>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 100"
                    className="select-none"
                >
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        strokeWidth="0.5"
                        className="font-[helvetica] font-bold stroke-neutral-500 fill-transparent text-7xl"
                        style={{ opacity: 0 }}
                    >
                        {children}
                    </text>
                </svg>
            </div>
        );
    }

    return (
        <motion.div className={className}
            initial={{
                bottom: -20
            }}
            whileHover={{
                bottom: -5
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
                    className="font-[helvetica] font-bold stroke-neutral-500 fill-transparent text-7xl"
                    style={{ opacity: hovered ? 0.7 : 0 }}
                >
                    {children}
                </text>
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="1"
                    className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-500"
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
                    {children}
                </motion.text>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="0.5"
                    mask="url(#textMask)"
                    className="font-[helvetica] font-bold fill-transparent text-7xl"
                >
                    {children}
                </text>
            </svg>
        </motion.div>
    );
};

export default TextHoverEffect;