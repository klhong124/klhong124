'use client'
import { cn } from "@/utils/cn";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Dock = ({
    items = [
        {
            title: "Linkedin",
            href: "https://www.linkedin.com/in/ryankwandev/",
        },
        {
            title: "Github",
            href: "https://github.com/klhong124",
        },
        {
            title: "X",
            href: "https://x.com/ryankwandev",
        },
        {
            title: "Inbox",
            href: "mailto:klhong124+inbox@gmail.com",

        },
        {
            title: "Medium",
            href: "https://medium.com/@ryankwandev",

        },
        {
            title: "Whatsapp",
            href: "https://wa.me/447878154432",
        },

    ],
    ...props
}: any) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <div {...props}>
            <motion.div
                onMouseMove={(e) => { mouseX.set(e.pageX) }}
                onMouseLeave={() => { mouseX.set(Infinity) }}
                className={cn(
                    "absolute bottom-8 left-0 right-0 flex h-16 gap-4 items-center rounded-2xl justify-center",
                )}
            >
                {items.map((item: { title: string; href: string; }) => (
                    <IconContainer mouseX={mouseX} key={item.title} {...item} />
                ))}
            </motion.div>
        </div>
    );
};


function IconContainer({
    mouseX,
    title,
    href,
}: Readonly<{
    mouseX: MotionValue;
    title: string;
    href: string;
}>) {

    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 55, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 55, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);
    const pathname = usePathname();
    const showDot = pathname === href;

    return (
        <Link
            href={href.startsWith('mailto:') ? `${href}?subject=Interest in your expertise in Full-Stack Development&body=Hi Ryan,` : href}
            target={href.startsWith('http') ? "_blank" : undefined}
            onClick={(e) => {
                if (pathname === href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }}
        >
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn("aspect-square rounded-xl bg-stone-700 flex items-center justify-center relative",
                    hovered && "shadow-[0px_12px_18px_-12px_var(--black)]",
                    "transition-shadow duration-300"
                )}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -2, x: "-50%" }}
                            className={cn(
                                "font-spaceGrotesk px-2 py-0.5 whitespace-pre rounded-md",
                                "bg-neutral-900 border-neutral-900 text-neutral-100",
                                "absolute left-1/2 -translate-x-1/2 -bottom-7",
                                "w-fit text-sm"
                            )}
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    <Image
                        src={`/svg/${title.toLowerCase()}.svg`}
                        alt={title}
                        width={46}
                        height={46}
                        className="invert"
                    />
                </motion.div>
            </motion.div>
            <motion.div
                className="w-1 h-1 rounded-full bg-neutral-400 mx-auto mt-1 -mb-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showDot ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.2 }}
            />
        </Link>
    );
}

export default Dock;