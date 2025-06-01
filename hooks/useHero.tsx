'use client';
import { useState, useMemo, useLayoutEffect, createContext, useContext, Dispatch, SetStateAction } from "react";

export type Hero = {
    isHover: boolean;
    isTap: boolean;
    isClick: boolean;
};

const HeroContext = createContext<[Hero, Dispatch<SetStateAction<Hero>>] | undefined>(undefined);

export default HeroContext;

export const useHero = () => {
    const context = useContext(HeroContext);
    if (context === undefined) {
        throw new Error("useHero must be used within a HeroProvider");
    }
    return context;
};


export const HeroContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [hero, setHero] = useState<Hero>({
        isHover: false,
        isTap: false,
        isClick: false
    });

    return (
        <HeroContext.Provider value={useMemo(() => [hero, setHero], [hero, setHero])}>
            {children}
        </HeroContext.Provider>
    )
}
