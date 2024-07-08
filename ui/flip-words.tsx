"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function FlipWords({
  words = [
    "Seamless Integration",
    "AI-Driven Insights",
    "Stunning Visuals",
    "Cutting-Edge Technology",
    "Elegant Animations",
    "Modern Frameworks"
  ],
  duration = 3000,
  className,
}: Readonly<{
  words?: readonly string[];
  duration?: number;
  className?: string;
}>) {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          filter: "blur(12px)",
          scale: 1.5,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left",
          className
        )}
        key={currentWord}
      >
        {currentWord.split("").map((letter, index) => {
          const isSpace = letter === " ";

          // ease out the animation
          const reverseIndex = currentWord.length - index - 1;
          const opacity = [0.6, 0.7, 0.8, 0.9]
          const blur = [2, 1.5, 1, 0.5]
          const blurAmount = blur[reverseIndex] || 0;
          const opacityAmount = opacity[reverseIndex] || 1;

          return isSpace ? (
            <span key={currentWord + index} className="inline-block">&nbsp;</span>
          ) : (
            <motion.span
              key={currentWord + index}
              initial={{
                opacity: 0,
                y: 10,
                filter: "blur(8px)"
              }}
              animate={{
                opacity: opacityAmount,
                y: 0,
                filter: `blur(${blurAmount}px)`
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.span>
    </AnimatePresence>
  );
};
