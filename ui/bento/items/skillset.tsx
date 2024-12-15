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
    const [speed, setSpeed] = useState(0);
    const [position, setPosition] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const midPoint = rect.height / 2;
        const delta = Math.abs(mouseY - midPoint) < 20
            ? 0
            : (midPoint - mouseY) * 0.1; // Using delta for smoother speed control
        setSpeed(delta);
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        const updatePosition = () => {
            setPosition(prev => {
                const listHeight = ref.current?.clientHeight ?? 0;
                const maxScroll = Math.max(0, listHeight);

                const newPosition = prev + speed;
                // Clamp the position between -maxScroll and 0
                return Math.min(0, Math.max(-maxScroll, newPosition));
            });
            animationFrameId = requestAnimationFrame(updatePosition);
        };

        animationFrameId = requestAnimationFrame(updatePosition);
        return () => cancelAnimationFrame(animationFrameId);
    }, [speed]);

    return (
        <div
            className={cn("h-full relative overflow-hidden")}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setSpeed(0)}
        >
            <div className="h-full bg-primary w-1 absolute"></div>
            <motion.div
                className="pl-4"
                style={{ y: position }}
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className="text-primary cursor-default"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 10 }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default SkillSet;