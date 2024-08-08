"use client";
import React, { useEffect, useState, useRef, memo, useCallback, use } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const charHeight = 15;

export function CodePattern() {
    const matrixRef = useRef<HTMLDivElement>(null);
    const [matrix, setMatrix] = useState<{ width: number }>({ width: 0, });
    const [isHover, setIsHover] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (matrixRef.current) {
                setMatrix({
                    width: matrixRef.current.clientWidth,
                });
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
        )}
            onHoverStart={() => {
                setIsHover(true);
            }}
            onHoverEnd={() => {
                setIsHover(false);
            }}

        >

            <div ref={matrixRef} className={cn(
                "flex justify-center h-[400px]",
            )}>
                {
                    Array.from({ length: Math.floor(matrix.width / 24) }, (_, i) =>
                        <RainStream key={i + "rain"} isHover={isHover} />
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

const RainStream = memo(({ isHover }: {
    isHover: boolean;
}) => {
    const streamLength = {
        min: 10,
        max: 15,
    };
    const chars: string[] = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}|[]\:"; '<>?,./~/*-+`.split("");
    const getChar = (): string => chars[Math.floor(Math.random() * chars.length)];
    const randomRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
    const getStream = (): string[] => Array.from({ length: randomRange(streamLength.min, streamLength.max) }, () => getChar());
    const getMutatedStream = (stream: string[]): string[] => {
        return [...stream.map((char) => Math.random() < 0.03 ? getChar() : char).slice(1, stream.length), getChar()];
    };

    const [stream, setStream] = useState<string[]>([]);
    const [marginTop, setMarginTop] = useState<number>(randomRange(-streamLength.max * charHeight, streamLength.max * charHeight));
    const intervalRef = useRef<number | null>(null);

    const updateStream = useCallback(() => {
        setStream((prevStream) => getMutatedStream(prevStream));
        setMarginTop((prevMarginTop) => {
            return prevMarginTop < -streamLength.max * charHeight ? getStream().length * charHeight : prevMarginTop - charHeight;
        });
    }, []);

    useEffect(() => {
        setStream(getStream)
    }, []);

    useEffect(() => {
        intervalRef.current = window.setInterval(updateStream, isHover ? randomRange(30,70) : 100)
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [updateStream, isHover]);

    return (
        <div
            className="text-nowrap text-md text-emerald-500 inline-block"
            style={{
                marginTop: -marginTop + "px",
                writingMode: "vertical-rl",
                textOrientation: "upright",
                textShadow: "0 0 4px rgba(32,194,14,0.6)",
                willChange: "margin-top",
            }}
        >
            {stream.map((char, index) => (
                <span
                    className="cursor-default font-matrix"
                    key={index + char}
                    style={{
                        color: index === stream.length - 1 ? 'var(--emerald-200)' : undefined,
                        opacity: index < 5 ? 0.1 + index * 0.2 : 1,
                        textShadow: index === stream.length - 1 ? "0 0 6px #fff" : undefined,
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
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
                "text-xl font-semibold text-primary",
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