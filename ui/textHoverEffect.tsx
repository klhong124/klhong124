'use client'
import { motion, useInView } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { spring } from "@/lib/motion/tokens";

const TextHoverEffect = ({
    children,
    className,
    viewBox = "0 0 300 100",
    textClassName = "text-7xl",
}: {
    children: React.ReactNode;
    className?: string;
    /** Tune to the text — the default suits a word, "0 0 100 100" suits a numeral. */
    viewBox?: string;
    /** Font-size class for the SVG text, sized in viewBox units. */
    textClassName?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });
    // SVG ids are document-global, so multiple instances on one page must not
    // share gradient/mask ids or they all read the first instance's mask.
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
    const gradientId = `textGradient-${uid}`;
    const maskGradientId = `revealMask-${uid}`;
    const maskId = `textMask-${uid}`;
    // Re-run the stroke draw on every viewport entry: the dash offset resets
    // instantly while off-screen, then draws again when scrolled back in.
    const inView = useInView(svgRef, { amount: 0.3 });

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
        // Animates `y` rather than `bottom`: the original animated a layout
        // property on hover, which forced a reflow every frame.
        <motion.div
            className={cn("relative", className)}
            transition={spring.settle}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox={viewBox}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className="select-none"
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        {/* This was a five-stop rainbow reading `var(--yellow-500)`,
                            `var(--red-500)` and friends — none of which were ever
                            defined, so every stop resolved to nothing and the
                            reveal came out black on black. Now it ramps through
                            the one accent, which is both defined and on-brand. */}
                        {hovered && (
                            <>
                                <stop offset="0%" stopColor="rgb(var(--accent-soft))" />
                                <stop offset="50%" stopColor="rgb(var(--accent))" />
                                <stop offset="100%" stopColor="rgb(var(--accent-strong))" />
                            </>
                        )}
                    </linearGradient>

                    <motion.radialGradient
                        id={maskGradientId}
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
                    <mask id={maskId}>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill={`url(#${maskGradientId})`}
                        />
                    </mask>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.5"
                    className={cn("font-[helvetica] font-bold stroke-neutral-500 fill-transparent", textClassName)}
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
                    className={cn("font-[helvetica] font-bold fill-transparent stroke-neutral-500", textClassName)}
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{
                        strokeDashoffset: inView ? 0 : 1000,
                        strokeDasharray: 1000,
                    }}
                    transition={
                        inView
                            ? { duration: 4, ease: "easeInOut" }
                            : { duration: 0 }
                    }
                >
                    {children}
                </motion.text>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="0.5"
                    mask={`url(#${maskId})`}
                    className={cn("font-[helvetica] font-bold fill-transparent", textClassName)}
                >
                    {children}
                </text>
            </svg>
        </motion.div>
    );
};

export default TextHoverEffect;