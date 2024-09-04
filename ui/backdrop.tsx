"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

export const Backdrop = () => {
    return (
        <>
            <TopLeft />
            <Portfolio />
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

const Portfolio = () => {
    // const skills: string[] = [
    //     "Framer Motion",
    //     "Vercel",
    //     "AWS",
    //     "Docker",
    //     "Git",
    //     "Azure",
    //     "Google Cloud Platform",
    //     "Bun",
    //     `Javascript`,
    //     `Node.js`,
    //     `Typescript`,
    //     `Vue`,
    //     `Nuxt.js`,
    //     `Pinia`,
    //     `React`,
    //     `Next.js`,
    //     `Storybook`,
    //     `Tailwind CSS`,
    //     `Scss`,
    //     `Pixi.js`,
    //     `ApolloGraphQL`,
    //     `Python`,
    //     `OCR`,
    //     `Selenium`,
    //     `Web Scraping`,
    //     `SQL`,
    //     `php`,
    //     `Laravel`,
    //     `MongoDB`,
    //     `Serverless`,
    //     ` Functions`,
    //     `Firebase`,
    //     `Stripe`,
    //     `Twilio`,
    //     `Shopify`,
    //     `GSAP`,
    //     `Three.js`,
    //     `jQuery`,
    //     `EJS`,
    //     `Arduino`,
    //     `Cypress.js`,
    //     `Jest`,
    //     `Processing`,
    //     `Figma`,
    //     `UX Design`,
    //     `PhotoShop`,
    //     `Illustrator`,
    //     `After Effect`,
    //     `Animation`,
    //     `Motion Graphics`,
    //     `Davinci Resolve`,
    //     `Premiere Pro`,
    //     `Photography`
    // ]


    return (
        <div className={cn("absolute right-24 top-0 h-screen overflow-hidden",
            "border-l-4 border-r-4 border-sky-950"
        )}>
            <motion.div
                className="flex flex-col"

            >

                <div
                    className={cn(
                        "inline-block uppercase text-[100px] tracking-widest text-sky-950",
                        " h-screen",
                    )}
                    style={{
                        writingMode: "vertical-rl",
                    }}
                >
                    Portfolio 2025
                </div>

            </motion.div>
        </div>
    );
};


export default Backdrop;