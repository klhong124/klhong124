import { cn } from "@/utils/cn";
import Dock from "@/ui/dock";
import getGithubStats from "@/utils/github";
import { GitBranch, Star, Users } from 'lucide-react'
import Image from "next/image";

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
        <div className={cn("flex justify-between px-4")}>
            <StatItem icon={<GitBranch />} label="Repos" value={repos} />
            <StatItem icon={<Star />} label="Stars" value={stars} />
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
                    "rounded-full w-24 h-24 relative overflow-hidden"
                )}>
                    <Image
                        src="/icon.gif"
                        alt="Profile"
                        fill
                    />
                </div>


                <div className="flex-1">
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

                </div>

            </div>

            <GithubStats />

            <Dock className="absolute bottom-4 left-1/2 -translate-x-1/2" />

        </div>
    );
}

export default Profile;