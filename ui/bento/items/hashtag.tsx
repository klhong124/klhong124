"use client";
import React, { useEffect, useMemo, StrictMode, useState } from "react";
import { Physics, useCircle, usePlane, useLine } from '@react-three/p2';
import { Canvas, useThree } from '@react-three/fiber';

import { cn } from "@/utils/cn";

function Ball({ isHover }: { isHover: boolean }) {
    const [ref] = useCircle(() => ({ args: [0.5], mass: 1, position: [2, 20] }));
    return (
        <mesh ref={ref as any}>
            <sphereGeometry args={[0.5]} />
            <meshNormalMaterial />
        </mesh>
    );
}
function Ball2() {
    const [ref] = useCircle(() => ({ args: [0.5], mass: 1, position: [2.1, 15] }));
    return (
        <mesh ref={ref as any}>
            <sphereGeometry args={[0.5]} />
            <meshNormalMaterial />
        </mesh>
    );
}

function Ground() {
    const [ref] = usePlane(() => ({ mass: 0, position: [0, 0] }));
    return <mesh ref={ref as any} />;
}
function Walls() {
    const [leftRef] = useLine(() => ({
        angle: Math.PI / 2,
        args: [10],
        mass: 0,
        position: [0, 0],
    }))
    const [rightRef] = useLine(() => ({
        angle: Math.PI / 2,
        args: [10],
        mass: 0,
        position: [10, 0],
    }))
    return (<>
        <group ref={leftRef as any} />
        <group ref={rightRef as any} />
    </>)
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

    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <StrictMode>

            <Canvas orthographic camera={{ position: [0, 0, 10] }} className={cn("w-full h-full")}>
                <CameraSetup />

                    <Physics normalIndex={2}>

                        <Ball isHover={isHover} />
                        <Ball2 />
                        <Ground />
                        <Walls />

                    </Physics>
            </Canvas >
        </StrictMode>

    );
}

export default Hashtag;