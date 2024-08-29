'use client'
import { cn } from "@/utils/cn";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    useMotionValueEvent
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";


const Dock = ({
    items = [
        {
            title: "Home",
            icon: (
                <svg width="46" height="46" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 20v-7.826a4 4 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L3.253 9.266A4 4 0 0 0 2 12.174V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"></path>
                </svg>
            ),
            href: "/",
        },
        {
            title: "Explore",
            icon: (
                <svg width="46" height="46" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                </svg>
            ),
            href: "/explore",
        },

        {
            title: "Linkedin",
            icon: (
                <svg width="46" height="46" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02 3.951 0 4.889 2.118 4.889 6.004V22h-4v-6.312c0-2.213-.535-3.461-1.897-3.461-1.889 0-2.674 1.345-2.674 3.46V22h-4V8.969zM2.57 21.83h4V8.799h-4V21.83zM7.143 4.55a2.53 2.53 0 0 1-.753 1.802 2.573 2.573 0 0 1-1.82.748 2.59 2.59 0 0 1-1.818-.747A2.548 2.548 0 0 1 2 4.55c0-.677.27-1.325.753-1.803A2.583 2.583 0 0 1 4.571 2c.682 0 1.336.269 1.819.747.482.478.753 1.126.753 1.803z" clip-rule="evenodd"></path>
                </svg>
            ),
            href: "https://www.linkedin.com/in/ryankwandev/",
        },
    ],
    hideOnTop = false,
}: {
    items?: { title: string; icon: React.ReactNode; href: string }[];
    hideOnTop?: boolean;
}) => {
    let mouseX = useMotionValue(Infinity);
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(!hideOnTop);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 0 || !hideOnTop);
    });

    return (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className={cn(
                    "flex h-16 gap-4 items-end rounded-2xl px-4 pb-3",
                    "bg-stone-200/10 backdrop-blur-xs",
                    "border border-stone-100/10 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]",
                )}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                {items.map((item) => (
                    <IconContainer mouseX={mouseX} key={item.title} {...item} />
                ))}
            </motion.div>
        </div>
    );
};


function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: Readonly<{
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
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
            href={href}
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
                className="aspect-square rounded-xl bg-stone-700 flex items-center justify-center relative"
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
                    {icon}
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