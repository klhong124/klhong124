"use client";
import React from "react";
import { cn } from "@/utils/cn";


export function ComingSoon({
    children
}: any) {
    return (
        <div
            className="h-full"
        >
            <div className={cn("flex gap-2 w-full p-4 xl:p-6")}>
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
            {children}
        </div>

    );
}

export default ComingSoon;