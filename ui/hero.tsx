"use client";
import { cn } from "@/utils/cn";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, MotionStyle } from "motion/react";
import useMeasure from "react-use-measure";
import { useHero } from "@/hooks/useHero";
import throttle, { limit } from "@/utils/throttle";
import WindowControl from "@/ui/windowControl";
import TechStack from '@/ui/tech-stack';
import { AnimatePresence } from "motion/react";
import IndicatorText from "@/ui/indicatorText";
import Highlight from "@/ui/highlight";

const Hero = ({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) => {

    const windowRef = useRef<HTMLDivElement>(null);
    const [ref, bounds] = useMeasure({ scroll: true });
    const [{ isHover, isClick }, setHero] = useHero();

    const handleHoverStart = () => {
        setHero(prev => ({
            ...prev,
            isHover: true
        }));
    };

    const handleHoverEnd = () => {
        setHero(prev => ({
            ...prev,
            isHover: false
        }));
    };

    const handleTapStart = () => {
        setHero(prev => ({
            ...prev,
            isTap: true
        }));
    };

    const handleTapCancel = () => {
        setHero(prev => ({
            ...prev,
            isTap: false
        }));
    };



    const handleHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const x = (e.clientX - bounds.left - bounds.width / 2) / 25;
        const y = (e.clientY - bounds.top - bounds.height / 2) / 25;
        if (!windowRef.current || isClick) return;
        windowRef.current.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    };
    const handleHeroLeave = () => {
        setTimeout(() => {
            if (!windowRef.current) return;
            windowRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }, limit);
    };


    useLayoutEffect(() => {
        if (!windowRef.current) return;
        if (!isHover || isClick) {
            windowRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    }, [isHover, isClick]);

    return (
        <motion.div
            onTapStart={handleTapStart}
            onTap={handleTapCancel}
            onTapCancel={handleTapCancel}
            onMouseEnter={handleHoverStart}
            onMouseMove={throttle(handleHoverStart)}
            onHoverEnd={handleHoverEnd}
            className={cn("cursor-pointer size-full flex-center")}
            style={{
                perspective: "1000px",
                width: "100vw",
                height: "calc(100vh - 100px)",
                zIndex: 0
            }}
            {...props}
            ref={ref}
        >

            <motion.div
                ref={windowRef}
                onMouseMove={throttle(handleHeroMove)}
                onMouseLeave={handleHeroLeave}
                initial='rest'
                animate={!isClick ? 'rest' : 'expanded'}
                variants={{
                    rest: {
                        width: "450px",
                        height: "400px"
                    },
                    expanded: {
                        width: "550px",
                        height: "500px",
                        transition: {
                            duration: 0.1,
                            ease: "easeOut"
                        }
                    },

                }}
                className={cn(
                    "glass",
                    "[transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                    "transition-rotate duration-100"
                )}
            >
                <HeroContent />
                <WindowControl />

            </motion.div>
            <TechStack />

        </motion.div>
    );
};

const HeroContent = () => {
    const [{ isClick }, setHero] = useHero();

    const handleClick = () => {
        setHero(prev => ({
            ...prev,
            isClick: !prev.isClick
        }));
    };
    console.log("render hero content")

    return (
        <div
            className='size-full flex-center select-none'
            onClick={handleClick}
        >
            <AnimatePresence>
                {(!isClick) ?
                    <motion.div
                        className='absolute-center w-full'
                        key="welcome-content"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 1,
                            }
                        }}
                        exit={{ opacity: 0 }}
                    >
                        <span
                            className={cn(
                                "text-lg  block mb-2 text-center",
                            )}
                        >
                            👋🏽 Say hello to
                        </span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: 0.2
                                }
                            }}
                            className={cn(
                                "text-primary text-4xl text-center",
                                "font-medium tracking-wide",
                            )}
                        >
                            @ryankwandev
                        </motion.h1>
                    </motion.div>
                    : <Introduction />

                }


                {!isClick && (
                    <IndicatorText className="mt-auto mb-4">Click to Explore</IndicatorText>
                )}
            </AnimatePresence>
        </div>
    )
}

const Introduction = () => {
    return (
        <div className="flex flex-col items-center h-full">
            <Hello />
            <motion.p className={cn(
                "text-md text-gray-400 text-center  mt-14 md:p-14 sm:p-12 p-6 w-full max-w-xl",
            )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
            >

                My name is Ryan, a<Highlight>Front-end Developer</Highlight>
                with a passion for crafting visually engaging, animation-rich, and stunning applications. Specializing in design-focused projects using React/Next.js, and Typescript.
            </motion.p>
            <IndicatorText className="mt-auto mb-4">Scroll down for more details</IndicatorText>

        </div>
    );
}

const Hello = () => {
    const style: MotionStyle = {
        fill: "none",
        stroke: "var(--slate-200)",
        strokeWidth: "23px",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }
    return (
        <motion.div>
            {
                <motion.svg width={"100%"} height={"100%"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 754 250"
                    initial={{
                        y: 180
                    }}
                    animate={{
                        y: 80
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.7
                    }}
                >
                    <g transform="matrix(1,0,0,1,-17.5277,-158.247)">
                        <g transform="matrix(1,0,0,1,-9.29825,5.64892)">
                            <motion.path
                                initial={{
                                    opacity: 0,
                                    pathLength: 0
                                }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 1
                                }}
                                transition={{
                                    pathLength: {
                                        duration: 2,
                                        ease: "easeInOut",
                                    }
                                }}
                                d="M38.326,377.051C109.569,345.519 184.13,252.617 184.586,197.859C184.586,179.91 174.029,167.442 160.186,167.442C146.344,167.442 128.288,189.82 119.078,275.164C109.869,360.507 107.478,387.942 107.478,387.942C107.478,387.942 116.476,280.776 171.947,279.879C191.153,279.879 195.816,292.846 190.179,335.133C184.542,377.42 193.157,390.093 217.869,390.469C242.58,390.844 319.674,371.105 327.404,303.855C327.871,284.337 316.897,275.473 301.306,275.473C285.715,275.473 262.865,298.109 262.327,331.803C261.789,365.497 279.3,390.013 315.843,390.013C405.117,390.013 460.564,256.716 462.37,209.329C463.27,185.719 458.551,164.099 443.42,164.099C428.289,164.099 390.434,235.017 391.506,312.951C392.373,376.717 408.93,389.243 435.294,390.996C521.354,390.996 573.062,270.214 577.544,197.523C578.603,180.352 572.724,164.474 557.835,164.474C542.947,164.474 506.461,200.322 505.997,311.64C505.903,359.115 518.187,391.968 549.754,390.951C633.603,390.951 612.722,276.12 669.866,276.12C727.01,276.12 731.027,390.531 658.221,389.93C603.448,390.133 612.949,277.355 669.866,276.12C710.162,276.12 722.352,314.352 759.937,274.846"
                                style={style} />
                            <motion.path
                                d="M38.326,377.051C109.569,345.519 184.13,252.617 184.586,197.859C184.586,179.91 174.029,167.442 160.186,167.442C146.344,167.442 128.288,189.82 119.078,275.164C109.869,360.507 107.478,387.942 107.478,387.942C107.478,387.942 116.476,280.776 171.947,279.879C191.153,279.879 195.816,292.846 190.179,335.133C184.542,377.42 193.157,390.093 217.869,390.469C242.58,390.844 319.674,371.105 327.404,303.855C327.871,284.337 316.897,275.473 301.306,275.473C285.715,275.473 262.865,298.109 262.327,331.803C261.789,365.497 279.3,390.013 315.843,390.013C405.117,390.013 460.564,256.716 462.37,209.329C463.27,185.719 458.551,164.099 443.42,164.099C428.289,164.099 390.434,235.017 391.506,312.951C392.373,376.717 408.93,389.243 435.294,390.996C521.354,390.996 573.062,270.214 577.544,197.523C578.603,180.352 572.724,164.474 557.835,164.474C542.947,164.474 506.461,200.322 505.997,311.64C505.903,359.115 518.187,391.968 549.754,390.951C633.603,390.951 612.722,276.12 669.866,276.12C727.01,276.12 731.027,390.531 658.221,389.93C603.448,390.133 612.949,277.355 669.866,276.12C710.162,276.12 722.352,314.352 759.937,274.846"
                                style={{ opacity: 0.1, ...style }} />
                        </g>
                        <g transform="matrix(1,0,0,1,76.6638,-32.4126)">

                            <motion.circle
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                transition={{
                                    delay: 2.3,
                                }}
                                cx="683.567" cy="418.701" r="12.5"
                                style={{ fill: "var(--slate-200)" }} />
                        </g>
                    </g>

                </motion.svg>

            }
        </motion.div >
    );
}



export default Hero;