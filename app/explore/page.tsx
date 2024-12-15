import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import Hashtag from '@/ui/bento/items/hashtag';
import ComingSoon from '@/ui/bento/items/coming-soon';
import WindowControl from "@/ui/windowControl";
import Hello from "@/ui/hello";
import Background from "@/ui/background";
import SkillSet from "@/ui/bento/items/skillset";
export default function Bento() {
    return (
        <Background>
            <BentoGrid className='"bg-stone-950"'>
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
                    <WindowControl />
                    <Hello animated />
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
                    <Hashtag />
                </GridItem>
                <GridItem id={10}>
                    <ComingSoon />
                </GridItem>
                <GridItem id={11}>
                    <PixelPerfect />
                </GridItem>
            </BentoGrid >
        </Background>
    );
}