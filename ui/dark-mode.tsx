"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const DarkMode = ({ children }: { children?: React.ReactNode; }) => {
    const [darkMode, setDarkMode] = useState(true);

    return (
            <motion.div
                className='absolute pointer-events-none w-[200vw] h-[200vw] dark:bg-black bg-white -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black_30%,black)]'

            />
    );
};

export default DarkMode;    