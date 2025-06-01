'use client'

import { useMouse } from "@/hooks/useMouse";
import { cn } from "@/utils/cn";
import throttle from "@/utils/throttle";
import Cursor from "@/ui/cursor";
import { AnimatePresence } from "motion/react";

export default function Body({ children }: Readonly<{ children: React.ReactNode }>) {
    const [{ isActive }, setMouse] = useMouse()
    const handleMouseMove = (event: React.MouseEvent) => {
        setMouse(prev => ({
            ...prev,
            isActive: true,
            x: event.clientX,
            y: event.clientY,
        }));
    };
    return (
        <div className={cn('dark min-h-screen')} onMouseMove={throttle(handleMouseMove)}>
            {children}
            <AnimatePresence>
                {isActive && <Cursor />}
            </AnimatePresence>
        </div>
    );
}