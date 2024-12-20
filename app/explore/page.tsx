import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import Hashtag from '@/ui/bento/items/hashtag';
import Background from "@/ui/background";
import SkillSet from "@/ui/bento/items/skill-set";
import Introduction from "@/ui/bento/items/introduction";
import Profile from "@/ui/bento/items/profile";
import Animation from "@/ui/bento/items/animation";
import Location from "@/ui/bento/items/location";
import Work from "@/ui/bento/items/work";
import Testing from "@/ui/bento/items/optimization";
import IndicatorText from "@/ui/indicatorText";


export default function ExplorePage() {
    return (
        <Background>
            <IndicatorText className="absolute top-4 left-1/2 -translate-x-1/2 xl:hidden z-10">
                Scroll to explore
            </IndicatorText>

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
                    <Location />
                </GridItem>
                <GridItem id={5}>
                    <Introduction />
                </GridItem>
                <GridItem id={6}>
                    <CodePattern />
                </GridItem>
                <GridItem id={7}>
                    <Animation />
                </GridItem>
                <GridItem id={8}>
                    <SkillSet />
                </GridItem>
                <GridItem id={9}>
                    <Work />
                </GridItem>
                <GridItem id={10}>
                    <Testing />
                </GridItem>
                <GridItem id={11}>
                    <Hashtag />
                </GridItem>
            </BentoGrid >
        </Background>
    );
}