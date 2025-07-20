"use client";
import CodeTyping from '@/ui/code-typing';
import { motion } from 'motion/react';

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-12">
                    <motion.h1
                        className="text-4xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        IDE Code Typing Animation
                    </motion.h1>
                    <motion.p
                        className="text-gray-400 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Watch code come to life with realistic typing animations
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <CodeTyping
                        filename="Portfolio.tsx"
                        language="typescript"
                        autoStart={true}
                        typeSpeed={60}
                        className="max-w-full"
                    />
                </motion.div>

                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <p className="text-gray-500 text-sm">
                        💡 Click "Start" to restart the animation or "Reset" to clear the code
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}