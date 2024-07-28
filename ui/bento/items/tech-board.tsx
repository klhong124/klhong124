"use client";
import React, { Suspense, useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionConfig, useMotionValue, useTransform, useSpring, MotionValue, SpringOptions } from "framer-motion";
import useMeasure from "react-use-measure";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { motion as motion3d } from "framer-motion-3d";


export function TechBoard() {
    const [ref, bounds] = useMeasure({ scroll: false });
    const [isHover, setIsHover] = useState<boolean>(true);
    const [isPress, setIsPress] = useState<boolean>(false);
    const mouseX: MotionValue<number> = useMotionValue(0);
    const mouseY: MotionValue<number> = useMotionValue(0);

    const resetMousePosition = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <MotionConfig transition={{
            type: "spring",
            duration: 0.7,
            bounce: 0.2
        }}>
            <motion.button
                className="h-full w-full overflow-visible"
                ref={ref}
                initial={false}
                animate={isHover ? "hover" : "rest"}
                whileTap="press"
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.5 },
                    press: { scale: 1.4 }
                }}
                onHoverStart={() => {
                    resetMousePosition();
                    setIsHover(true);
                }}
                onHoverEnd={() => {
                    resetMousePosition();
                    setIsHover(false);
                }}
                onTapStart={() => setIsPress(true)}
                onTap={() => setIsPress(false)}
                onTapCancel={() => setIsPress(false)}
                onPointerMove={(e) => {
                    mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                    mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                }}
            >
                <motion.div
                    className="h-full w-full absolute top-0 left-0 border-2 border-dashed border-gray-400"
                    variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 }
                    }}
                >
                        <Suspense fallback={null}>
                            <Shapes
                                isHover={isHover}
                                isPress={isPress}
                                mouseX={mouseX}
                                mouseY={mouseY}
                            />
                        </Suspense>
                </motion.div>
                <motion.div
                    variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
                >
                    Tech
                </motion.div>
            </motion.button>
        </MotionConfig>
    );
}

function useSmoothTransform(value: MotionValue<number>, springOptions: SpringOptions | undefined, transformer: { (v: any): number; (v: any): number; (x: any): number; (y: any): number; (input: unknown): any; }) {
    return useSpring(useTransform(value, transformer), springOptions);
}


export function Shapes({ isHover, isPress, mouseX, mouseY }: {
    isHover: boolean;
    isPress: boolean;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}) {
    const mouseToLightRotation = (v: any) => (-1 * v) / 140;

    const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
    const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

    return (
        <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
            <Lights />

            <Camera mouseX={mouseX} mouseY={mouseY} />
            <MotionConfig transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.2
            }}>
                <motion3d.group
                    initial={false}
                    animate={isHover ? "hover" : "rest"}
                    dispose={null}
                    variants={{
                        hover: { z: isPress ? -0.9 : 0 }
                    }}
                >
                    <Cone />
                    <Model />
                </motion3d.group>
            </MotionConfig>
        </Canvas>
    );
}

export function Lights() {
    return (
        <ambientLight intensity={Math.PI / 2} />
    );
}



export function Cone() {
    return (
        <motion3d.mesh
            position={[0, 0, 0]}
            rotation={[-0.5, 0, -0.3]}
        >
            <coneGeometry args={[0.3, 0.6, 20]} />
            <Material />
        </motion3d.mesh>
    );
}

export function Model() {
    const { scene } = useGLTF('/model/vue.gltf');

    return (
        <motion3d.mesh
            position={[0, 0, 0]}
            rotation={[90, 0, 0]}
        >
            <primitive object={scene} />
            <Material />

        </motion3d.mesh>
    );
}

export function Material() {
    return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />;
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }: {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    spring?: SpringOptions;
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
        <motion3d.perspectiveCamera
            ref={cameraRef}
            fov={90}
            position={[cameraX, cameraY, 3.8]}
        />
    );
}

const spring = { stiffness: 600, damping: 30 };






export default TechBoard;