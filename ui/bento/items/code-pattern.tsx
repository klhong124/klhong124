"use client";
import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

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
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const randomRange = useCallback((min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min), []);
    const matrixRef = useRef<HTMLDivElement>(null);
    const stream = getStream();



    const updateMatrix = useCallback(() => {
        if (matrixRef.current) {
            const children = matrixRef.current.children;
            children[randomRange(0, children.length - 1)].textContent = chars[randomRange(0, chars.length - 1)];
        }
    }, []);

    useEffect(() => {
        intervalId.current = setInterval(updateMatrix, 200);
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [updateMatrix]);


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
                    delay: Math.random() * 4,
                }
            }}

            className={cn("text-nowrap text-md inline-block bg-clip-text text-transparent bg-repeat h-[500px]",
                "bg-gradient-to-b from-transparent from-40% via-emerald-500 via-90% to-white "
            )}
            style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
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