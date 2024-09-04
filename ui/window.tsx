"use client";
import { cn } from "@/utils/cn";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useMouse } from "@/hooks/useMouse";
import throttle from "@/utils/throttle";
import WindowControl from "@/ui/windowControl";

const Window = ({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [ref, bounds] = useMeasure({ scroll: true });
    const [{ isHover, isClick }] = useMouse();

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
                    width: "450px",
                    height: "300px",
                }}
                animate={{
                    width: "100%",
                    height: "100%",
                    transition: {
                        type: "spring",
                        duration: 0.1,
                        stiffness: 100,
                        damping: 10
                    }
                }}
                className={cn(
                    "backdrop-blur-xs",
                    "rounded-2xl",
                    "border-2 border-stone-200/10  shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                    "[background-image:radial-gradient(95%_100%_at_top,rgba(255,255,255,0.25),rgba(255,255,255,0))] bg-stone-900/20",
                    "[transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                    (isHoverOnChange || !isHover) && "transition-rotate duration-100"
                )}
            >
                {children}
                <WindowControl />

            </motion.div>
        </motion.div>
    );
};

export default Window;