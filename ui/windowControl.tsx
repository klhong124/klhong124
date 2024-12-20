import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

const WindowControl = () => {
    const router = useRouter();
    const onButtonClick = () => {
        router.push("/");
    }
    return (
        <div className="absolute top-0 left-0 h-0">
            <div className={cn("flex gap-2 p-4 xl:p-6")}>
                {
                    ["bg-red-400", "bg-yellow-400", "bg-green-400"].map((color) => (
                        <button key={color}
                            onClick={onButtonClick}
                            className={cn(
                                "rounded-full border border-gray-700",
                                "w-3 h-3 xl:w-4 xl:h-4",
                                color
                            )}></button>
                    ))
                }
            </div>
        </div>
    );
};

export default WindowControl;