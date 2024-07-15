"use client";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const bentoConfig: { [key: number]: string } = {
    1: "2xl:col-span-2 2xl:row-span-4 2xl:order-1 md:order-3 md:col-span-4 md:row-span-3 order-3 col-span-4 row-span-1",
    2: "2xl:col-span-2 2xl:row-span-2 2xl:order-2 md:order-5 md:col-span-4 md:row-span-2 order-5 col-span-6 row-span-1",
    3: "2xl:col-span-1 2xl:row-span-3 2xl:order-3 md:order-7 md:col-span-3 md:row-span-2 order-8 col-span-3 row-span-1",
    4: "2xl:col-span-1 2xl:row-span-3 2xl:order-4 md:order-8 md:col-span-3 md:row-span-2 order-9 col-span-3 row-span-1",
    5: "2xl:col-span-2 2xl:row-span-6 2xl:order-5 md:order-4 md:col-span-6 md:row-span-4 order-6 col-span-6 row-span-2",
    6: "2xl:col-span-2 2xl:row-span-3 2xl:order-6 md:order-9 md:col-span-5 md:row-span-2 order-7 col-span-6 row-span-1",
    7: "2xl:col-span-1 2xl:row-span-3 2xl:order-7 md:order-2 md:col-span-3 md:row-span-2 order-2 col-span-3 row-span-1",
    8: "2xl:col-span-1 2xl:row-span-4 2xl:order-8 md:order-6 md:col-span-4 md:row-span-3 order-4 col-span-2 row-span-1",
    9: "2xl:col-span-2 2xl:row-span-4 2xl:order-9 md:order-10 md:col-span-5 md:row-span-2 order-10 col-span-6 row-span-1",
    10: "2xl:col-span-1 2xl:row-span-3 2xl:order-10 md:order-1 md:col-span-3 md:row-span-2 order-1 col-span-3 row-span-1",
    11: "2xl:col-span-3 2xl:row-span-2 2xl:order-11 md:order-11 md:col-span-10 md:row-span-2 order-11 col-span-6 row-span-1",
};

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid gap-4 mx-auto p-8",
                "2xl:grid-cols-6 2xl:grid-rows-10 2xl:h-screen",
                "md:grid-cols-10 md:grid-rows-12 md:p-4",
                "grid-cols-6 grid-rows-12 p-2",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    children,
    className,
    id
}: {
    children: React.ReactNode;
    className?: string;
    id: number;
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 40;
        const y = (clientY - (rect.top + rect.height / 2)) / 40;
        setMousePosition({ x, y });
    };
    return (
        <motion.section
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            style={{
                transform: isHovering
                    ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
                    : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.3s ease-out",
            }}
            className={cn(
                "mx-auto w-full bg-black  relative rounded-2xl overflow-hidden",
                bentoConfig[id],
                className
            )}
        >
            <div
                className="relative  h-full [background-image:radial-gradient(95%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] "
                style={{
                    boxShadow:
                        "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
                }}
            >
                <motion.div
                    style={{
                        transform: isHovering
                            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
                            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                        transition: "transform 0.3s ease-out",
                    }}
                    className={cn(
                        "h-full border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
                    )}
                >
                    {children}
                </motion.div>
            </div>
        </motion.section>
    );
};


export default BentoGrid;