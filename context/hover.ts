import { createContext, useContext } from "react";
const HoverContext = createContext(false);

export const useHover = () => {
    const context = useContext(HoverContext);
    if (context === undefined) {
        throw new Error("useHover must be used within a HoverProvider");
      }
      return context;
};

export default HoverContext;