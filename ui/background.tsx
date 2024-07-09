"use client";
import { cn } from "@/utils/cn";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

export const Background = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    const useSpringConfig = {
        stiffness: 400,
        damping: 20,
    };
    const mouseX = useSpring(window.innerWidth / 2, useSpringConfig);
    const mouseY = useSpring(window.innerHeight / 2, useSpringConfig);

    const maskImageStyle = useMotionTemplate`
        radial-gradient(
            300px circle at ${mouseX}px ${mouseY}px,
            black 0%,
            transparent 100%
        )
    `;

    return (
        <section
            className=
            "relative h-screen flex items-center bg-white dark:bg-black justify-center w-full group"
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

            <div className={cn("relative z-20", className)}>{children}</div>
        </section>
    );
};

export default Background;