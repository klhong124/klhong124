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
            title: "Home",
            href: "/",
        },
        {
            title: "Explore",
            href: "/explore",
        },
        null,
        {
            title: "Linkedin",
            href: "https://www.linkedin.com/in/ryankwandev/",
            shadow: "shadow-[0px_12px_18px_-12px_var(--blue-500)]",
        },
        {
            title: "Github",
            href: "https://github.com/klhong124",
            shadow: "shadow-[0px_12px_18px_-12px_var(--gray-700)]",
        },
        {
            title: "X",
            href: "https://x.com/ryankwandev",
            shadow: "shadow-[0px_12px_18px_-12px_var(--black)]",
        },
        {
            title: "Inbox",
            href: "mailto:klhong124+inbox@gmail.com",

        },
        {
            title: "Medium",
            href: "https://medium.com/@ryankwandev",
            shadow: "shadow-[0px_12px_18px_-12px_var(--white)]",

        },
        {
            title: "Whatsapp",
            href: "https://wa.me/447878154432",
            shadow: "shadow-[0px_12px_18px_-12px_var(--green-500)]",
        },

    ],
    ...props
}: any) => {
    let mouseX = useMotionValue(Infinity);
    let [isHover, setIsHover] = useState(false);

    return (
        <motion.div {...props} className="fixed bottom-2 left-1/2 -translate-x-1/2">
            <motion.div
                onMouseMove={(e) => { mouseX.set(e.pageX); setIsHover(true) }}
                onMouseLeave={() => { mouseX.set(Infinity); setIsHover(false) }}
                className={cn(
                    "flex h-16 gap-4 items-end rounded-2xl px-4 pb-3",
                    "bg-stone-200/10 backdrop-blur-sm",
                    "border border-stone-100/10 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                )}
                animate={{
                    opacity: isHover ? 1 : 0,
                    y: isHover ? 0 : 50,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                {items.map((item: { title: string; href: string; shadow?: string } | null) => (
                    item
                        ? <IconContainer mouseX={mouseX} key={item.title} {...item} />
                        : <div key={Math.random().toString()} className={cn("h-[40px] border-r border-stone-100/10")} />
                ))}
            </motion.div>
        </motion.div >
    );
};


function IconContainer({
    mouseX,
    title,
    href,
    shadow,
}: Readonly<{
    mouseX: MotionValue;
    title: string;
    href: string;
    shadow?: string;
}>) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

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
                    hovered && shadow,
                    "transition-shadow duration-300"
                )}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className={cn(
                                "font-spaceGrotesk px-2 py-0.5 whitespace-pre rounded-md",
                                "bg-neutral-900 border-neutral-900 text-neutral-100",
                                "absolute left-1/2 -translate-x-1/2 -top-8",
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