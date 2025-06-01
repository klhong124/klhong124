'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type VisibilityContextType = {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
};

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
    const context = useContext(VisibilityContext);
    if (!context) {
        throw new Error('useVisibility must be used within a VisibilityProvider');
    }
    return context;
};

export const VisibilityProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <VisibilityContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </VisibilityContext.Provider>
    );
};