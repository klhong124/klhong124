"use client";
import { cn } from "@/utils/cn";
import React from "react";
import { motion, MotionConfig, MotionStyle } from "motion/react";
import { HeroContextProvider, useHero } from "@/hooks/useHero";
import WindowControl from "@/ui/windowControl";
import GlowingCard from "@/ui/glowing-card";
import IndicatorText from "@/ui/indicatorText";
import Highlight from "@/ui/highlight";
import Dock, { DOCK_ITEMS } from "@/ui/dock";
import { TechStackScene } from "@/components/ui/tech-stack-scene";
import { MobileTechStackScene } from "@/components/ui/mobile-tech-stack-scene";
import { useMouse } from "@/hooks/useMouse";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/portfolio-content";

/**
 * The original hero, restored from the pre-refresh site: a card that greets
 * with "Say hello to /ryankwan.dev", expands on click to reveal the handwritten
 * Hello and the introduction, with the magnifying dock and the 3D tech stack
 * around it.
 *
 * Differences from the 2025 original are strictly mechanical: Motion 13 needs
 * easing tuples typed as const, `useMouse` now exposes `setActive` instead of
 * a state setter, and the 3D scene mounts through the capability-gated
 * `TechStackScene` wrapper so reduced-motion and low-powered devices skip it.
 *
 * Below `md` the hover/click card doesn't translate to touch, so the section
 * swaps to a static stacked layout (`MobileHero`) with the same content:
 * greeting, handle, introduction and social links.
 */

// Staggered entrance shared by the desktop card content and the mobile hero.
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    },
};

// Opacity and transform only — the original also animated a 4px blur
// filter on entrance, which forces a repaint of the whole card on every
// frame. Dropping it keeps the entrance on the compositor.
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] as const
        }
    }
};

// One source for the intro copy so the expanded card (md+) and the mobile
// layout can never drift apart.
const IntroCopy = () => (
    <>
        My name is Ryan, a <Highlight>{profile.role}</Highlight>
        {" "}with 6+ years building high-performance, visually engaging web apps — React, Next.js, TypeScript and GraphQL — where design, motion and engineering intersect.
    </>
);

// The handle with its per-character entrance, shared by the desktop card and
// the mobile hero so both get the same signature animation.
const AnimatedHandle = ({ className }: { className?: string }) => (
    <motion.h1
        className={cn(
            "text-fg text-fluid-3xl text-center",
            "font-display font-semibold tracking-wide relative",
            className,
        )}
    >
        {"/ "}
        {"ryankwan.dev".split("").map((char, index) => (
            <motion.span
                key={index}
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    type: "spring",
                    bounce: 0.5,
                    duration: 0.8,
                    delay: 0.4 + index * 0.05,
                }}
                className="inline-block"
            >
                {char}
            </motion.span>
        ))}
    </motion.h1>
);
export const HeroSection = () => {
    return (
        <HeroContextProvider>
            <MotionConfig
                // `reducedMotion="user"` turns every transform animation in the
                // card into an instant cut for people who asked the OS for less
                // motion, without needing per-element checks.
                reducedMotion="user"
                transition={{
                    type: "spring",
                    bounce: 0.5,
                    stiffness: 100,
                }}
            >
                <Hero />
            </MotionConfig>
        </HeroContextProvider>
    )
}

const Hero = () => {
    const [, setHero] = useHero();
    const { setActive } = useMouse();
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
        setActive(false);
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

    return (
        <motion.div
            id="hero"
            onTapStart={handleTapStart}
            onTap={handleTapCancel}
            onTapCancel={handleTapCancel}
            // The original also re-asserted hover on a throttled mousemove,
            // which called setState up to ten times a second while the pointer
            // was already inside. Enter/leave carry the same information for
            // free, so the mousemove handler is gone.
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            className={cn("cursor-pointer size-full flex-center min-h-screen w-full relative")}
            style={{
                perspective: "1000px",
            }}
        >
            {/* iPad and up: the interactive card with the 3D backdrop and the
                magnifying dock. `md:contents` makes the wrapper disappear from
                layout so everything sits exactly as before, while `hidden`
                removes the whole cluster (and its pointer-only interactions)
                on phones. */}
            <div className="hidden md:contents">
                <GlowingCard className="bg-surface/80">
                    <HeroContent />
                    <WindowControl />
                </GlowingCard>
                <TechStackScene />
                <Dock />
            </div>
            <MobileHero />
        </motion.div>
    );
};

/**
 * Phone layout: everything the card reveals through hover and click —
 * greeting, handle, introduction, social links — laid out as one static
 * column, since touch has no hover and the fixed 500px card overflows
 * small screens.
 */
const MobileHero = () => {
    return (
        <>
            <MobileTechStackScene />
            <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 px-6 py-24 text-center md:hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">👋🏽</span>
                <span className="text-fluid-sm uppercase tracking-[0.2em] text-accent">
                    Say hello to
                </span>
            </motion.div>

            <motion.div variants={itemVariants}>
                <AnimatedHandle />
            </motion.div>

            <motion.p
                variants={itemVariants}
                className="text-fluid-base leading-loose text-muted"
            >
                <IntroCopy />
            </motion.p>

            <motion.ul
                variants={itemVariants}
                aria-label="Social links"
                className="mt-2 flex flex-wrap justify-center gap-3"
            >
                {DOCK_ITEMS.map((item) => (
                    <li key={item.title}>
                        <Link
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            aria-label={item.title}
                            // size-11 = 44px, the minimum comfortable tap target.
                            className="flex size-11 items-center justify-center rounded-xl bg-stone-700"
                        >
                            <Image
                                src={`/svg/${item.title.toLowerCase()}.svg`}
                                alt=""
                                width={22}
                                height={22}
                                className="invert"
                            />
                        </Link>
                    </li>
                ))}
            </motion.ul>

            <IndicatorText className="mt-4">Scroll down for more details</IndicatorText>
        </motion.div>
        </>
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

    return (
        <div
            className='size-full flex-center select-none'
            onClick={handleClick}
        >
            {(!isClick) ? (
                <motion.div
                    className='w-full flex-center flex-col h-full'
                    key="welcome-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex-1 flex-center flex-col gap-4">
                        {/* Greeting with wave animation */}
                        <motion.div
                            variants={itemVariants}
                            animate="visible"
                            initial="hidden"
                            className="flex items-center space-x-4"
                        >
                            <motion.span
                                className="text-lg text-center"
                                aria-hidden="true"
                            >
                                👋🏽
                            </motion.span>
                            {/* Same treatment as the section labels elsewhere
                                on the page (About me, Approach, …). */}
                            <span className="text-fluid-sm uppercase tracking-[0.2em] text-accent">
                                Say hello to
                            </span>
                        </motion.div>

                        {/* Animated username with character stagger */}
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <AnimatedHandle />
                        </motion.div>
                    </div>

                    {/* Enhanced indicator with better animations */}

                    <motion.div
                        className="flex flex-col items-center mb-4"
                    >
                        <IndicatorText className="relative">
                            <motion.span
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            >
                                Click to Explore
                            </motion.span>
                        </IndicatorText>
                    </motion.div>
                </motion.div>
            ) : (
                <Introduction />
            )}
        </div>
    )
}

const Introduction = () => {
    return (
        <div className="flex flex-col items-center h-full">
            <Hello />
            <motion.p className={cn(
                " text-fluid-base leading-loose text-muted mt-16 md:p-14 sm:p-12 p-6 w-full max-w-xl",
            )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
            >
                <IntroCopy />
            </motion.p>
            <IndicatorText className="mt-auto mb-4">Scroll down for more details</IndicatorText>

        </div>
    );
}

const Hello = () => {
    const style: MotionStyle = {
        fill: "none",
        // The handwritten stroke picks up the site accent (violet), the same
        // family as headings, links and the glow shadows elsewhere.
        stroke: "rgb(var(--accent-soft))",
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
                                style={{ fill: "rgb(var(--accent-soft))" }} />
                        </g>
                    </g>

                </motion.svg>

            }
        </motion.div >
    );
}

export default HeroSection;
