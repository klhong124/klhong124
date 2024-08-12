"use client";
import React, { useEffect, useMemo, StrictMode, useState } from "react";
import { Physics, usePlane, useLine, useBox, useCircle } from '@react-three/p2';
import { Canvas, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { cn } from "@/utils/cn";

const CANVAS_WIDTH = 10;

const tags = [
    "Quick Learner",
    "Self-Motivated",
    "Problem Solver",
    "Critical Thinker",
    "Methodical",
    "Team Player",
    "Meticulous",
    "Adaptable",
    "Innovative",
    "Analytical",
]
function Pills({ children, index }: {
    index: number;
    children: string;
}) {
    const pillWidth = useMemo(() => children.length / 3, [children]);
    const randomPositionX = useMemo(() => 0.1 + (pillWidth / 2) + (Math.random() * (CANVAS_WIDTH - pillWidth - 0.1)), []);
    const [ref] = useBox(() => ({ args: [pillWidth, 1], mass: 3, position: [randomPositionX, index + 15] }));
    return (
        <RoundedBox args={[pillWidth, 1, 0]} radius={0.5} ref={ref as any}>
            <meshLambertMaterial attach="material" color={"grey"} />
            <Text
                fontSize={0.5}
            >
                {children}
            </Text>
        </RoundedBox>

    );
}

function Ground() {
    const [ref] = usePlane(() => ({ mass: 0, position: [0, 0] }));
    return <mesh ref={ref as any} />;
}
function Walls() {
    const [leftRef] = useBox(() => ({
        args: [1, 50],
        mass: 0,
        position: [-0.5, 0],
        type: 'Kinematic',
    }))
    const [rightRef] = useBox(() => ({
        args: [1, 50],
        mass: 0,
        position: [CANVAS_WIDTH + 0.5, 0],
        type: 'Kinematic',
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
        const viewWidth = CANVAS_WIDTH; // Desired visible width (in world units)
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
        <h1>test</h1>

    );
}

export default Hashtag;