"use client";
import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion } from "framer-motion-3d";
import { MotionConfig, useTransform, useSpring, MotionValue, SpringOptions, delay } from "framer-motion";
import { transform } from "next/dist/build/swc";

function useSmoothTransform(value: MotionValue<number>, springOptions: SpringOptions | undefined, transformer: { (v: any): number; (v: any): number; (x: any): number; (y: any): number; (input: unknown): any; }) {
    return useSpring(useTransform(value, transformer), springOptions);
}


export function Scene({ isHover, isPress, mouseX, mouseY }: {
    readonly isHover: boolean;
    readonly isPress: boolean;
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) {
    return (
        <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
            <Lights />

            <Camera mouseX={mouseX} mouseY={mouseY} />
            <MotionConfig transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.5
            }}>
                <motion.group
                    initial={false}
                    animate={isHover ? "hover" : "rest"}
                    dispose={null}
                    variants={{
                        hover: { z: isPress ? -0.9 : 0 }
                    }}
                >
                    <Icons
                        gltf="vue"
                        position={[-0.5, -0.4, 3]}
                        rotation={[Math.PI / 2, Math.PI / 20, -0.8]}
                        whileHover={{
                            scale: 1.1,
                            rotateZ: Math.PI  - 0.8, // Math.PI * number of rounds - the initial rotation degree
                        }}
                        transition={{
                            duration: 0.5,
                        }}

                    />
                    <Icons
                        gltf="react"
                        position={[1.5, 1.5, 1.5]}
                        rotation={[Math.PI / 2, 0, 0.3]}
                        whileHover={{
                            rotateY: Math.PI * 2 * 2,
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 3,
                            delay: 1
                        }}
                    />
                    <Icons
                        gltf="next"
                        position={[0.5, -0.5, 3]}
                        rotation={[Math.PI / 2.5, 0, Math.PI / 6]}

                        whileHover={{
                            scale: 1.1,
                            rotateY: -Math.PI / 10,

                        }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 100,
                        }}

                    />
                    <Icons
                        gltf="graphql"
                        position={[-1.5, 1.7, 1.2]}
                        rotation={[Math.PI / 2, 0, -0.1]}
                        whileHover={{
                            rotateY:1,
                        }}
                        transition={{
                            duration: 1,
                        }}
                    />
                </motion.group>
            </MotionConfig>
        </Canvas>
    );
}

export function Lights() {
    return (
        <>
            <motion.ambientLight intensity={Math.PI / 2} />
            <motion.pointLight animate={{ x: 2 }} />
        </>
    );
}


// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
    readonly spring?: SpringOptions;
}) {
    const cameraX = useSmoothTransform(mouseX, spring, (x: any) => x / 350);
    const cameraY = useSmoothTransform(mouseY, spring, (y: any) => (-1 * y) / 350);

    const set = useThree(({ set }) => set);
    const camera = useThree(({ camera }) => camera);
    const size = useThree(({ size }) => size);
    const scene = useThree(({ scene }) => scene);
    const cameraRef = useRef(null);

    useLayoutEffect(() => {
        const { current: cam }: any = cameraRef;
        if (cam) {
            cam.aspect = size.width / size.height;
            cam.updateProjectionMatrix();
        }
    }, [size, props]);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            const oldCam = camera;
            return () => set(() => ({ camera: oldCam }));
        }
    }, [camera, cameraRef, set]);

    useLayoutEffect(() => {
        return cameraX.onChange(() => camera.lookAt(scene.position));
    }, [cameraX]);

    return (
        <motion.perspectiveCamera
            ref={cameraRef}
            fov={0}
            position={[cameraX, cameraY, 5]}
        />
    );
}

const spring = { stiffness: 600, damping: 30 };



export function Icons({ gltf, ...props }: any) {
    const { scene } = useGLTF(`/model/${gltf}.gltf`);
    return (
        <motion.mesh
            {...props}
        >
            <motion.primitive object={scene} />
        </motion.mesh>
    );
}


export default Scene;