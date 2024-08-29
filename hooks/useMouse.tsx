'use client';
import { useState, useMemo, useLayoutEffect, createContext, useContext, Dispatch, SetStateAction } from "react";

export type Mouse = {
    x: number;
    y: number;
    isHover: boolean;
    isTap: boolean;
    isClick: boolean;
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
    const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0, isHover: false, isTap: false, isClick: false });

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            setMouse(prevMouse => ({
                ...prevMouse,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            }));
        }
    }, []);
    return (
        <MouseContext.Provider value={useMemo(() => [mouse, setMouse], [mouse, setMouse])}>
            {children}
        </MouseContext.Provider>
    )
}
