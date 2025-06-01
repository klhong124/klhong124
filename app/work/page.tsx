import Background from "@/ui/background";
import WindowControl from "@/ui/windowControl";
import TextHoverEffect from "@/ui/textHoverEffect";
import { cn } from "@/utils/cn";
import { Metadata } from 'next';
import Timeline from "@/ui/timeline";
export const metadata: Metadata = {
    title: "Work"
}


const WorkPage = () => {
    return (
        <div className="flex-center">

            <div
                className={cn("glass max-w-5xl py-24 px-6 md:px-24 my-24 mx-6 md:mx-24")}
            >
                <TextHoverEffect>WORK</TextHoverEffect>
                <Timeline />
                <WindowControl />
            </div>
        </div>

    )
}

export default WorkPage;