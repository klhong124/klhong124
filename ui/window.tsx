"use client";
import { cn } from "@/utils/cn";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useMouse } from "@/hooks/useMouse";
import throttle from "@/utils/throttle";

const Window = ({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [ref, bounds] = useMeasure({ scroll: true });
    const { isHover, isClick } = useMouse();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const x = (e.clientX - bounds.left - bounds.width / 2) / 25;
        const y = (e.clientY - bounds.top - bounds.height / 2) / 25;
        if (!windowRef.current || isClick) return;
        windowRef.current.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    };


    useLayoutEffect(() => {
        if (!windowRef.current) return;
        if (!isHover || isClick) {
            windowRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    }, [isHover, isClick]);


    const [isHoverOnChange, setIsHoverOnChange] = useState(false);

    useEffect(() => {
        setIsHoverOnChange(true);
        const timeout = setTimeout(() => {
            setIsHoverOnChange(false);
        }, 100);
        return () => clearTimeout(timeout);
    }, [isHover]);

    return (
        <motion.div
            style={{
                perspective: "1000px",
            }}
            {...props}
            ref={ref}
        >
            <motion.div
                ref={windowRef}
                onMouseMove={throttle(handleMouseMove, 100)}
                initial={{
                    width: "400px",
                    height: "250px",
                }}
                animate={{
                    width: "100%",
                    height: "100%",
                    transition: {
                        type: "spring",
                        duration: 0.3,
                        stiffness: 200,
                        damping: 10
                    }
                }}
                className={cn(
                    "backdrop-blur-[2px]",
                    "rounded-2xl",
                    "border-2 border-stone-200/10  shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                    "[background-image:radial-gradient(95%_100%_at_top,rgba(255,255,255,0.25),rgba(255,255,255,0))] bg-stone-900/20",
                    "[transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                    (isHoverOnChange || !isHover) && "transition-rotate duration-100"
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
            </motion.div>
        </motion.div>
    );
};

export default Window;