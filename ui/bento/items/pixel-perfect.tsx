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
    const gridMaxGap = 24
    const delayStep = 0.2;

    return (
        <MotionConfig
            transition={{
                type: "linear",
                duration: 0.8,
            }}>
            <motion.button
                className={cn(
                    "h-full w-full cursor-default rounded-2xl",
                    "outline-dotted outline-transparent"
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

                    <div className="absolute w-full h-full opacity-50">
                        {/* top left three-quarter arc */}
                        <div
                            style={{
                                top: (-75 / 2) + container.height / 3,
                                left: (-75 / 2) + container.height / 3
                            }}
                            className={cn("absolute")}
                        >
                            <motion.svg
                                opacity={0}
                                variants={{
                                    rest: {
                                        opacity: 0,
                                        scale: 0.5,
                                        transition: {
                                            duration: 0.2,
                                        }
                                    },
                                    hover: {
                                        opacity: 1,
                                        scale: 1,
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
                                opacity={0}
                                variants={{
                                    rest: {
                                        pathLength: 0, opacity: 0, rotate: 270, scale: 0.5,
                                        transition: {
                                            delay: 0
                                        }
                                    },
                                    hover: {
                                        pathLength: 3 / 4,
                                        opacity: 1,
                                        rotate: 270,
                                        scale: 1,
                                        transition: {
                                            scale: { delay: backgroundDuration, type: "linear" },
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
                                    rest: {
                                        opacity: 0, scale: 0.5,
                                        transition: {
                                            scale: { delay: 0 },
                                        }
                                    },
                                    hover: { opacity: 1, scale: 1, transition: { scale: { delay: backgroundDuration, type: "linear" } } }
                                }}
                                transition={{ delay: backgroundDuration, duration: 0 }}
                            />
                        </motion.svg>

                        {/* top horizontal line  */}
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    width: "0vw",
                                },
                                hover: {
                                    opacity: 1,
                                    width: container.width + gridMaxGap
                                }
                            }}
                            style={{
                                top: container.height / 3
                            }}
                            className={cn("h-0 absolute left-[1px] opacity-0",
                                "border-t border-dashed border-white"
                            )}
                        />

                        {/* left vertical line */}
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    height: 0,

                                },
                                hover: {
                                    opacity: 1,
                                    height: container.height
                                }
                            }}

                            style={{
                                left: container.height / 3,
                            }}
                            className={cn("w-0 absolute top-[1px] opacity-0",
                                "border-l border-dashed border-white"
                            )}
                        />

                        {/* top vertical lines */}
                        {
                            Array.from({ length: 6 }).map((_, i) => {
                                const total = 6;
                                const top = i < 3;
                                return (
                                    <div key={i + 'line'}>
                                        {/* gradient line */}
                                        <motion.span
                                            variants={{
                                                rest: {
                                                    opacity: 0,
                                                    height: 0,
                                                },
                                                hover: {
                                                    opacity: 1,
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
                                            className={cn("w-0 absolute border-l border-white opacity-0")}
                                        />
                                        {/* dashed line */}
                                        <motion.span
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
                                                [top ? "bottom" : "top"]: container.height / 3 * 2 + 2, // 2px for dash cover offset
                                            }}
                                            className={cn("w-0 absolute border-l border-dashed border-gray-900 opacity-0")}
                                        />
                                    </div>
                                );
                            })
                        }

                        {/* last top vertical line */}
                        {/* <motion.span
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
                    /> */}

                        {/* bottom right vertical line */}
                        < motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    height: 0,

                                },
                                hover: {
                                    opacity: 1,
                                    height: container.height / 3 * 2,
                                    transition: {  duration: 0.4 }
                                }
                            }}
                            style={{
                                right: container.height / 3,
                            }}
                            className={cn("w-0 absolute bottom-0 opacity-0",
                                "border-l border-dashed border-white"
                            )}
                        />

                        {/* bottom horizontal line  */}
                        <motion.span
                            variants={{
                                rest: {
                                    opacity: 0,
                                    width: 0,
                                },
                                hover: {
                                    opacity: 1,
                                    width: gridMaxGap + container.width
                                }
                            }}

                            style={{
                                right:0,
                                bottom: container.height / 3
                            }}
                            className={cn("h-0 absolute",
                                "border-t border-dashed border-white"
                            )}
                        />
                    </div>

                    <motion.div
                        ref={textRef}
                        className={cn("text-secondary text-center font-normal relative",
                            "2xl:text-4xl md:text-3xl text-2xl "
                        )}
                    >
                        Pixel-Perfect Implementation
                    </motion.div>
                </div>
            </motion.button >
        </MotionConfig >
    );
}


export default PixelPerfect;