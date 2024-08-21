import { createContext, useContext } from "react";

export type Mouse = {
    x: number;
    y: number;
    isHover: boolean;
    isTap: boolean;
};

const MouseContext = createContext<Mouse>({
    x: 0,
    y: 0,
    isHover: false,
    isTap: false,
});

export default MouseContext;

export const useMouse = () => {
    const context = useContext(MouseContext);
    if (context === undefined) {
        throw new Error("useMousePosition must be used within a MousePositionProvider");
    }
    return context;
};
