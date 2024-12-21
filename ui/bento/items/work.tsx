"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import jobs from "@/utils/jobs";
import { cn } from "@/utils/cn";
import TextHoverEffect from "@/ui/textHoverEffect";

const Thumbnail = ({ images, ...props }: {
    images: string[];
    [key: string]: any;
}) => {
    return (
        <motion.div
            {...props}
        >
            <motion.div
                className={cn(
                    "[transform-style:preserve-3d]",
                    "[transform-origin:center]",
                    "[transform:rotateY(-50deg)]",
                    "shadow-[0_15px_25px_rgba(0,0,0,0.2)]",
                    'rounded-xl overflow-hidden',
                    'w-[280px] h-[160px]',
                    'border-2 border-stone-100/10',
                    "relative"
                )}
            >

                <Image
                    src={Array.isArray(images) ? images[0] : images}
                    alt="thumbnail"
                    className="object-cover object-right-top"
                    fill
                    sizes="100%"
                    priority
                />

            </motion.div>
        </motion.div >
    );
};

const Work = () => {
    return (
        <div className="w-full h-full relative">
            <Link
                href={`/explore/work`}
                prefetch={true}
            >
                <TextHoverEffect className={cn('absolute w-full')}>WORK</TextHoverEffect>

                <div className={cn('flex flex-row-reverse items-center justify-center mt-[10%]',
                    'xl:scale-[0.7] 2xl:scale-100'
                )}>
                    {
                        jobs.filter(job => job.images).reverse().map((job, index) => (
                            <Thumbnail
                                className={cn('w-12')}
                                style={{
                                    perspective: "1000px",
                                    scale: 1 + index * 0.04,
                                }}
                                initial={{
                                    x: -120,
                                }}
                                whileHover={{
                                    x: index === jobs.length - 1 ? -110 : -100,
                                }}
                                key={index}
                                img={job.images!}
                            />
                        ))
                    }

                </div>
            </Link>
        </div>
    );
};

export default Work;