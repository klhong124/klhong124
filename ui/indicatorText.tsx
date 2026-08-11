'use client'
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const IndicatorText = ({ children, className }: { children: React.ReactNode, className?: string }) =>
    <motion.span
        initial={{ opacity: 0 }}
        animate={{
            opacity: 0.7,
            transition: {
                duration: 1,
                delay: 0.5
            }
        }}
        exit={{ opacity: 0 }}
        className={cn(
            "font-medium text-fluid-sm text-secondary tracking-[0.1em] text-muted",
            className
        )}
    >
        <span className='text-gray-500'>-</span>
        <span className='px-2'>
            {children}
        </span>
        <span className='text-gray-500'>-</span>
    </motion.span>


export default IndicatorText;
