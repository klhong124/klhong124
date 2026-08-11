"use client";

import { useMemo, useRef } from "react";
import { cn } from "@/utils/cn";
import { MotionValue, useMotionValue, useMotionValueEvent } from "motion/react";
import { useMouse } from "@/hooks/useMouse";
import useMeasure from "react-use-measure";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Vec3 = [number, number, number];

type IconConfig = {
  gltf: string;
  position: Vec3;
  rotation: Vec3;
  scale?: number;
  spinY?: number;
  spinX?: number;
  spinZ?: number;
  bob?: { amp: number; speed: number };
  pulse?: number;
  drift?: boolean;
  driftPhase?: number;
};

const ICONS: IconConfig[] = [
  { gltf: "nuxt", position: [0.1, 0.75, 3], rotation: [Math.PI / 2, -Math.PI / 15, -0.2], scale: 0.8, spinZ: 0.9 },
  { gltf: "vue", position: [-1.5, -1.8, 1.6], rotation: [Math.PI / 2, Math.PI / 20, -0.8], scale: 1.5, spinZ: 0.6 },
  { gltf: "typescript", position: [2.6, 0.5, 1], rotation: [Math.PI / 1.8, 0, 1], spinY: 0.35 },
  { gltf: "tailwindcss", position: [0, -2.8, 0], rotation: [Math.PI / 2, 0, -0.2], scale: 1.8, bob: { amp: 0.08, speed: 1.2 }, spinY: 0.2 },
  { gltf: "next", position: [1.8, -0.9, 2.3], rotation: [Math.PI / 2.5, Math.PI / 2, Math.PI / 6], pulse: 0.08, spinY: 0.15 },
  { gltf: "mongodb", position: [-2.6, 2.3, 0], rotation: [Math.PI / 1.3, Math.PI * 2, 0] },
  { gltf: "framer-motion", position: [-1.3, 2.3, 0.7], rotation: [Math.PI / 2.1, Math.PI * 2.2, Math.PI * 2], bob: { amp: 0.04, speed: 3 } },
  { gltf: "storybook", position: [1.2, 1.8, 1.9], rotation: [0, 0, Math.PI * 2], scale: 0.9, spinY: 0.25 },
  { gltf: "python", position: [-4, 0.3, 0], rotation: [-Math.PI, Math.PI / 2, -Math.PI / 4], scale: 1.5, spinX: 0.12, spinY: 0.1 },
  { gltf: "threejs", position: [-3.3, -1.1, -1], rotation: [Math.PI / 2, -Math.PI / 3, 0.3], spinX: 0.35 },
  { gltf: "cloud-run", position: [-6.1, -1.1, -1.5], rotation: [Math.PI / 1.8, -Math.PI / 3, -Math.PI / 5], scale: 1.2, spinY: 0.2, spinZ: 0.15 },
  { gltf: "firebase", position: [5.8, 0.3, -1], rotation: [Math.PI / 2.2, -Math.PI / 18, Math.PI / 10], scale: 1.2 },
  { gltf: "illustrator", position: [4, -0.5, -3], rotation: [Math.PI / 2, Math.PI / 5, -Math.PI / 9], drift: true },
  { gltf: "figma", position: [4.8, -0.6, -3], rotation: [Math.PI / 2.1, -Math.PI / 5.2, Math.PI / 5], drift: true, driftPhase: Math.PI },
  { gltf: "vscode", position: [4.6, 3, -1], rotation: [Math.PI / 1.8, 0, 0], scale: 2, spinY: 0.22 },
  { gltf: "miro", position: [-2.7, 1.4, 1.5], rotation: [Math.PI / 1.8, 0, 0], scale: 1.2, spinY: 0.1 },
];

function CameraRig({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const cx = (-1 * mouseX.get()) / 3500;
    const cy = mouseY.get() / 5000;
    const targetZ = 4;

    // Mutating the camera inside useFrame is the standard React Three Fiber
    // pattern — the scene graph is deliberately outside React's render cycle.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = cx;
    camera.position.y = cy;
    camera.position.z += (targetZ - camera.position.z) * 0.12;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function ToolIcon({ config }: { config: IconConfig }) {
  const { gltf, position, rotation, scale = 1 } = config;
  const { scene } = useGLTF(`/model/${gltf}.gltf`);
  const group = useRef<THREE.Group>(null);
  const clone = useMemo(() => scene.clone(true), [scene]);

  const base = useRef({
    px: position[0],
    py: position[1],
    pz: position[2],
    rx: rotation[0],
    ry: rotation[1],
    rz: rotation[2],
    sc: scale,
  });

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    const rx = base.current.rx + (config.spinX ?? 0) * t;
    const ry = base.current.ry + (config.spinY ?? 0) * t;
    const rz = base.current.rz + (config.spinZ ? Math.sin(t * config.spinZ) * 0.25 : 0);
    g.rotation.set(rx, ry, rz);

    let y = base.current.py;
    if (config.bob) y += Math.sin(t * config.bob.speed) * config.bob.amp;
    let x = base.current.px;
    let z = base.current.pz;
    if (config.drift) {
      const ph = config.driftPhase ?? 0;
      x += Math.sin(t * 0.7 + ph) * 0.35;
      z += Math.cos(t * 0.6 + ph) * 0.35;
    }
    g.position.set(x, y, z);

    let s = base.current.sc;
    if (config.pulse) s *= 1 + Math.sin(t * 1.5) * config.pulse;
    g.scale.setScalar(s);
  });

  const [lx, ly, lz] = position;

  return (
    <group ref={group}>
      <pointLight position={[lx * 1.1, ly * 1.1, lz + 1]} intensity={0.8} />
      <primitive object={clone} />
    </group>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ pointerEvents: "none" }}
      resize={{ scroll: false, offsetSize: true }}
      camera={{ fov: 95, near: 0.1, far: 200, position: [0, 0, 4] }}
    >
      <ambientLight intensity={Math.PI / 3} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <group>
        {ICONS.map((cfg, i) => (
          <ToolIcon key={`${cfg.gltf}-${i}`} config={cfg} />
        ))}
      </group>
    </Canvas>
  );
}

const TechStack = () => {
  const [ref, bounds] = useMeasure({ scroll: true });
  const { x, y } = useMouse();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track the shared pointer motion values directly. Doing this in an effect
  // keyed on x/y meant a re-render for every mouse move.
  useMotionValueEvent(x, "change", (value) => {
    mouseX.set(value - bounds.x - bounds.width / 2);
  });
  useMotionValueEvent(y, "change", (value) => {
    mouseY.set(value - bounds.y - bounds.height / 2);
  });

  /** Do not wrap `<Canvas>` in `motion.*` — R3F uses a separate reconciler and Motion breaks `ReactCurrentOwner`. */
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible",
        "size-full",
      )}
    >
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
};

export default TechStack;
