"use client";
import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

const charHeight = 17;

export function CodePattern() {
    const ref = useRef<HTMLDivElement>(null);
    const matrix = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        margin: "0px 0px -260px 0px",
    });


    return (

        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className={cn(
                "w-full h-full relative flex flex-col p-4 xl:p-6"
            )}
        >
            <div className="flex gap-2 mb-3">
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
            <div ref={matrix} className="flex-grow overflow-hidden flex justify-between">
                {
                    Array.from({ length: (matrix.current?.clientWidth ?? 300) / charHeight - 5 }, (_, i) =>
                        <RainStream key={i + "rain"} matrix={matrix} />
                    )
                }


            </div>

            <div>
                <CardTitle>Clean, sustainable code pattern</CardTitle>
                <CardDescription>
                    Delivering applications with industry best practices for long-term maintainability and scalability
                </CardDescription>
            </div>
        </motion.div >
    );
}




const RainStream = memo(({ matrix }: { matrix: React.RefObject<HTMLDivElement> }) => {
    const chars: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,.<>?/".split("");
    const getChar = (): string => chars[Math.floor(Math.random() * chars.length)];
    const randomRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
    const getStream = (): string[] => Array.from({ length: randomRange(10, 15) }, () => getChar());
    const getMutatedStream = (stream: string[]): string[] => {
        return [...stream.map((char) => Math.random() < 0.02 ? getChar() : char).slice(1, stream.length), getChar()];
    };

    const [stream, setStream] = useState<string[]>([]);
    const [marginTop, setMarginTop] = useState<number>(randomRange(-400, 25 * 17 + 100));
    const intervalRef = useRef<number | null>(null);

    const updateStream = useCallback(() => {
        setStream((prevStream) => getMutatedStream(prevStream));
        setMarginTop((prevMarginTop) => {
            const canvasHeight = matrix.current?.clientHeight ?? 300;
            return prevMarginTop < -canvasHeight ? getStream().length * 17 + 100 : prevMarginTop - 17;
        });
    }, [matrix]);

    useEffect(() => {
        let _stream = getStream();
        setStream(_stream);
        intervalRef.current = window.setInterval(updateStream, 200); // 5 fps
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [matrix, updateStream]);

    return (
        <div
            className="text-nowrap text-sm text-green-500 inline-block"
            style={{
                marginTop: `${-marginTop}px`,
                writingMode: "vertical-rl",
                textOrientation: "upright",
                textShadow: "0 0 4px rgba(32,194,14,0.6)",
            }}
        >
            {stream.map((char, index) => (
                <span
                    key={index + char}
                    style={{
                        color: index === stream.length - 1 ? 'var(--white)' : undefined,
                        opacity: index < 6 ? 0.1 + index * 0.15 : 1,
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
                "text-xl font-semibold text-primary py-2",
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