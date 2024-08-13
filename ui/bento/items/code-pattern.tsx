"use client";
import React, { useState, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import throttle from "@/utils/throttle";
import { cn } from "@/utils/cn";

export function CodePattern() {
    const [columns, setColumns] = useState<number>(0);

    const matrixRef = useCallback((node: HTMLDivElement | null) => {
        const onResize = throttle(() => {
            if (!node) return;
            setColumns(Math.floor(node.clientWidth / 24))
        }, 100);
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    return (
        <div className={cn("max-h-[300px] overflow-hidden")}>

            <div ref={matrixRef} className={cn(
                "flex justify-between relative",
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
        </div >
    );
}

const RainStream = memo(() => {
    const chars: string[] = useMemo(() => `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}|[]:";'<>?,./~/*-+`.split(""), []);
    const getStream = (): string[] => Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
    const randomRange = useCallback((min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min), []);
    const stream = getStream();



    const matrixRef = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            const children = node.children;
            const intervalId = setInterval(() => {
                children[randomRange(0, children.length - 1)] && (children[randomRange(0, children.length - 1)].textContent = chars[randomRange(0, chars.length - 1)])
            }, 1000)
            return () => clearInterval(intervalId); // Cleanup function to clear the interval
        }
    }, []);


    return (
        <motion.div
            ref={matrixRef}
            animate={{
                backgroundPositionY: 500,
                transition: {
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    type: "linear",
                    delay: Math.random() * -4,
                }
            }}

            className={cn("text-nowrap text-md inline-block bg-clip-text text-transparent bg-repeat h-[500px]",
            )}
            style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                backgroundImage: "linear-gradient(to bottom, var(--transparent) 40%, var(--emerald-500) 93%, var(--white)  95%, var(--transparent) 100%)"

            }}
        >
            {
                stream.map((char, index) => {
                    return <span
                        key={index + char
                        }
                        className={cn(
                            "cursor-default font-matrix",
                        )}
                    >
                        {char}
                    </span>

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