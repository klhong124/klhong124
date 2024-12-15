"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, MotionValue, useMotionValue, useTransform, useSpring, SpringOptions } from "motion/react";
import { useMouse } from "@/hooks/useMouse";
import useMeasure from "react-use-measure";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion as motion3d } from "framer-motion-3d";


const TechStack = () => {
    const [ref, bounds] = useMeasure({ scroll: true });
    const [{ x, y, isHover, isClick }] = useMouse();

    const mouseX: MotionValue<number> = useMotionValue(Infinity);
    const mouseY: MotionValue<number> = useMotionValue(Infinity);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        if (!isHover || isClick) {
            resetMousePosition()
        } else {
            mouseX.set(x - bounds.x - bounds.width / 2);
            mouseY.set(y - bounds.y - bounds.height / 2);
        }
    }, [x, y, bounds, isClick]);

    return (
        <MotionConfig transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 100,
        }}>
            <motion.div
                className={cn(
                    "overflow-visible",
                    "w-screen h-screen",
                    "absolute",
                    "pointer-events-none ",
                )}
                onMouseEnter={() => resetMousePosition()}
                onHoverEnd={() => resetMousePosition()}
                animate={!isHover || isClick ? "rest" : "hover"}
                initial="rest"
                variants={{
                    rest: {
                        opacity: 0,
                        transition: {
                            type: "linear"
                        }
                    },
                    hover: {
                        opacity: 1,
                    },

                }}
                ref={ref}
            >

                <Scene
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            </motion.div>
        </MotionConfig >
    );
};


const Scene = ({ mouseX, mouseY }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) => {

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            style={{ pointerEvents: "none" }}
            resize={{ scroll: false, offsetSize: true }}
        >
            <Lights />

            <Camera mouseX={mouseX} mouseY={mouseY} />

            <motion3d.group
                initial={false}
                dispose={null}
            >
                <Icons
                    gltf="nuxt"
                    scale={0.8}
                    position={[0.1, 0.8, 3]}
                    rotation={[Math.PI / 2, -Math.PI / 15, -0.2]}
                    animate={{
                        rotateZ: [-0.2, Math.PI - 0.2, Math.PI * 2 - 0.2, Math.PI * 2 - 0.2],
                        transition: {
                            times: [0, 0.1, 0.2, 2],
                            duration: 4,
                            repeat: Infinity,
                            ease: ["easeIn", "easeOut", "linear", "linear"],
                        },
                    }}
                />
                <Icons
                    gltf="vue"
                    position={[-1.5, -1.8, 1.6]}
                    rotation={[Math.PI / 2, Math.PI / 20, -0.8]}
                    scale={1.5}
                    animate={{
                        rotateZ: [-0.8, Math.PI - 0.8],
                        transition: {
                            duration: 1,
                            repeatDelay: 3,
                            type: "spring",
                            bounce: 0.4,
                            repeat: Infinity,
                        },
                    }}
                />
                <Icons
                    gltf="react"
                    scale={2.3}
                    position={[4.6, 3, -1]}
                    rotation={[Math.PI / 1.8, 0, 0]}
                    animate={{
                        rotateY: [0, Math.PI * 2],
                        transition: {
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                />
                <Icons
                    gltf="typescript"
                    position={[2.5, 0.5, 1]}
                    rotation={[Math.PI / 1.8, 0, 1]}
                    animate={{
                        rotateY: [Math.PI / 20, -Math.PI / 10],
                        transition: {
                            duration: 1,
                            repeatDelay: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            bounce: 0.5,
                            stiffness: 200,
                            type: "spring",
                        },
                    }}
                />
                <Icons
                    gltf="tailwindcss"
                    scale={1.8}
                    position={[0, -2.8, 0]}
                    rotation={[Math.PI / 2, 0, -0.2]}
                    animate={{
                        y: [-2.5 - 0.2, -2.5, -2.5 - 0.2],
                        rotateY: [-Math.PI / 20, 0, -Math.PI / 20],
                        transition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}

                />
                <Icons
                    gltf="laravel"
                    scale={1.8}
                    position={[3, -3.9, -4]}
                    rotation={[Math.PI / 2, 0, 0.3]}
                />
                <Icons
                    gltf="next"
                    position={[1.8, -0.9, 2.3]}
                    rotation={[Math.PI / 2.5, Math.PI / 2, Math.PI / 6]}
                    animate={{
                        scale: [1.1, 1.3, 1.1],
                        rotateY: [-Math.PI / 5, -Math.PI / 7, -Math.PI / 5],
                        transition: {
                            duration: 4,
                            repeatDelay: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                />

                <Icons
                    gltf="graphql"
                    scale={1.3}
                    position={[-2.7, 1.4, 1.5]}
                    rotation={[Math.PI / 1.8, 0, 0]}
                    animate={{
                        rotateY: [0,
                            -Math.PI / 3,
                            -Math.PI / 3,
                            -2 * Math.PI / 3,
                            -2 * Math.PI / 3,
                            -Math.PI,
                            -Math.PI,
                            -4 * Math.PI / 3,
                            -4 * Math.PI / 3,
                            -5 * Math.PI / 3,
                            -5 * Math.PI / 3,
                            -2 * Math.PI,
                            -2 * Math.PI
                        ],
                        transition: {
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                />
                <Icons
                    gltf="mongodb"
                    position={[-2.6, 2.3, 0]}
                    rotation={[Math.PI / 1.3, Math.PI * 2, 0]}
                />
                <Icons
                    gltf="framer-motion"
                    position={[-1.3, 2.3, 0.7]}
                    rotation={[Math.PI / 2.1, Math.PI * 2.2, Math.PI * 2]}
                    animate={{
                        y: [2.6, 2.6 + 0.1, 2.6, 2.6 + 0.1, 2.6],
                        transition: {
                            times: [0, 0.25, 0.5, 0.75, 1],
                            duration: 0.8,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                        },
                    }}
                />
                <Icons
                    gltf="storybook"
                    scale={0.9}
                    position={[1.2, 1.8, 1.9]}
                    rotation={[0, 0, Math.PI * 2]}
                    animate={{
                        rotateY: [-Math.PI / 30, Math.PI / 30],
                        rotateX: [Math.PI / 2, Math.PI / 2 - Math.PI / 30],
                        transition: {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            bounce: 0.8,
                            type: "spring",
                        },
                    }}
                />
                <Icons
                    gltf="python"
                    scale={1.5}
                    position={[-4, 0.3, 0]}
                    rotation={[-Math.PI, Math.PI / 2, -Math.PI / 4]}
                    animate={{
                        rotateX: [-Math.PI, Math.PI / 2],
                        rotateY: [Math.PI / 2, Math.PI / 15],
                        transition: {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            bounce: 0.4,
                            type: "spring",
                        },
                    }}
                />
                <Icons
                    gltf="threejs"
                    position={[-3.3, -1.1, -1]}
                    rotation={[Math.PI / 2, -Math.PI / 3, 0.3]}
                    animate={{
                        rotateX: [
                            Math.PI / 2,
                            Math.PI * 2 + Math.PI / 2,
                        ],
                        transition: {
                            duration: 9,
                            repeat: Infinity,
                            type: "spring",
                            bounce: 0.4,
                        },
                    }}
                />
                <Icons
                    gltf="jest"
                    position={[0, 0, 1]}
                    rotation={[Math.PI / 2.1, 0, 0.2]}

                    animate={{
                        y: [-1.5, -1.6, -1.5, -1.6, -1.5],
                        x: [-3.7, -3.7, -3.6, -3.6, -3.7],
                        rotateY: [-Math.PI / 4, -Math.PI / 5, -Math.PI / 4, -Math.PI / 5, -Math.PI / 4],
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1,
                        },
                    }}
                />

                <Icons
                    gltf="cloud-run"
                    scale={1.2}
                    position={[-6.1, -1.1, -1.5]}
                    rotation={[Math.PI / 1.8, -Math.PI / 3, -Math.PI / 5]}

                    animate={{
                        rotateZ: [-Math.PI / 5 + Math.PI / 10, -Math.PI / 5],
                        rotateY: [Math.PI / 4 - Math.PI / 10, Math.PI / 4 + Math.PI / 10],
                        transition: {
                            duration: 2,
                            repeatDelay: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            bounce: 0.5,
                            type: "spring",
                        },
                    }}
                />
                <Icons
                    gltf="firebase"
                    scale={1.2}
                    position={[5.5, 0.3, -1]}
                    rotation={[Math.PI / 2.2, -Math.PI / 18, Math.PI / 10]}

                />
                <Icons
                    gltf="illustrator"
                    position={[4, -0.5, -3]}
                    rotation={[Math.PI / 2, Math.PI / 5, -Math.PI / 9]}
                    animate={{
                        x: [4, 4.4, 4.8, 4.4, 4],
                        z: [-3, -2.5, -3, -3.5, -3],
                        transition: {
                            duration: 0.9,
                            repeatDelay: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        },
                    }}
                />
                <Icons
                    gltf="photoshop"
                    position={[4.8, -0.6, -3]}
                    rotation={[Math.PI / 2.1, -Math.PI / 5.2, Math.PI / 5]}

                    animate={{
                        x: [4.8, 4.4, 4, 4.4, 4.8],
                        z: [-3, -3.5, -3, -2.5, -3],
                        transition: {
                            duration: 0.9,
                            repeatDelay: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        },
                    }}
                />
            </motion3d.group>
        </Canvas>
    );
};

const Lights = () => {
    return (
        <motion3d.ambientLight intensity={Math.PI / 3} />
    );
};


function useSmoothTransform(value: MotionValue<number>, springOptions: SpringOptions | undefined, transformer: { (v: any): number; (v: any): number; (x: any): number; (y: any): number; (input: unknown): any; }) {
    return useSpring(useTransform(value, transformer), springOptions);
}
const spring = { stiffness: 600, damping: 30 };

const Camera = ({ mouseX, mouseY }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) => {

    const cameraX = useSmoothTransform(mouseX, spring, (x) => (-1 * x) / 1000);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => (y) / 1000);

    const set = useThree(({ set }) => set);
    const camera = useThree(({ camera }) => camera);
    const size = useThree(({ size }) => size);
    const scene = useThree(({ scene }) => scene);
    const cameraRef = useRef<any>();


    useLayoutEffect(() => {
        const { current: cam }: any = cameraRef;
        if (cam) {
            cam.aspect = size.width / size.height;
            cam.updateProjectionMatrix();
        }
    }, [size]);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            const oldCam = camera;
            set(() => ({ camera: cameraRef.current }));
            return () => set(() => ({ camera: oldCam }));
        }
    }, [camera, set]);

    useLayoutEffect(() => {
        return cameraX.on("change", () => {
            if (cameraRef.current) {
                cameraRef.current.lookAt(scene.position);
            }
        });
    }, [cameraX, scene.position]);

    const [{ isClick, isHover, isTap }] = useMouse()

    return (
        <motion3d.perspectiveCamera
            ref={cameraRef}
            fov={100}
            position={[cameraX.get(), cameraY.get(), 6.3]}
            variants={{
                hover: {
                    z: 4.2,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                    }
                },
                tap: {
                    z: 4
                },
                click: {
                    z: 0
                }
            }}
            animate={isClick ? "click" : (isTap ? "tap" : (isHover ? "hover" : "rest"))}
        />
    );
};

function Icons({ gltf, ...props }: any) {
    const { scene } = useGLTF(`/model/${gltf}.gltf`);
    const [x, y, z] = props.position;
    return (
        <>
            <motion3d.pointLight
                position={[x * 1.1, y * 1.1, z + 1]}
                intensity={0.8}
            />
            <motion3d.mesh
                {...props}
            >
                <motion3d.primitive object={scene} />
            </motion3d.mesh>

        </>
    );
}

export default TechStack;