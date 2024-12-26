"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useLayoutEffect, useState, useMemo } from "react";
import Highlight from "@/ui/highlight";
import { useHero } from "@/hooks/useHero";
export const Backdrop = () => {
    const [{ isHover, isClick }] = useHero()

    return (
        <motion.div
            className="size-full absolute"
            animate={{
                filter: isHover ? "blur(2px)" : "blur(0px)",
                opacity: isClick ? 0 : 1,
                transition: { duration: 0.3 }
            }}
        >
            <Portfolio />
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

        <div className={
            cn(
                "absolute right-44 top-0 transform -translate-y-1/2 translate-x-1/2 rotate-45",
                "origin-bottom-left"

            )
        }
        >
            <div
                className={cn(
                    "inline-block uppercase text-5xl tracking-widest text-emerald-950",
                    "border-t-2 border-b-2 border-emerald-950 p-4 px-36 -mx-24",
                )}
            >
                Portfolio 2025
            </div>
        </div >
    );

    // return (
    //     <div className={cn("absolute right-24 top-0 h-screen overflow-hidden",
    //         "border-l-4 border-r-4 border-emerald-950"
    //     )}>
    //         <motion.div
    //             className="flex flex-col"

    //         >
    //             <div
    //                 className={cn(
    //                     "inline-block uppercase text-[100px] tracking-widest text-emerald-950",
    //                     " pt-12 ",
    //                 )}
    //                 style={{
    //                     writingMode: "vertical-rl",
    //                 }}
    //             >
    //                 Portfolio 2025
    //             </div>

    //         </motion.div>
    //     </div>
    // );
};

const Introduction = () => {

    return (
        <div className={cn(
            "absolute top-12 left-12 w-full",
            "text-stone-300/90",
        )}>

            <div className="text-5xl tracking-wide leading-snug">
                Crafting Web Applications <br />
                with <FlipWords />
            </div>

            <div className={cn("flex flex-col gap-4 text-stone-500 mt-6")}>


                <div className={cn("text-2xl")}>
                    Web Developer | Front-end Specialist | UX Enthusiast
                </div>
                <div className={cn("text-6xl flex items-start gap-2 uppercase tracking-widest")}>
                    <span className={cn("text-primary opacity-80")}>
                        ryan.dev
                    </span>
                    <span className={cn("text-xl")}>
                        +852 <br />HongKongese
                    </span>
                </div>
                <div>
                    🇬🇧 London based Design Engineer using <Highlight>React</Highlight> or <Highlight>Vue</Highlight> .
                </div>

            </div>

        </div>
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