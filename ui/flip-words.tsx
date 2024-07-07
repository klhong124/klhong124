"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
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
}: {
  words?: string[];
  duration?: number;
  className?: string;
}) {
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
          filter: "blur(8px)",
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left px-2",
          className
        )}
        key={currentWord}
      >
        {currentWord.split("").map((letter, index) => {
          const isSpace = letter === " ";

          // ease out the animation
          const reverseIndex = currentWord.length - index - 1;
          const opacity = Array.from({ length: 4 }, (_, i) => parseFloat((0.8 + i * (1 - 0.8) / 4).toFixed(2)));
          const blur = Array.from({ length: 4 }, (_, i) => parseFloat((1.5 - i * (1.5 / 4)).toFixed(2)));
          const blurAmount = blur[reverseIndex] || 0;
          const opacityAmount = opacity[reverseIndex] || 1;

          return isSpace ? (
            <span key={currentWord + index} className="inline-block">&nbsp;</span>
          ) : (
            <motion.span
              key={currentWord + index}
              initial={{
                opacity: 0.3,
                x: 50,
                filter: "blur(8px)"
              }}
              animate={{
                opacity: opacityAmount,
                x: 0,
                filter: `blur(${blurAmount}px)`
              }}
              transition={{
                delay: index * 0.03,
                duration: 0.5,
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
