"use client";
import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, useAnimation, } from "framer-motion";
import { cn } from "@/utils/cn";

const chars: string[] = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}|[]:";'<>?,./~/*-+`.split("");
const getStream = (): string[] => Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);


export function CodePattern() {
    const matrixRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            if (matrixRef.current) {
                setColumns(Math.floor(matrixRef.current.clientWidth / 24))
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [matrixRef]);


    return (
        <motion.div className={cn(
            "max-h-[300px] overflow-hidden"
        )}>

            <div ref={matrixRef} className={cn(
                "flex justify-between h-[400px]",
            )}>
                {
                    Array.from({ length: columns }).map((_, i) =>
                        <RainStream key={i + "rain"} />
                    )
                }
            </div>

            <div className={cn("absolute bottom-0 left-0  p-4 xl:p-6 xl:pt-16 pt-16 w-full rounded-b-2xl",
                "bg-gradient-to-t from-stone-800 from-70% to-transparent"
            )}>
                <CardTitle>Clean, sustainable code pattern</CardTitle>
                <CardDescription>
                    Delivering applications with industry best practices for long-term maintainability and scalability
                </CardDescription>
            </div>
        </motion.div >
    );
}

const RainStream = memo(() => {
    const matrixRef = useRef<HTMLDivElement>(null);

    const stream = getStream();

    const controls = useAnimation()
    const show = useAnimation()
    const randomRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            show.start({
                opacity: 1,
                transition: {
                    delay: 2
                }
            })
            controls.start({
                color: 'var(--emerald-500)',
                opacity: 0,
            });
        }, randomRange(0, 2000));

        return () => clearTimeout(timeoutId);
    }, [controls]);


    const updateMatrix = useCallback(() => {
        if (matrixRef.current) {
            const children = matrixRef.current.children;
            children[randomRange(0, children.length - 1)].textContent = chars[randomRange(0, chars.length - 1)];
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(updateMatrix, 200);
        return () => {
            clearInterval(interval);
        };
    }, [updateMatrix]);




    return (
        <motion.div
            ref={matrixRef}
            initial={{
                opacity: 0,
            }}
            animate={show}
            className="text-nowrap text-md text-emerald-500 inline-block"
            style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                textShadow: "0 0 4px rgba(32,194,14,0.6)",
            }}
        >
            {
                stream.map((char, index) => {
                    return <motion.span
                        initial={{
                            color: 'var(--white)',
                            opacity: 1,
                        }}
                        animate={controls}
                        transition={{
                            opacity: {
                                duration: 1.5,
                                delay: index * 0.08,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                            },
                            color: {
                                duration: 0.3,
                                delay: index * 0.08,
                                repeat: Infinity,
                                repeatDelay: 1.7,
                            },
                        }}
                        key={index + char
                        }
                        className="cursor-default font-matrix "
                    >
                        {char}
                    </motion.span>

                })
            }
        </motion.div>
    );
});


const CardTitle = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <h3
            className={cn(
                "text-xl font-semibold text-primary pb-2",
            )}
        >
            {children}

            <motion.span
                className="text-slate-400 pl-[1px]"
                initial={{
                    opacity: 1,
                }}
                animate={{
                    opacity: [1, 0, 1],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.8,
                }}
            >
                _
            </motion.span>
        </h3>
    );
};

const CardDescription = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "text-sm font-normal text-secondary max-w-sm",
            )}
        >
            {children}
        </p>
    );
};


export default CodePattern;