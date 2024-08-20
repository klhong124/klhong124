import React from 'react';
// import Background from "@/ui/background";
// import Highlight from "@/ui/highlight";
import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import Hashtag from '@/ui/bento/items/hashtag';
import ComingSoon from '@/ui/bento/items/coming-soon';
import { cn } from "@/utils/cn";

export default function Bento() {
    return (
        <BentoGrid>

            {/* <div>
            <div className={cn(
              "text-xl sm:text-4xl md:text-5xl mx-auto tracking-wide",
              "text-slate-300"
            )}>
              Crafting High-Efficiency Websites <br />
              with <FlipWords className="text-slate-300" />
            </div>
            <div className="mt-2 sm:mt-4">
              With the power of <Highlight>React</Highlight> <Highlight>Vue</Highlight> <Highlight>GraphQL</Highlight> and more
            </div>
          </div> */}
            <GridItem id={1}>
                <ComingSoon />
            </GridItem>
            <GridItem id={2}>
                <ComingSoon />
            </GridItem>
            <GridItem id={3}>
                <Experience />
            </GridItem>
            <GridItem id={4}>
                <ComingSoon />
            </GridItem>
            <GridItem id={5}>
                <ComingSoon />
            </GridItem>
            <GridItem id={6}>
                <CodePattern />
            </GridItem>
            <GridItem id={7}>
                <ComingSoon />
            </GridItem>
            <GridItem id={8}>
                <ComingSoon />
            </GridItem>
            <GridItem id={9}>
                <Hashtag />
            </GridItem>
            <GridItem id={10}>
                <ComingSoon />
            </GridItem>
            <GridItem id={11}>
                <PixelPerfect />
            </GridItem>
        </BentoGrid>
    );
}