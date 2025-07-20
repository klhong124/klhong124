'use client';
import { useState, useMemo, useLayoutEffect, createContext, useContext, Dispatch, SetStateAction } from "react";

export type Mouse = {
    x: number;
    y: number;
    isActive: boolean;
};

const MouseContext = createContext<[Mouse, Dispatch<SetStateAction<Mouse>>] | undefined>(undefined);

export default MouseContext;

export const useMouse = () => {
    const context = useContext(MouseContext);
    if (context === undefined) {
        throw new Error("useMouse must be used within a MouseProvider");
    }
    return context;
};


export const MouseContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, isActive: false });

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            setMouse(prev => ({
                ...prev,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            }));
            window.addEventListener('mousemove', (e) => {
                setMouse(prev => ({
                    ...prev,
                    isActive: true,
                    x: e.clientX,
                    y: e.clientY,
                }));
            });
        }
        return () => {
            setMouse(prev => ({
                ...prev,
                isActive: false,
            }));
            window.removeEventListener('mousemove', (e) => {
                setMouse(prev => ({
                    ...prev,
                    isActive: true,
                    x: e.clientX,
                    y: e.clientY,
                }));
            });
        }
    }, []);
    return (
        <MouseContext.Provider value={useMemo(() => [mouse, setMouse], [mouse, setMouse])}>
            {children}
        </MouseContext.Provider>
    )
}
