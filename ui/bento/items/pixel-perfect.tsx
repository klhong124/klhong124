"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/utils/cn";

export function PixelPerfect() {
    const anchor = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [isHover, setIsHover] = useState<boolean>(false);

    const updateAnchorOffset = () => {
        if (anchor.current) {
            setOffsetLeft(anchor.current.getBoundingClientRect().left + 24);
        }
    };

    useEffect(() => {
        updateAnchorOffset();
        window.addEventListener('resize', updateAnchorOffset);
        return () => {
            window.removeEventListener('resize', updateAnchorOffset);
        };
    }, []);


    return (
        <MotionConfig
            transition={{
                type: "linear",
                duration: 0.8,
            }}>
            <motion.button
                className={cn(
                    "h-full w-full cursor-default rounded-2xl",
                    "border-dashed"
                )}
                animate={isHover ? "hover" : "rest"}
                onHoverStart={() => {
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    setIsHover(false);
                }}
                variants={{
                    rest: {
                        borderWidth: 0,
                        borderColor: "var(--transparent)",
                    },
                    hover: {
                        backgroundColor: "var(--gray-900)",
                        borderWidth: "1px",
                        borderColor: "var(--gray-500)",
                    }
                }}
            >
                <motion.svg
                    width={(anchor.current?.offsetTop ?? 0) + (anchor.current?.clientHeight ?? 0)}
                    height={(anchor.current?.offsetTop ?? 0) + (anchor.current?.clientHeight ?? 0)}
                    viewBox="0 0 100 100"
                    className={cn(
                        "absolute bottom-[1px] right-[1px]",
                    )}
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="49"
                        fill="transparent"
                        stroke="white"
                        variants={{
                            rest: {
                                pathLength: 0, opacity: 0, rotate: 270,
                                transition: {
                                    delay: 0
                                }
                            },
                            hover: {
                                pathLength: 3 / 4,
                                opacity: 0.5,
                                rotate: 270,
                                transition: {
                                    pathLength: { type: "spring", duration: 1.5, bounce: 0, delay: 0.5 },
                                    opacity: { duration: 0.2, delay: 0.5 },
                                }
                            }
                        }}
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="49"
                        fill="transparent"
                        stroke="var(--gray-900)"
                        strokeDasharray="3 1"
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                    />
                </motion.svg>
                <div
                    ref={container}
                    className={cn("flex justify-center items-center h-full")}>
                    <motion.div
                        ref={anchor}
                        variants={{
                            hover: {
                                color: "var(--gray-200)",
                            }
                        }}
                        className={cn("text-secondary text-3xl text-center relative px-3 py-4 mx-3")}
                    >
                        <motion.svg
                            className={cn("absolute -top-[calc(75px/2)] -left-[calc(75px/2)]")}
                            variants={{
                                rest: {
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2,
                                    }
                                },
                                hover: {
                                    opacity: 0.5,
                                    transition: {
                                        delay: 0.3,
                                    }
                                }
                            }}


                            fill="none" width="75" height="75" viewBox="0 0 75 75">
                            <path
                                d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74"
                                stroke="white"
                                strokeDasharray="2 4">
                            </path>
                        </motion.svg>
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    width: "0vw",
                                },
                                hover: {
                                    opacity: 0.5,
                                    width: "100vw"
                                }
                            }}

                            style={{
                                transform: `translateX(-${offsetLeft}px)`
                            }}
                            className={cn("h-0 absolute top-0 left-0",
                                "border-t border-dashed border-white opacity-50"
                            )}

                        />
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    height: 0,

                                },
                                hover: {
                                    opacity: 0.5,
                                    height: container.current?.clientHeight
                                }
                            }}

                            style={{
                                transform: `translateY(-${anchor.current?.offsetTop}px)`
                            }}
                            className={cn("w-0 absolute top-0 left-0",
                                "border-l border-dashed border-white opacity-50"
                            )}
                        />
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    height: 0,

                                },
                                hover: {
                                    opacity: 0.5,
                                    height: "100vh",
                                }
                            }}

                            style={{
                                transform: `translateY(${anchor.current?.offsetTop}px)`,
                                right: -(anchor.current?.offsetLeft ?? 0) + (anchor.current?.offsetTop ?? 0) + (anchor.current?.clientHeight ?? 0),
                            }}
                            className={cn("w-0 absolute bottom-0",
                                "border-l border-dashed border-white opacity-50"
                            )}
                        />


                        Seamless Pixel-Perfect Implementation
                    </motion.div>
                </div>

            </motion.button >
        </MotionConfig>
    );
}


export default PixelPerfect;