import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import Hashtag from '@/ui/bento/items/hashtag';
import ComingSoon from '@/ui/bento/items/coming-soon';

import Background from "@/ui/background";
import SkillSet from "@/ui/bento/items/skill-set";
import Introduction from "@/ui/bento/items/introduction";
import Profile from "@/ui/bento/items/profile";
import Animation from "@/ui/bento/items/animation";
import Work from "@/ui/bento/items/work";

export default function Bento() {
    return (
        <Background>
            <BentoGrid className='"bg-stone-900"'>
                <GridItem id={1}>
                    <Profile />
                </GridItem>
                <GridItem id={2}>
                    <PixelPerfect />
                </GridItem>
                <GridItem id={3}>
                    <Experience />
                </GridItem>
                <GridItem id={4}>
                    <ComingSoon />
                </GridItem>
                <GridItem id={5}>
                    <Introduction />
                </GridItem>
                <GridItem id={6}>
                    <CodePattern />
                </GridItem>
                <GridItem id={7}>
                    <ComingSoon />
                </GridItem>
                <GridItem id={8}>
                    <SkillSet />
                </GridItem>
                <GridItem id={9}>
                    <Work />
                </GridItem>
                <GridItem id={10}>
                    <ComingSoon />
                </GridItem>
                <GridItem id={11}>
                    <Hashtag />
                </GridItem>
            </BentoGrid >
        </Background>
    );
}