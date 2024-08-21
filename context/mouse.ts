import { createContext, useContext } from "react";

const MouseContext = createContext({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
});

export const useMousePosition = () => {
    const context = useContext(MouseContext);
    if (context === undefined) {
        throw new Error("useMousePosition must be used within a MousePositionProvider");
    }
    return context;
};

export default MouseContext;