"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

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

export function SkillSet() {
    const [speed, setSpeed] = useState<number>(0);
    const [position, setPosition] = useState(0);
    const [mouseY, setMouseY] = useState(0); // Add this new state

    const ref = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const currentMouseY = e.clientY - rect.top;
        const midPoint = rect.height / 2;
        const delta = Math.abs(currentMouseY - midPoint) < 40
        ? 0
        : parseFloat(((midPoint - currentMouseY) * 0.05).toFixed(1));
        setMouseY(currentMouseY); // Update mouseY state
        setSpeed(delta);
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

        if (speed !== 0) {
            animationFrameId = requestAnimationFrame(updatePosition);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [speed]);

    return (
        <div
            ref={ref}
            className={cn("h-full relative overflow-hidden")}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpeed(0)}
        >
            <div className={cn(
                "h-full bg-gray-200 w-0 absolute",
                "ml-3 px-[1px]"
            )}>
                {/* mouse tracker */}
                <div className={cn(
                    "h-4 w-4 bg-gray-200 absolute rounded-full -translate-x-1/2",
                )}
                    style={{
                        top: mouseY - 12
                    }}

                >

                </div>
            </div>
            <motion.div
                className={cn("pl-12")}
                ref={listRef}
                style={{ y: position }}
            >
                {[...skills, ...skills].map((skill, index) => (
                    <motion.div
                        key={index}
                        className="text-primary cursor-default"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default SkillSet;