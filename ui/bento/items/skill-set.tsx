"use client";
import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useTransform, useSpring } from "motion/react";
import { cn } from "@/utils/cn";
import { interpolate } from "flubber";
import throttle from "@/utils/throttle";

const skills: Record<string, string[]> = {
    'Tech Stack': [
        "Framer Motion",
        "Vercel",
        "AWS",
        "Docker",
        "Git",
        "Azure",
        "Cloud Run",
        "Bun",
        `Javascript`,
        `Node.js`,
        `Typescript`,
        `Vue`,
        `Nuxt.js`,
        `Pinia`,
        `React`,
        `Next.js`,
        `Storybook`,
        `Tailwind CSS`,
        `Scss`,
        `Pixi.js`,
        `ApolloGraphQL`,
        `Python`,
        `OCR`,
        `Selenium`,
        `Web Scraping`,
        `SQL`,
        `php`,
        `Laravel`,
        `MongoDB`,
        `Serverless`,
        `Firebase`,
        `Stripe`,
        `Twilio`,
        `Shopify`,
        `GSAP`,
        `Three.js`,
        `jQuery`,
        `EJS`,
        `Arduino`,
        `Cypress.js`,
        `Jest`,
        `Processing`,
    ],
    'Design Tools': [
        `Figma`,
        `UX Design`,
        `PhotoShop`,
        `Illustrator`,
        `After Effect`,
        `Animation`,
        `Motion Graphics`,
        `Davinci Resolve`,
        `Premiere Pro`,
        `Photography`
    ]
}

// pathState 0 for up, 1 for stop, 2 for down
const paths: string[] = [
    "M12,0l-11,24l11,-4l11,4l-11,-24",
    "M18,12C18,15.314 15.314,18 12,18C8.686,18 6,15.314 6,12C6,8.686 8.686,6 12,6C15.314,6 18,8.686 18,12",
    "M12,24l-11,-24l11,4l11,-4l-11,24",
]

export function SkillSet() {
    const [speed, setSpeed] = useState<number>(0);
    const [position, setPosition] = useState(0);

    const ref = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const offsetTracker = useSpring(0, {
        stiffness: 100,
        damping: 15
    });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const currentMouseY = e.clientY - rect.top;
        const midPoint = rect.height / 2;
        offsetTracker.set((currentMouseY - midPoint) / (rect.height / 2) * 100);
        setSpeed(parseFloat(((midPoint - currentMouseY) * 0.03).toFixed(1)));
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        const updatePosition = () => {
            setPosition(prev => {
                const listHeight = listRef.current?.clientHeight ?? 0;
                const newPosition = prev + speed;

                if (newPosition <= -listHeight / 2) {
                    return 0;
                }
                if (newPosition >= 0) {
                    return -listHeight / 2;
                }
                return newPosition;
            });
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        if (Math.abs(speed) > 0) {
            animationFrameId = requestAnimationFrame(updatePosition);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [speed]);



    const pathState = useSpring(0, { stiffness: 100, damping: 15 });
    const path = useTransform(pathState, paths.map((_, i) => i), paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 5 })
    });

    useEffect(() => {
        if (speed === 0) {
            pathState.set(1);
        } else {
            speed > 0 ? pathState.set(0) : pathState.set(2);
        }
    }, [speed]);

    const [isTight, setIsTight] = useState<boolean>(false);

    const updateDimensions = useCallback(() => {
        const onResize = throttle(() => {
            if (!ref.current) return;
            setIsTight(ref.current.clientWidth < 250);
        }, 1000);
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    useLayoutEffect(() => {
        updateDimensions();
    }, []);

    return (
        <div
            ref={ref}
            className={cn("h-full", isTight ? "px-4" : "px-8")}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpeed(0)}
        >
            {/* overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-900 to-transparent pointer-events-none z-10 rounded-b-3xl" />

            <motion.div
                className={cn(isTight ? "pl-6" : "pl-10")}
                ref={listRef}
                style={{ y: position }}
            >
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index}>
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="cursor-default">
                                <div className="flex items-center py-2">
                                    <h3 className="text-primary text-lg font-bold mr-3">{category}</h3>
                                    <hr className="w-full flex-1 opacity-50" />
                                </div>
                                {items.sort().map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="text-secondary py-1"
                                        whileHover={{
                                            scale: 1.1,
                                            x: 12
                                        }}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
            {/* mouse tracker */}
            <div>
                <motion.div className={cn(
                    "h-[300%] w-[2px] absolute -translate-y-1/3 -translate-x-1/2",
                    'bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700',
                )}
                    style={{
                        top: offsetTracker.get() + '%'
                    }}
                />
                <motion.div className={cn(
                    "h-6 w-6 absolute -translate-x-1/2",
                )}
                    style={{
                        top: (offsetTracker.get() + 100) / 2 + '%'
                    }}
                >
                    <svg width="24" height="24" className="text-slate-500" >
                        <motion.path fill="currentColor" d={path} />
                    </svg>
                </motion.div>
            </div>

        </div>
    );
}

export default SkillSet;