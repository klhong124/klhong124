"use client";

import { Suspense, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * A lighter 3D backdrop for phone hero layouts.
 *
 * Fewer icons, no pointer tracking, no hover gating — just a slow drift behind
 * the copy so mobile still feels alive without paying for the full desktop scene.
 */

type Vec3 = [number, number, number];

type IconConfig = {
  gltf: string;
  position: Vec3;
  rotation: Vec3;
  scale?: number;
  drift?: number;
};

const ICONS: IconConfig[] = [
  {
    gltf: "react",
    position: [-1.4, 0.8, 0],
    rotation: [Math.PI / 2.2, 0.2, 0],
    scale: 1.4,
    drift: 0.35,
  },
  {
    gltf: "next",
    position: [1.5, 0.4, -0.5],
    rotation: [Math.PI / 2, -0.3, 0],
    scale: 1.2,
    drift: 0.28,
  },
  {
    gltf: "typescript",
    position: [0.2, -1.1, 0.4],
    rotation: [Math.PI / 2, 0.4, 0.8],
    scale: 1.1,
    drift: 0.22,
  },
  {
    gltf: "laravel",
    position: [-1.2, -0.6, 0.8],
    rotation: [Math.PI / 2.4, 0.1, -0.4],
    scale: 1,
    drift: 0.18,
  },
  {
    gltf: "firebase",
    position: [1.3, -0.9, 0.2],
    rotation: [Math.PI / 2.1, -0.2, 0.3],
    scale: 0.95,
    drift: 0.2,
  },
];

function ToolIcon({ config }: { config: IconConfig }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(`/model/${config.gltf}.gltf`);
  const clone = scene.clone();
  const { position, rotation, scale = 1, drift = 0.2 } = config;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    g.position.set(
      position[0] + Math.sin(t * drift) * 0.08,
      position[1] + Math.cos(t * drift * 0.9) * 0.06,
      position[2],
    );
    g.rotation.set(
      rotation[0] + Math.sin(t * drift * 0.5) * 0.05,
      rotation[1] + t * drift * 0.08,
      rotation[2],
    );
    g.scale.setScalar(scale);
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={clone} />
    </group>
  );
}

function Scene({ onContextLostChange }: { onContextLostChange: (lost: boolean) => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      style={{ pointerEvents: "none" }}
      resize={{ scroll: false, offsetSize: true }}
      camera={{ fov: 55, near: 0.1, far: 100, position: [0, 0, 5.5] }}
      onCreated={({ gl }) => {
        const el = gl.domElement;
        el.addEventListener("webglcontextlost", () => onContextLostChange(true));
        el.addEventListener("webglcontextrestored", () => onContextLostChange(false));
        if (gl.getContext()?.isContextLost()) onContextLostChange(true);
      }}
    >
      <ambientLight intensity={Math.PI / 2.5} />
      <Suspense fallback={null}>
        <group>
          {ICONS.map((cfg) => (
            <ToolIcon key={cfg.gltf} config={cfg} />
          ))}
        </group>
      </Suspense>
    </Canvas>
  );
}

export default function MobileTechStack() {
  const [contextLost, setContextLost] = useState(false);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-35 md:hidden",
        contextLost && "invisible",
      )}
    >
      <Scene onContextLostChange={setContextLost} />
    </div>
  );
}

for (const icon of ICONS) {
  useGLTF.preload(`/model/${icon.gltf}.gltf`);
}
