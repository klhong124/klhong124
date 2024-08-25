import React from 'react';
import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import Hashtag from '@/ui/bento/items/hashtag';
import ComingSoon from '@/ui/bento/items/coming-soon';
import Ability from '@/ui/bento/items/ability';
import WindowControl from "@/ui/windowControl";

export default function Bento() {
    return (
        <BentoGrid>
            <GridItem id={1}>
                <Ability />
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
                <WindowControl />
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
        </BentoGrid >
    );
}