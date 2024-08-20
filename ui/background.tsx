"use client";
import { motion, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

export const Background = ({
    children,
    ...prop
}: {
    children: React.ReactNode;
    [key: string]: any;
}) => {

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();

        setMousePosition({ x: clientX - left, y: clientY - top });
    }

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const maskImageStyle = useMotionTemplate`
        radial-gradient(
            300px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black 0%,
            transparent 100%
        )
    `;

    // Set mouse position on page loaded
    useEffect(() => {
        setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }, []);

    return (
        <section
            className=
            "relative flex items-center bg-white dark:bg-black justify-center w-full group overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* Highlight */}
            <motion.div
                className="pointer-events-none bg-dot-indigo-300 dark:bg-dot-emerald-900 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    WebkitMaskImage: maskImageStyle,
                    maskImage: maskImageStyle,
                }}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                }}

            />

            <main {...prop} className="relative">{children}</main>
        </section>
    );
};

export default Background;