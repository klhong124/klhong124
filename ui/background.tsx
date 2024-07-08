"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Background = ({ children }: { children?: React.ReactNode; }) => {
    const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setPointerPos({
            x: e.clientX,
            y: e.clientY,
        });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        setPointerPos({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative flex items-center justify-center overflow-hidden"
        >
            <div className="z-10">
                {children}
            </div>

            <motion.div
                className='absolute pointer-events-none w-[200vw] h-[200vw] dark:bg-black bg-white -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black_30%,black)]'
                style={{
                    left: `${pointerPos.x}px`,
                    top: `${pointerPos.y}px`,
                }}
            />


        </div>
    );
};

export default Background;