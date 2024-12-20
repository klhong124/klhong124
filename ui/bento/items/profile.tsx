import { cn } from "@/utils/cn";
import Dock from "@/ui/dock";
import getGithubStats from "@/utils/github";
import { GitBranch, Star, Users } from 'lucide-react'
import Image from "next/image";

function StatItem({ icon, label, value }: Readonly<{ icon: React.ReactNode, label: string, value: number }>) {
    return (
        <a className="flex items-center space-x-4"
            href="https://github.com/klhong124/Portfolio"
            target="_blank"
        >
            {icon}
            <div>
                <div className="text-sm font-medium text-muted-foreground text-secondary">{label}</div>
                <div className="text-2xl font-bold text-primary">{value.toLocaleString()}</div>
            </div>
        </a>
    )
}



const GithubStats = async () => {
    const { stars, repos, followers } = await getGithubStats()

    return (
        <div className={cn("flex justify-around")}>
            <StatItem icon={<GitBranch className="text-blue-400" />} label="Repos" value={repos} />
            <StatItem icon={<Star className="text-yellow-400" />} label="Stars" value={stars} />
            <StatItem icon={<Users className="text-red-400" />} label="Followers" value={followers} />
        </div>
    )
}

export function Profile() {

    return (
        <div className={cn(
            "flex flex-col gap-2 h-full py-6 max-w-xl mx-auto",
            "2xl:px-8 xl:px-6 px-4"

        )}>


            <div className="flex items-center gap-8 mb-2">
                <div className={cn(
                    "rounded-full w-24 h-24 relative overflow-hidden"
                )}>
                    <Image
                        src="/icon.gif"
                        alt="Profile"
                        fill
                        sizes="100%"
                        priority
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

            <div className="mt-auto mb-1">
                <div
                    className="font-medium tracking-wide text-secondary text-center opacity-70">
                    - Lets get in touch -
                </div>
                <Dock />
            </div>

        </div>
    );
}

export default Profile;