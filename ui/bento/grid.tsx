"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const bentoConfig: { [key: number]: string } = {
    1: "z-10 xl:col-span-2 xl:row-span-4 xl:order-1 md:order-3 md:col-span-4 md:row-span-3 order-3 col-span-4 row-span-1",
    2: "z-10 xl:col-span-2 xl:row-span-2 xl:order-2 md:order-5 md:col-span-4 md:row-span-2 order-5 col-span-6 row-span-1",
    3: "xl:col-span-1 xl:row-span-3 xl:order-3 md:order-7 md:col-span-3 md:row-span-2 order-8 col-span-3 row-span-1",
    4: "z-10 xl:col-span-1 xl:row-span-3 xl:order-4 md:order-8 md:col-span-3 md:row-span-2 order-9 col-span-3 row-span-1",
    5: "z-[99] xl:col-span-2 xl:row-span-6 xl:order-5 md:order-4 md:col-span-6 md:row-span-4 order-6 col-span-6 row-span-2",
    6: "xl:col-span-2 xl:row-span-3 xl:order-6 md:order-9 md:col-span-5 md:row-span-2 order-7 col-span-6 row-span-1",
    7: "z-10 xl:col-span-1 xl:row-span-3 xl:order-7 md:order-2 md:col-span-3 md:row-span-2 order-2 col-span-3 row-span-1",
    8: "z-[98] xl:col-span-1 xl:row-span-4 xl:order-8 md:order-6 md:col-span-4 md:row-span-3 order-4 col-span-2 row-span-1",
    9: "z-10 xl:col-span-2 xl:row-span-4 xl:order-9 md:order-10 md:col-span-5 md:row-span-2 order-10 col-span-6 row-span-1",
    10: "z-10 xl:col-span-1 xl:row-span-3 xl:order-10 md:order-1 md:col-span-3 md:row-span-2 order-1 col-span-3 row-span-1",
    11: "z-0 xl:col-span-3 xl:row-span-2 xl:order-11 md:order-11 md:col-span-10 md:row-span-2 order-11 col-span-6 row-span-1",
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
                "grid gap-4 min-h-[1100px] overflow-hidden w-screen",
                "xl:grid-cols-6 xl:grid-rows-10 xl:h-screen xl:gap-6",
                "md:grid-cols-10 md:grid-rows-12 md:p-4",
                "grid-cols-6 grid-rows-12 p-2 ",
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
    children?: React.ReactNode;
    className?: string;
    id: number;
}) => {
    return (
        <motion.section
            className={cn(
                " w-full relative  overflow-visible rounded-2xl border border-[rgba(255,255,255,0.10)]",
                bentoConfig[id],
                className
            )}
        >
            {children}
        </motion.section>
    );
};


export default BentoGrid;