"use client";
import React, { useEffect, useMemo } from "react";
import { Physics, Debug, useCircle, usePlane } from '@react-three/p2';
import { Canvas, useThree } from '@react-three/fiber';
import { OrthographicCamera, OrbitControls } from '@react-three/drei';

import { cn } from "@/utils/cn";

function Ball() {
    const [ref] = useCircle(() => ({ args: [0.5], mass: 1, position: [2, 10] }));
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.5]} />
            <meshNormalMaterial />
        </mesh>
    );
}
function Ball2() {
    const [ref] = useCircle(() => ({ args: [0.5], mass: 1, position: [2.1, 15] }));
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.5]} />
            <meshNormalMaterial />
        </mesh>
    );
}

function Ground() {
    const [ref] = usePlane(() => ({ mass: 0, position: [0, 0] }));
    return (
        <group ref={ref}>
            <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[20, 2]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    );
}

function CameraSetup() {
    const { camera, size } = useThree();

    // Memoize the aspect ratio and view dimensions
    const { aspect, viewWidth, viewHeight } = useMemo(() => {
        const aspect = size.height / size.width;
        const viewWidth = 10; // Desired visible width (in world units)
        const viewHeight = viewWidth * aspect;
        return { aspect, viewWidth, viewHeight };
    }, [size]);

    useEffect(() => {
        const orthoCamera = camera as any;

        // Set the orthographic camera frustum
        orthoCamera.left = 0;
        orthoCamera.right = viewWidth;
        orthoCamera.top = viewHeight;
        orthoCamera.bottom = 0; // Set bottom to 0 to align Y=0 at the bottom of the canvas
        orthoCamera.updateProjectionMatrix();

    }, [camera, viewWidth, viewHeight]);

    return null;
}

export function Hashtag() {

    return (
        <Canvas orthographic camera={{ position: [0, 0, 10] }} className="w-full h-full">
            <CameraSetup />
            <Physics normalIndex={2}>
                <Ball />
                <Ball2 />
                <Ground />
            </Physics>
        </Canvas>
    );
}

export default Hashtag;