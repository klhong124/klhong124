"use client";
import { cn } from "@/utils/cn";
import React, { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useMouse } from "@/hooks/useMouse";

const Window = ({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [ref, bounds] = useMeasure({ scroll: true });
    const { isHover } = useMouse();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!windowRef.current) return;
        const x = (e.clientX - bounds.left - bounds.width / 2) / 25;
        const y = (e.clientY - bounds.top - bounds.height / 2) / 25;
        windowRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };


    useLayoutEffect(() => {
        if (!windowRef.current) return;

        if (!isHover) {
            windowRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    }, [isHover]);

    return (
        <motion.div
            style={{
                perspective: "1000px",
            }}
            {...props}
            ref={ref}
        >
            <div
                ref={windowRef}
                onMouseMove={handleMouseMove}
                className={cn(
                    "w-[700px] h-[400px] rounded-2xl relative",
                    "flex flex-col justify-center items-center",
                    "border-2 border-stone-200/10 shadow-lg",
                    "[background-image:radial-gradient(95%_100%_at_top,rgba(255,255,255,0.2),rgba(255,255,255,0))]",
                    "shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                    "[transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                )}
            >
                {children}

                <div className="absolute top-0 left-0 h-0">
                    <div className={cn("flex gap-2 p-4 xl:p-6")}>
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

                </div>
            </div>
        </motion.div>
    );
};

export default Window;