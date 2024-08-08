"use client";
import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const charHeight = 16;

export function CodePattern() {
    const matrixRef = useRef<HTMLDivElement>(null);
    const [matrix, setMatrix] = useState<{
        width: number;
    }>({
        width: 0,
    });

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
        <div className="max-h-[300px] overflow-hidden">
            <div className={cn("flex gap-2 w-full p-4 xl:p-6")}>
                {
                    ["bg-red-400", "bg-yellow-400", "bg-green-400"].map((color) => (
                        <span key={color} className={cn(
                            "rounded-full border border-gray-700",
                            "w-3 h-3 xl:w-4 xl:h-4",
                            color
                        )}></span>
                    ))
                }
            </div>
            <div ref={matrixRef} className="flex justify-center h-[400px] overflow-hidden">
                {
                    Array.from({ length: Math.floor(matrix.width / 24) + 2 }, (_, i) =>
                        <RainStream key={i + "rain"} />
                    )
                }
            </div>

            <div className={cn("absolute bottom-0 left-0  p-4 xl:p-6 xl:pt-16 pt-16 w-full rounded-b-2xl",
                "bg-gradient-to-t from-stone-900 via-[rgba(41,37,36,0.9)] via-70% to-transparent"
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
    const chars: string[] = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}|[]\:"; '<>?,./~/*-+`.split("");
    const getChar = (): string => chars[Math.floor(Math.random() * chars.length)];
    const randomRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
    const getStream = (): string[] => Array.from({ length: randomRange(10, 15) }, () => getChar());
    const getMutatedStream = (stream: string[]): string[] => {
        return [...stream.map((char) => Math.random() < 0.02 ? getChar() : char).slice(1, stream.length), getChar()];
    };

    const [stream, setStream] = useState<string[]>([]);
    const [marginTop, setMarginTop] = useState<number>(randomRange(-16 * charHeight, 16 * charHeight));
    const intervalRef = useRef<number | null>(null);

    const updateStream = useCallback(() => {
        setStream((prevStream) => getMutatedStream(prevStream));
        setMarginTop((prevMarginTop) => {
            return prevMarginTop < -16 * charHeight ? getStream().length * charHeight : prevMarginTop - charHeight;
        });
    }, []);

    useEffect(() => {
        let _stream = getStream();
        setStream(_stream);
        intervalRef.current = window.setInterval(updateStream, randomRange(100,200)); // 5 - 10 fps
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [updateStream]);

    return (
        <div
            className="text-nowrap text-md text-emerald-500 inline-block"
            style={{
                marginTop: `${-marginTop}px`,
                writingMode: "vertical-rl",
                textOrientation: "upright",
                textShadow: "0 0 4px rgba(32,194,14,0.6)",
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