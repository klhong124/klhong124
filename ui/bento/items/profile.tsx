"use client";
import { cn } from "@/utils/cn";
import getGithubStats from "@/utils/github";
import { GitBranch, Star, Users } from 'lucide-react'
import Image from "next/image";
import IndicatorText from "@/ui/indicatorText";
import { useEffect, useState } from "react";

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

const GithubStats = () => {
    const [stats, setStats] = useState({ stars: 25, repos: 12, followers: 9 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getGithubStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch GitHub stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex justify-around">Loading...</div>;
    }

    return (
        <div className={cn("flex justify-around")}>
            <StatItem icon={<GitBranch className="text-blue-400" />} label="Repos" value={stats.repos} />
            <StatItem icon={<Star className="text-yellow-400" />} label="Stars" value={stats.stars} />
            <StatItem icon={<Users className="text-red-400" />} label="Followers" value={stats.followers} />
        </div>
    )
}

export function Profile() {
    return (
        <div className={cn(
            "flex flex-col gap-2 h-full py-6 max-w-xl mx-auto",
            "2xl:px-8 xl:px-6 px-4"
        )}>
            <div className="flex items-center gap-6 mb-2 md:px-6">
                <div className={cn(
                    "rounded-full w-24 h-24 relative overflow-hidden"
                )}>
                    <Image
                        src="/icon.png"
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

            <p className="mt-12 text-secondary">
                Adept at crafting dynamic UIs, immersive user experiences, and performant systems that delight users. Seeking a frontend role where design, interaction, and modern web architecture intersect..
            </p>

            <div className="mt-auto mb-1 text-center">
                <IndicatorText>Lets get in touch</IndicatorText>
            </div>
        </div>
    );
}

export default Profile;