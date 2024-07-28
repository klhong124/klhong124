"use client";
import React, {  useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion } from "framer-motion-3d";
import { MotionConfig, useTransform, useSpring, MotionValue, SpringOptions } from "framer-motion";



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
                bounce: 0.2
            }}>
                <motion.group
                    initial={false}
                    animate={isHover ? "hover" : "rest"}
                    dispose={null}
                    variants={{
                        hover: { z: isPress ? -0.9 : 0 }
                    }}
                >
                    <Vue />
                    <ReactIcon />
                    <GraphQL />
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
            fov={90}
            position={[cameraX, cameraY, 3.8]}
        />
    );
}

const spring = { stiffness: 600, damping: 30 };


export function Vue() {
    const { scene } = useGLTF('/model/vue.gltf');
    return (
        <motion.mesh
            position={[-1.2, 0.4, 0]}
            rotation={[1.5, 0.2, -0.4]}
        >
            <motion.primitive object={scene} />
        </motion.mesh>
    );
}
export function ReactIcon() {
    const { scene } = useGLTF('/model/react.gltf');
    return (
        <motion.mesh
            position={[1.5, 1.5, 1.5]}
            rotation={[1.3, 1.2, 0.3]}
        >
            <motion.primitive object={scene} />
        </motion.mesh>
    );
}
export function GraphQL() {
    const { scene } = useGLTF('/model/graphql.gltf');
    return (
        <motion.mesh
            position={[-1.5, 1.7, 1.2]}
            rotation={[1.6, 0.8, -0.1]}
        >
            <motion.primitive object={scene} />
        </motion.mesh>
    );
}


export default Scene;