import Background from "@/ui/background";
import WindowControl from "@/ui/windowControl";
import { cn } from "@/utils/cn";

const WorkPage = () => {
    return (
        <Background>
            <div
                className={cn("glass container w-screen h-screen p-24 m-24")}
            >
                <div className="">
                    Work
                </div>
                <WindowControl />
            </div>

        </Background>
    )
}

export default WorkPage;