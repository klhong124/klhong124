"use client";
import { motion } from "motion/react";

import BentoGrid, { BentoGridItem as GridItem } from '@/ui/bento/grid';
import Experience from '@/ui/bento/items/experience';
import CodePattern from '@/ui/bento/items/code-pattern';
import PixelPerfect from '@/ui/bento/items/pixel-perfect';
import SoftSkills from '@/ui/bento/items/soft-skills';
import SkillSet from "@/ui/bento/items/skill-set";
import Profile from "@/ui/bento/items/profile";
import Animation from "@/ui/bento/items/animation";
import Location from "@/ui/bento/items/location";
import Work from "@/ui/bento/items/work";
import Testing from "@/ui/bento/items/optimization";
import TextHoverEffect from "@/ui/textHoverEffect";
import WindowControl from '@/ui/windowControl';
import Timeline from "@/ui/timeline";
import { cn } from '@/utils/cn';
import HeroSection from "@/components/heroSection";

export default function Home() {

  return (
    <div  className="relative">
      {/* Hero Section */}
        <HeroSection />

      {/* Bento Grid Section */}
      {/* <motion.div
        className="min-h-screen w-screen mt-12 py-12"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <BentoGrid className="h-full mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <GridItem id={1}>
              <Location />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GridItem id={2}>
              <PixelPerfect />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GridItem id={3}>
              <Experience />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <GridItem id={4}>
              <Location />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <GridItem id={5}>
              <Profile />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <GridItem id={6}>
              <CodePattern />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <GridItem id={7}>
              <Animation />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <GridItem id={8}>
              <SkillSet />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <GridItem id={9}>
              <Work />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <GridItem id={10}>
              <Testing />
            </GridItem>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <GridItem id={11}>
              <SoftSkills />
            </GridItem>
          </motion.div>
        </BentoGrid>
      </motion.div> */}

      {/* Work Section */}
      {/* <motion.div
        className="h-screen relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-200px" }}
      >
        <div className="flex-center h-full">
          <motion.div
            className={cn("glass max-w-5xl py-24 px-6 md:px-24 my-24 mx-6 md:mx-24")}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TextHoverEffect>WORK</TextHoverEffect>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Timeline />
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <WindowControl />
            </motion.div>
          </motion.div>
        </div>
      </motion.div> */}
    </div>
  );
}


