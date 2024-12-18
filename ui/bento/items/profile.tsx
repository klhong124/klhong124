"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Dock from "@/ui/dock";

export function Profile() {
    return (
        <div className={cn(
            "p-8"
        )}>
            {/* profile image */}
            <div className={cn(
                "rounded-full w-32 h-32 relative overflow-hidden mb-4"
            )}>
                <Image
                    src="/icon.gif"
                    alt="Profile"
                    fill
                />
            </div>

            {/* profile name */}
            <div className="flex items-center gap-4 mb-2">

                <h1 className={cn(
                    "text-3xl font-bold text-primary"
                )}>
                    Ryan Kwan
                </h1>


            </div>


            {/* profile title */}
            <h2 className={cn(
                "text-md font-normal text-secondary"
            )}>
                Experienced Front-end Developer in Next.js
            </h2>

            <Dock />

            <a href="https://wakatime.com/@ryankwandev" target="_blank">
                <img src="https://wakatime.com/badge/user/e5861fa7-60ad-4e2e-8d44-eefbc5ee063e.svg?style=for-the-badge" alt="wakatime" />
            </a>
        </div>
    );
}

export default Profile;