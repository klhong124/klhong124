"use client";
import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion } from "framer-motion-3d";
import { MotionConfig, useTransform, useSpring, MotionValue, SpringOptions, delay } from "framer-motion";

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
                bounce: 0.5,
                stiffness: 100,

            }}>
                <motion.group
                    initial={false}
                    dispose={null}

                >
                    <Icons
                        gltf="nuxt"
                        scale={1.8}
                        position={[0, 3, -1]}
                        rotation={[Math.PI / 2, -Math.PI / 19, -0.2]}
                        whileHover={{
                            scale: 1.9,
                            rotateY: -Math.PI / 15,
                        }}
                    />
                    <Icons
                        gltf="vue"
                        scale={2}
                        position={[-1.5, -2, 1]}
                        rotation={[Math.PI / 2, Math.PI / 20, -0.8]}
                        whileHover={{
                            scale: 2.2,
                            rotateZ: Math.PI - 0.8, // Math.PI * number of rounds - the initial rotation degree
                        }}
                    />
                    <Icons
                        gltf="react"
                        position={[1, 0.8, 2.3]}
                        rotation={[Math.PI / 1.8, 0, 0.5]}
                        whileHover={{
                            rotateX: Math.PI / 1.8,
                            rotateY: Math.PI / 2,
                        }}
                    />
                    <Icons
                        gltf="next"
                        position={[0.5, -0.8, 2.8]}
                        rotation={[Math.PI / 2.5, -Math.PI / 10, Math.PI / 6]}
                        whileHover={{
                            scale: 1.1,
                            rotateY: -Math.PI / 5,
                        }}
                    />
                    <Icons
                        gltf="graphql"
                        position={[-1.5, 1.2, 1.5]}
                        rotation={[Math.PI / 1.5, 0, Math.PI / 1.2]}
                        whileHover={{
                            scale: 1.2,
                            rotateY: Math.PI / 15,
                        }}
                    />
                </motion.group>
            </MotionConfig>
        </Canvas>
    );
}

export function Lights() {
    return (
        <motion.ambientLight intensity={Math.PI / 4} />
    );
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }: {
    readonly mouseX: MotionValue<number>;
    readonly mouseY: MotionValue<number>;
}) {
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
    }, [size, props]);

    useLayoutEffect(() => {
      if (cameraRef.current) {
        const oldCam = camera;
        set(() => ({ camera: cameraRef.current }));
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
        position={[cameraX, cameraY, 4.6]}
      />
    );
  }

const spring = { stiffness: 600, damping: 30 };



export function Icons({ gltf, ...props }: any) {
    const { scene } = useGLTF(`/model/${gltf}.gltf`);
    return (
        <>
            <motion.pointLight
                position={[props.position[0], props.position[1], props.position[2] + 0.8]}
                intensity={0.5}
            />
            <motion.mesh
                {...props}
            >
                <motion.primitive object={scene} />
            </motion.mesh>

        </>
    );
}


export default Scene;