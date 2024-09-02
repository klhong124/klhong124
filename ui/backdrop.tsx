"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

export const Backdrop = () => {
    return (
        <>
            <TopLeft />
            <BottomLeft />
        </>
    );
};


const TopLeft = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div className={cn(
            "absolute top-0 left-0 text-stone-300/20",
        )}>
            <div className={cn("uppercase tracking-widest text-7xl")}>
                ryan.dev
                <span className={cn("text-2xl")}>
                    HongKongese
                </span>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.75 }}
                className="text-3xl text-stone-300/20 mt-2"
            >
                <div>Based in London</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-3xl text-stone-300/20"
            >
                <div>LOCAL TIME</div>
                <div suppressHydrationWarning>
                    {typeof window !== 'undefined' && currentTime.toLocaleString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        timeZone: 'Europe/London'
                    }).replace(',', '')}
                </div>
                <div>UTC+1</div>
            </motion.div>
        </motion.div>
    );
};

const BottomLeft = () => {
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


    return (
        <div className="absolute bottom-0 left-0  w-full h-full text-stone-300/20 max-w-[32ch]">
            <div className="relative">
                <TextSpinnerLoader skills={skills.slice(0, 6)} />
                <TextSpinnerLoader skills={skills.slice(6, 10)} radius={120} />
            </div>
        </div>
    );
};

const TextSpinnerLoader = ({
    skills,
    radius = 180,
    fontSize = '18px',
    letterSpacing = 8
}: {
    skills: string[],
    radius?: number,
    fontSize?: string,
    letterSpacing?: number
}) => {
    const characters = useMemo(() => skills.slice(0, 6).join("．").split(""), [skills]);
    return (
        <motion.div
            className="absolute-center aspect-square"
            style={{ width: radius * 2 }}
            animate={{
                rotate: 360,
                transition: {
                    duration: 16,
                    ease: "linear",
                    repeat: Infinity
                }
            }}
        >
            <p aria-label={skills.join("．")} />
            <p aria-hidden="true" className="text">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        className={`letter letter-${i} absolute top-0 left-1/2 text-white`}
                        style={{
                            transformOrigin: `0 ${radius}px`,
                            transform: `rotate(${i * letterSpacing}deg)`,
                            fontSize
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </p>
        </motion.div>
    );
};

export default Backdrop;