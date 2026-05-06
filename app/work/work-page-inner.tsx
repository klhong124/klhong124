"use client";

import TextHoverEffect from "@/ui/textHoverEffect";
import Timeline from "@/ui/timeline";
import WindowControl from "@/ui/windowControl";
import { GlassCard } from "@/components/shared/glass-card";

export function WorkPageInner() {
  return (
    <div className="flex-center">
      <GlassCard className="my-24 mx-6 max-w-5xl md:mx-24" round="3xl" innerClassName="py-24 px-6 md:px-24">
        <TextHoverEffect>WORK</TextHoverEffect>
        <Timeline />
        <WindowControl />
      </GlassCard>
    </div>
  );
}
