import { cn } from "@/utils/cn";

const WindowControl = () => {
    return (
        <div className="absolute top-0 left-0 h-0">
            <div className={cn("flex gap-2 p-4 xl:p-6")}>
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
        </div>
    );
};

export default WindowControl;