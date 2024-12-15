"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, useTransform, useSpring } from "motion/react";
import { cn } from "@/utils/cn";
import { interpolate } from "flubber";


const skills: string[] = [
    "Framer Motion",
    "Vercel",
    "AWS",
    "Docker",
    "Git",
    "Azure",
    "Google Cloud Platform",
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
    ` Functions`,
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

// pathState 0 for up, 1 for stop, 2 for down
const paths: string[] = [
    "M8,0L2,16L8,14L13.994,16L7.994,0.015",
    "M14,8C14,11.314 11.314,14 8,14C4.686,14 2,11.314 2,8C2,4.686 4.686,2 8,2C11.314,2 14,4.686 14,8",
    "M8,16L2,0L8,2L13.994,0L7.994,15.985",
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
        setSpeed(parseFloat(((midPoint - currentMouseY) * 0.02).toFixed(1)));
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

    return (
        <div
            ref={ref}
            className={cn("h-full relative overflow-hidden")}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpeed(0)}
        >
            {/* mouse tracker */}
            <div className="absolute inset-0 ml-4">
                <motion.div className={cn(
                    "h-[300%] w-[2px] absolute -translate-y-1/3 -translate-x-1/2",
                    'bg-gradient-to-b from-violet-800 via-cyan-800 to-indigo-900',
                )}
                    style={{
                        top: offsetTracker.get() + '%'
                    }}
                />
                <motion.div className={cn(
                    "h-4 w-4 absolute -translate-x-1/2 ",
                )}
                    style={{
                        top: (offsetTracker.get() + 100) / 2 + '%'
                    }}
                >
                    <svg width="16" height="16" className="text-cyan-700">
                        <motion.path fill="currentColor" d={path} />
                    </svg>
                </motion.div>
            </div>



            <motion.div
                className={cn("ml-12")}
                ref={listRef}
                style={{ y: position }}
            >
                {[...skills, ...skills].map((skill, index) => (
                    <motion.div
                        key={index}
                        className="text-primary cursor-default py-1"
                        whileHover={{
                            x: 10,
                            scale: 1.1
                        }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default SkillSet;