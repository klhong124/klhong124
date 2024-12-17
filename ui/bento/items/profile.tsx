"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Dock from "@/ui/dock";

export function Profile() {
    return (
        <div className={cn(
            "p-6"
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
            <h1 className={cn(
                "text-2xl font-bold text-primary mb-2"
            )}>
                Ryan Kwan
            </h1>

            {/* profile title */}
            <h2 className={cn(
                "text-md font-normal text-secondary"
            )}>
                Experienced Front-end Developer in Next.js
            </h2>

            <Dock />
        </div>
    );
}

export default Profile;