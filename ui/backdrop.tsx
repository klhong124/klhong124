"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useLayoutEffect, useEffect, useState, useMemo } from "react";
import Highlight from "@/ui/highlight";
export const Backdrop = () => {
    return (
        <>
            <Ability />
            <Introduction />
            <Portfolio />
        </>
    );
};


const Introduction = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div className={cn(
            "absolute bottom-12 left-12 text-stone-300/20 uppercase",
        )}>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.75 }}
                className="text-3xl text-stone-300/20 mt-2"
            >
                <div>london based</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-3xl text-stone-300/20"
            >
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
            </motion.div>
            <div className={cn("uppercase tracking-widest text-7xl")}>
                ryan.dev
                <div className={cn("text-2xl")}>
                    +852 HongKongese
                </div>
            </div>
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
            "border-l-4 border-r-4 border-emerald-950"
        )}>
            <motion.div
                className="flex flex-col"

            >
                <div
                    className={cn(
                        "inline-block uppercase text-[100px] tracking-widest text-emerald-950",
                        " pt-12 ",
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

const Ability = () => {
    return (
        <motion.div className={cn(
            "absolute top-12 left-12 w-full",
            "text-stone-400 leading-snug"
        )}>
            <div className="text-5xl tracking-wide">

                Crafting Web Applications <br />
                with <FlipWords className="text-stone-400" />
            </div>
            <div className="mt-4 text-md">
                <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight>
            </div>
        </motion.div>
    );
};

const FlipWords = ({
    words = [
        "Seamless Integration",
        "AI-Driven Insights",
        "Stunning Visuals",
        "Cutting-Edge Technology",
        "Elegant Animations",
        "Modern Frameworks"
    ],

    className,
}: Readonly<{
    words?: readonly string[];
    className?: string;
}>) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const currentWord = useMemo(() => words[currentWordIndex], [words, currentWordIndex]);

    const startAnimation = useCallback(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(true);
    }, [words.length]);

    useLayoutEffect(() => {
        if (!isAnimating) {
            const timer = setTimeout(() => {
                startAnimation();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isAnimating, startAnimation]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    stiffness: 100,
                    damping: 10,
                }}
                exit={{
                    opacity: 0,
                    filter: "blur(12px)",
                }}
                className={cn(
                    "inline-block text-left absolute ml-2",
                    className
                )}
                key={currentWord}
            >
                {currentWord.split("").map((letter, index) => {
                    const isSpace = letter === " ";

                    // ease out the animation
                    const reverseIndex = currentWord.length - index - 1;
                    const opacity = [0.7, 0.75, 0.8, 0.85, 0.9];
                    const blur = [1, 0.8, 0.6, 0.4, 0.2];
                    const blurAmount = blur[reverseIndex] || 0;
                    const opacityAmount = opacity[reverseIndex] || 1;

                    return isSpace ? (
                        <span key={currentWord + index} className="inline-block">&nbsp;</span>
                    ) : (
                        <motion.span
                            key={currentWord + index}
                            initial={{
                                opacity: 0,
                                y: 10,
                                filter: "blur(8px)"
                            }}
                            animate={{
                                opacity: opacityAmount,
                                y: 0,
                                filter: `blur(${blurAmount}px)`
                            }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                            }}
                            className="inline-block"
                            style={{ willChange: "opacity, transform, filter" }}
                        >
                            {letter}
                        </motion.span>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
};

export default Backdrop;