"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, MotionConfig } from "motion/react";
import throttle from "@/utils/throttle";
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
    const [scrollSpeed, setScrollSpeed] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Use useEffect to handle scrolling based on move state
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const intervalId = setInterval(() => {
            container.scrollTop += scrollSpeed
        }, 16);

        return () => clearInterval(intervalId);
    }, [scrollSpeed]); // Add move as dependency

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const midPoint = rect.height / 2;
        const delta = Math.abs(mouseY - midPoint) < 20 ? 0 : Number((Math.abs(mouseY - midPoint) / rect.height * 20).toFixed(1));
        const speed = delta * (mouseY < midPoint ? -1 : 1);
        setScrollSpeed(speed);
    }, []);

    return (
        <div
            className={cn("overflow-y-scroll h-full no-scrollbar relative")}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setScrollSpeed(0)}
        >
            <div className="h-full bg-primary w-1 absolute"></div>
            <div className="pl-4">
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
            </div>
        </div>
    );
}

export default SkillSet;