"use client";
import { cn } from "@/utils/cn";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";
import { useHero } from "@/hooks/useHero";
import throttle, { limit } from "@/utils/throttle";
import WindowControl from "@/ui/windowControl";

const Hero = ({
    children,
    ...props
}: {
    children?: React.ReactNode;
    [key: string]: any;
}) => {

    const windowRef = useRef<HTMLDivElement>(null);
    const [ref, bounds] = useMeasure({ scroll: true });
    const [{ isHover, isClick }, setHero] = useHero();

    useEffect(() => {
        return () => {
            setHero({
                isClick: false,
                isHover: false,
                isTap: false
            });
        }
    }, []);

    const handleHoverStart = () => {
        setHero(prev => ({
            ...prev,
            isHover: true
        }));
    };

    const handleHoverEnd = () => {
        setHero(prev => ({
            ...prev,
            isHover: false
        }));
    };

    const handleTapStart = () => {
        setHero(prev => ({
            ...prev,
            isTap: true
        }));
    };

    const handleTapCancel = () => {
        setHero(prev => ({
            ...prev,
            isTap: false
        }));
    };



    const handleHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const x = (e.clientX - bounds.left - bounds.width / 2) / 25;
        const y = (e.clientY - bounds.top - bounds.height / 2) / 25;
        if (!windowRef.current || isClick) return;
        windowRef.current.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    };
    const handleHeroLeave = () => {
        setTimeout(() => {
            if (!windowRef.current) return;
            windowRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }, limit);
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
            onTapStart={handleTapStart}
            onTap={handleTapCancel}
            onTapCancel={handleTapCancel}
            onMouseEnter={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            whileTap={{
                scale: 0.95
            }}
            initial={{
                maxWidth: "450px",
                maxHeight: "400px"
            }}
            animate={isClick ? {
                maxWidth: "1200px",
                maxHeight: "800px",
                transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            } : {
                maxHeight: "400px"
            }}
            style={{
                perspective: "1000px",
            }}
            {...props}
            ref={ref}
        >
            <motion.div
                ref={windowRef}
                onMouseMove={throttle(handleHeroMove)}
                onMouseLeave={handleHeroLeave}
                initial={{
                    width: "450px",
                    height: "250px",
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
                    "glass",
                    "[transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                    "transition-rotate duration-100"
                )}
            >
                {children}
                <WindowControl />

            </motion.div>
        </motion.div>
    );
};

export default Hero;