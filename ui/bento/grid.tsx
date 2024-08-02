"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const bentoConfig: { [key: number]: string } = {
    1: "xl:col-span-2 xl:row-span-4 xl:order-1 md:order-3 md:col-span-4 md:row-span-3 order-3 col-span-4 row-span-1",
    2: "xl:col-span-2 xl:row-span-2 xl:order-2 md:order-5 md:col-span-4 md:row-span-2 order-5 col-span-6 row-span-1",
    3: "xl:col-span-1 xl:row-span-3 xl:order-3 md:order-7 md:col-span-3 md:row-span-2 order-8 col-span-3 row-span-1",
    4: "xl:col-span-1 xl:row-span-3 xl:order-4 md:order-8 md:col-span-3 md:row-span-2 order-9 col-span-3 row-span-1",
    5: "z-10 xl:col-span-2 xl:row-span-6 xl:order-5 md:order-4 md:col-span-6 md:row-span-4 order-6 col-span-6 row-span-2",
    6: "xl:col-span-2 xl:row-span-3 xl:order-6 md:order-9 md:col-span-5 md:row-span-2 order-7 col-span-6 row-span-1",
    7: "xl:col-span-1 xl:row-span-3 xl:order-7 md:order-2 md:col-span-3 md:row-span-2 order-2 col-span-3 row-span-1",
    8: "xl:col-span-1 xl:row-span-4 xl:order-8 md:order-6 md:col-span-4 md:row-span-3 order-4 col-span-2 row-span-1",
    9: "xl:col-span-2 xl:row-span-4 xl:order-9 md:order-10 md:col-span-5 md:row-span-2 order-10 col-span-6 row-span-1",
    10: "xl:col-span-1 xl:row-span-3 xl:order-10 md:order-1 md:col-span-3 md:row-span-2 order-1 col-span-3 row-span-1",
    11: "xl:col-span-3 xl:row-span-2 xl:order-11 md:order-11 md:col-span-10 md:row-span-2 order-11 col-span-6 row-span-1",
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
                "xl:grid-cols-6 xl:grid-rows-10 xl:h-screen xl:gap-6",
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
    return (
        <motion.section

            className={cn(
                "mx-auto w-full  relative  overflow-visible rounded-2xl bg-black",
                bentoConfig[id],
                className
            )}
        >
            <div
                className=" h-full [background-image:radial-gradient(95%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] overflow-visible rounded-2xl"

            >
                <div
                    className={cn(
                        "border border-[rgba(255,255,255,0.10)]",
                        "h-full overflow-visible rounded-2xl",
                        "dark:bg-[rgba(40,40,40,0.70)]  shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]" ,
                    )}
                >
                    {children}
                </div>
            </div>
        </motion.section>
    );
};


export default BentoGrid;