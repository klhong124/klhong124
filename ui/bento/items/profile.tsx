import { cn } from "@/utils/cn";
import Dock from "@/ui/dock";
import getGithubStats from "@/utils/github";
import { GitBranch, Star, Users } from 'lucide-react'
import Image from "next/image";

const WakatimeStats = () => {
    return <a href="https://wakatime.com/@ryankwandev" target="_blank">
        <img src="https://wakatime.com/badge/user/e5861fa7-60ad-4e2e-8d44-eefbc5ee063e.svg?style=for-the-badge" alt="wakatime" />
    </a>

}


function StatItem({ icon, label, value }: Readonly<{ icon: React.ReactNode, label: string, value: number }>) {
    return (
        <div className="flex items-center space-x-4 text-gray-300">
            {icon}
            <div>
                <div className="text-sm font-medium text-muted-foreground">{label}</div>
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
            </div>
        </div>
    )
}



const GithubStats = async () => {
    const { stars, repos, followers } = await getGithubStats()

    return (
        <div className={cn("flex justify-between px-8")}>
            <StatItem icon={<Star />} label="Stars" value={stars} />
            <StatItem icon={<GitBranch />} label="Repos" value={repos} />
            <StatItem icon={<Users />} label="Followers" value={followers} />
        </div>
    )
}

export function Profile() {

    return (
        <div className={cn(
            "p-8 flex flex-col gap-2 item"
        )}>


            <div className="flex items-center gap-8 mb-4">
                <div className={cn(
                    "rounded-full w-32 h-32 relative overflow-hidden"
                )}>
                    <Image
                        src="/icon.gif"
                        alt="Profile"
                        fill
                    />
                </div>


                <div>
                    <h1 className={cn(
                        "text-3xl font-bold text-primary mb-2"
                    )}>
                        Ryan Kwan
                    </h1>
                    <h2 className={cn(
                        "text-md font-normal text-secondary"
                    )}>
                        Experienced Front-end Developer in Next.js
                    </h2>
                    <Dock />

                </div>

            </div>

            <GithubStats />

            {/* profile title */}
            {/* <WakatimeStats /> */}
            <br />

        </div>
    );
}

export default Profile;