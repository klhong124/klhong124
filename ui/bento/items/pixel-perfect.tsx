"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/utils/cn";

export function PixelPerfect() {
    const textRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState<boolean>(false);

    const [container, setContainer] = useState<{
        height: number,
        width: number
    }>({ height: 0, width: 0 });
    const [text, setText] = useState<{
        height: number,
        width: number
        offset: {
            top: number,
            left: number
        }
    }>({ height: 0, width: 0, offset: { left: 0, top: 0 } });


    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current && textRef.current) {
                setContainer({
                    height: containerRef.current.clientHeight,
                    width: containerRef.current.clientWidth
                });
                setText({
                    height: textRef.current.clientHeight,
                    width: textRef.current.clientWidth,
                    offset: {
                        top: textRef.current.offsetTop,
                        left: textRef.current.offsetLeft
                    }
                });
            }
        };
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [containerRef, textRef]);


    const backgroundDuration = 0.5;
    const opacity = 0.5;
    const gridMaxGap = 24
    const delayStep = 0.1;

    return (
        <MotionConfig
            transition={{
                type: "linear",
                duration: 0.8,
            }}>
            <motion.button
                className={cn(
                    "h-full w-full cursor-default rounded-2xl",
                    "outline-dashed outline-transparent"
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
                        backgroundColor: "#00000000",
                        transition: {
                            delay: backgroundDuration,
                        }
                    },
                    hover: {
                        backgroundColor: "var(--gray-900)",
                        outlineColor: "var(--gray-500)",
                        transition: {
                            duration: backgroundDuration,
                        }
                    }
                }}
            >
                <div
                    ref={containerRef}
                    className={cn("flex justify-center items-center h-full")}>
                    {/* top horizontal line  */}
                    <motion.span
                        variants={{
                            rest: {
                                opacity: 0,
                                width: "0vw",
                            },
                            hover: {
                                opacity,
                                width: "100vw"
                            }
                        }}
                        style={{
                            top: container.height / 3
                        }}
                        className={cn("h-0 absolute left-[1px]",
                            "border-t border-dashed border-white"
                        )}
                    />

                    {/* top left three-quarter arc */}
                    <div
                        style={{
                            top: (-75 / 2) + container.height / 3,
                            left: (-75 / 2) + text.offset.left
                        }}
                        className={cn("text-secondary text-3xl text-center relative px-6 py-4")}
                    >
                        <motion.svg
                            opacity={0}
                            variants={{
                                rest: {
                                    opacity: 0,
                                    transition: {
                                        duration: 0.2,
                                    }
                                },
                                hover: {
                                    opacity,
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
                    </div>

                    {/* top vertical lines */}
                    {
                        Array.from({ length: 5 }).map((_, i) => {
                            const total = 5;
                            const top = i < 2;
                            return (
                                <>
                                    {/* gradient line */}
                                    <motion.span
                                        key={i + ' line'}
                                        variants={{
                                            rest: {
                                                opacity: 0,
                                                height: 0,
                                            },
                                            hover: {
                                                opacity,
                                                height: (container.height / 3) / 4 * 3,
                                                transition: {
                                                    opacity: {
                                                        delay: backgroundDuration + delayStep * i
                                                    },
                                                    height: {
                                                        duration: 0.4,
                                                        delay: backgroundDuration + delayStep * i
                                                    }
                                                }
                                            }
                                        }}
                                        style={{
                                            left: text.offset.left + text.width / 4 * (top ? i + 1 : total - i),
                                            [top ? "bottom" : "top"]: container.height / 3 * 2 + 1,
                                            borderImage: `linear-gradient(to ${top ? "top" : "bottom"}, rgba(255, 255, 255), rgba(255, 255, 255) 50%, rgba(255, 255, 255, 0)) 1 100%`
                                        }}
                                        className={cn("w-0 absolute border-l border-white")}
                                    />
                                    {/* dashed line */}
                                    <motion.span
                                        key={i + ' dashed'}
                                        variants={{
                                            rest: {
                                                opacity: 0,
                                            },
                                            hover: {
                                                opacity: 1,
                                                height: container.height / 3 - 1,
                                            }
                                        }}
                                        transition={{ delay: backgroundDuration, duration: 0 }}
                                        style={{
                                            left: text.offset.left + text.width / 4 * (top ? i + 1 : total - i),
                                            [top ? "bottom" : "top"]: container.height / 3 * 2 + 3, // 3px for dash cover offset
                                        }}
                                        className={cn("w-0 absolute border-l border-dashed border-gray-900")}
                                    />
                                </>
                            );
                        })
                    }

                    {/* last top vertical line */}
                    <motion.span
                        variants={{
                            rest: {
                                opacity: 0,
                                height: 0,
                            },
                            hover: {
                                opacity,
                                height: text.offset.top + gridMaxGap,
                                transition: {
                                    opacity: {
                                        delay: backgroundDuration + delayStep * 2
                                    },
                                    height: {
                                        duration: 0.5,
                                        delay: backgroundDuration + delayStep * 2
                                    }
                                }
                            }
                        }}
                        style={{
                            left: text.offset.left + text.width / 4 * 3,
                            bottom: container.height / 3 * 2 + 1,

                        }}
                        className={cn("w-0 absolute border-l border-white border-dashed")}
                    />

                    <motion.div
                        ref={textRef}
                        variants={{
                            hover: {
                                color: "var(--gray-200)",
                            }
                        }}
                        className={cn("text-secondary text-center font-normal relative px-6 ",
                            "2xl:text-3xl md:text-2xl text-lg "
                        )}
                    >
                        {/* left vertical line */}
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    height: 0,

                                },
                                hover: {
                                    opacity,
                                    height: container.height
                                }
                            }}

                            style={{
                                top: -text.offset.top,
                            }}
                            className={cn("w-0 absolute left-0",
                                "border-l border-dashed border-white"
                            )}
                        />
                        Seamless Pixel-Perfect Implementation
                    </motion.div>

                    {/* bottom right three-quarter arc */}
                    <motion.svg
                        width={container.height / 3 * 2}
                        height={container.height / 3 * 2}
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
                                    opacity,
                                    rotate: 270,
                                    transition: {
                                        pathLength: { type: "spring", duration: 1.5, bounce: 0, delay: backgroundDuration },
                                        opacity: { duration: 0.2, delay: backgroundDuration },
                                    }
                                }
                            }}
                        />
                        {/* dash circle */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="49"
                            fill="transparent"
                            stroke="var(--gray-900)"
                            strokeWidth={2}
                            strokeDasharray="3 2"
                            strokeDashoffset="2"
                            opacity={0}
                            variants={{
                                rest: { opacity: 0 },
                                hover: { opacity: 1 }
                            }}
                            transition={{ delay: backgroundDuration, duration: 0 }}
                        />
                    </motion.svg>

                    {/* bottom right vertical line */}
                    < motion.span
                        variants={{
                            rest: {
                                opacity: 0,
                                height: 0,

                            },
                            hover: {
                                opacity,
                                height: container.height / 3 * 2 + gridMaxGap,
                                transition: { delay: backgroundDuration + 0.2, duration: 0.8 }
                            }
                        }}
                        style={{
                            right: container.height / 3,
                            top: container.height / 3,
                        }}
                        className={cn("w-0 absolute",
                            "border-l border-dashed border-white"
                        )}
                    />

                </div>

                {/* bottom horizontal line  */}
                <motion.span
                    variants={{
                        rest: {
                            opacity: 0,
                            width: 0,
                        },
                        hover: {
                            opacity,
                            width: gridMaxGap + container.width - 3 // 1px for each offset sum up and 1px for border
                        }
                    }}

                    style={{
                        left: -gridMaxGap,
                        bottom: container.height / 3
                    }}
                    className={cn("h-0 absolute",
                        "border-t border-dashed border-white"
                    )}
                />

            </motion.button >
        </MotionConfig >
    );
}


export default PixelPerfect;