"use client";
import React, { useRef, useLayoutEffect, memo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion } from "framer-motion-3d";
import { useTransform, useSpring, MotionValue, SpringOptions, animate } from "framer-motion";
import { useHover } from "@/context/hover"; // Add this import

function useSmoothTransform(value: MotionValue<number>, springOptions: SpringOptions | undefined, transformer: { (v: any): number; (v: any): number; (x: any): number; (y: any): number; (input: unknown): any; }) {
    return useSpring(useTransform(value, transformer), springOptions);
}


export const Scene = React.memo(({ mouseX, mouseY }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) => {
    const isHover = useHover();

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            style={{ pointerEvents: "none" }}
            resize={{ scroll: false, offsetSize: true }}
        >
            <Lights />

            <Camera mouseX={mouseX} mouseY={mouseY} />

            <motion.group
                initial={false}
                dispose={null}
                animate={isHover && "hover"}
            >
                <Icons
                    gltf="nuxt"
                    scale={0.8}
                    position={[0.1, 0.9, 3]}
                    rotation={[Math.PI, -Math.PI / 15, -0.2]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 2,
                        },
                    }}
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
                    position={[-1.2, -1.8, 1.6]}
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
                    position={[3.3, 2.5, -1]}
                    rotation={[Math.PI / 2, 0, 0.2]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 1.8,
                        },
                    }}
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
                    position={[2.2, 0.5, 1]}
                    rotation={[Math.PI / 5, 0, 1]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 1.8,
                        },
                    }}
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
                    position={[2.2, -3.9, -4]}
                    rotation={[Math.PI / 2, -Math.PI / 4, 0.3]}
                    variants={{
                        hover: {
                            rotateY: 0,
                        },
                    }}

                />
                <Icons
                    gltf="next"
                    position={[1.7, -1, 2.3]}
                    rotation={[Math.PI / 2.5, Math.PI / 2, Math.PI / 6]}
                    animate={{
                        scale: [1.3, 1.4, 1.3],
                        rotateY: [-Math.PI / 5, -Math.PI / 6, -Math.PI / 5],
                        transition: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                />
                <Icons
                    gltf="graphql"
                    scale={1.3}
                    position={[-2.2, 1.3, 1.5]}
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
                    position={[-1.2, 1.5, 0.5]}
                    rotation={[Math.PI / 1.3, Math.PI / 3, Math.PI]}
                    variants={{
                        hover: {

                            rotateY: Math.PI * 2,
                        },
                    }}

                />
                <Icons
                    gltf="framer-motion"
                    position={[-1.5, 2.3, 0.7]}
                    rotation={[Math.PI / 2.1, Math.PI * 2.2, Math.PI]}
                    variants={{
                        hover: {
                            rotateZ: Math.PI * 2
                        },
                    }}
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
                    position={[0.9, 1.7, 1.9]}
                    rotation={[Math.PI / 2, 0, Math.PI]}
                    variants={{
                        hover: {
                            rotateZ: Math.PI * 2,
                        },
                    }}
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
                    position={[-3.3, 0.2, 0]}
                    rotation={[-Math.PI, Math.PI / 2, -Math.PI / 4]}
                    variants={{
                        hover: {

                            rotateX: Math.PI / 2,
                            rotateY: Math.PI / 15,
                        },
                    }}
                />
                <Icons
                    gltf="threejs"
                    scale={0.5}
                    position={[-2.9, -1.1, -1]}
                    rotation={[Math.PI / 2, 0, 0.3]}
                    variants={{
                        hover: {
                            scale: 1,
                            rotateY: -Math.PI / 3
                        },
                    }}
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
                    rotation={[Math.PI, 0, 0.2]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 2.1,
                        },
                    }}
                    animate={{
                        y: [-1.5, -1.6, -1.5, -1.6, -1.5],
                        x: [-2.7, -2.7, -2.6, -2.6, -2.7],
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
                    gltf="python"
                    scale={1.5}
                    position={[-3, 0.2, 0]}
                    rotation={[-Math.PI, Math.PI / 2, -Math.PI / 4]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 2,
                            rotateY: Math.PI / 15,
                        },
                    }}
                />
                <Icons
                    gltf="cloud-run"
                    scale={1.2}
                    position={[-4.8, -1.1, -2]}
                    rotation={[-Math.PI / 1.1, -Math.PI / 3, -Math.PI / 5]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 1.8,
                        },
                    }}
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
                    position={[6, 0, -3]}
                    rotation={[Math.PI / 2.2, -Math.PI / 18, -Math.PI]}
                    variants={{
                        hover: {
                            rotateZ: Math.PI / 10,
                        },
                    }}
                />
                <Icons
                    gltf="illustrator"
                    position={[4, -0.5, -3]}
                    rotation={[Math.PI, Math.PI / 3, -Math.PI / 9]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 2,
                            rotateY: Math.PI / 5,
                        },
                    }}
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
                    rotation={[Math.PI / 1.2, -Math.PI / 4, Math.PI / 5]}
                    variants={{
                        hover: {
                            rotateX: Math.PI / 2.1,
                            rotateY: -Math.PI / 5.2,
                        },
                    }}
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
            </motion.group>
        </ Canvas>
    );
});

const Lights = memo(() => {
    return (
        <motion.ambientLight intensity={Math.PI / 3} />
    );
});

const Camera = React.memo(({ mouseX, mouseY }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) => {

    const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 1000);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 1000);

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

    return (
        <motion.perspectiveCamera
            ref={cameraRef}
            fov={85}
            position={[cameraX, cameraY, 0]}
            variants={{
                hover: {
                    z: 5
                },
            }}
        />
    );
});

const spring = { stiffness: 600, damping: 30 };



function Icons({ gltf, ...props }: any) {
    const { scene } = useGLTF(`/model/${gltf}.gltf`);
    const [x, y, z] = props.position;
    return (
        <>
            <motion.pointLight
                position={[x * 1.1, y * 1.1, z + 1]}
                intensity={0.8}
            />
            <motion.mesh
                {...props}
                position={[x, y, z - 1]} //pop up effect from z -1 for each icon
                variants={{
                    hover: {
                        z: props.animate?.z ? undefined : z,
                        ...props.variants?.hover,
                    }
                }}
            >
                <motion.primitive object={scene} />
            </motion.mesh>

        </>
    );
}

export default Scene;