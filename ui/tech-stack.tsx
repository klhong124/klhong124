"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { motion, MotionValue, useMotionValue, useMotionValueEvent } from "motion/react";
import { useMouse } from "@/hooks/useMouse";
import { useHero } from "@/hooks/useHero";
import useMeasure from "react-use-measure";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * The original tech-stack backdrop, as it behaved before the refresh:
 * invisible at rest, fading in at full opacity while the pointer is over the
 * hero, with the camera easing back on hover and further on press. The icon
 * set, positions and choreography are the 2025 originals.
 *
 * One structural difference: the original animated each icon with
 * framer-motion-3d, which was discontinued and does not work with Motion 13 or
 * React Three Fiber 9. Each icon's keyframes are reproduced here as explicit
 * time functions run inside `useFrame`, which is also cheaper — one rAF-driven
 * loop instead of eighteen independent spring subscriptions.
 */

type Vec3 = [number, number, number];

/** Offsets an icon's transform for the current clock time, mutating `o`. */
type Choreography = (
  t: number,
  o: { pos: THREE.Vector3; rot: THREE.Euler; scale: number },
) => void;

type IconConfig = {
  gltf: string;
  position: Vec3;
  rotation: Vec3;
  scale?: number;
  animate?: Choreography;
};

const TAU = Math.PI * 2;

const easeOut = (p: number) => 1 - (1 - p) ** 3;

/** 0→1 during the first `active` fraction of each `period`, holding at 1 after. */
function burst(t: number, period: number, active: number) {
  const p = (t % period) / period;
  return easeOut(Math.min(p / active, 1));
}

const ICONS: IconConfig[] = [
  {
    // Quick full spin, then a long hold — the "loading" flick.
    gltf: "nuxt",
    position: [0.1, 0.75, 3],
    rotation: [Math.PI / 2, -Math.PI / 15, -0.2],
    scale: 0.8,
    animate: (t, o) => {
      o.rot.z += burst(t, 4, 0.2) * TAU;
    },
  },
  {
    // Half-turn flip every four seconds.
    gltf: "vue",
    position: [-1.5, -1.8, 1.6],
    rotation: [Math.PI / 2, Math.PI / 20, -0.8],
    scale: 1.5,
    animate: (t, o) => {
      o.rot.z += burst(t, 4, 0.25) * Math.PI;
    },
  },
  {
    // Slow continuous orbit, the biggest icon in the scene.
    gltf: "react",
    position: [4.6, 3, -1],
    rotation: [Math.PI / 1.8, 0, 0],
    scale: 2.3,
    animate: (t, o) => {
      o.rot.y += (t / 30) * TAU;
    },
  },
  {
    gltf: "typescript",
    position: [2.6, 0.5, 1],
    rotation: [Math.PI / 1.8, 0, 1],
    animate: (t, o) => {
      o.rot.y += Math.sin(t * 1.5) * 0.12;
    },
  },
  {
    gltf: "tailwindcss",
    position: [0, -2.8, 0],
    rotation: [Math.PI / 2, 0, -0.2],
    scale: 1.8,
    animate: (t, o) => {
      o.pos.y += 0.2 + Math.sin((t / 4) * TAU) * 0.1;
      o.rot.y += Math.sin((t / 4) * TAU) * (Math.PI / 20);
    },
  },
  { gltf: "laravel", position: [3, -3.9, -4], rotation: [Math.PI / 2, 0, 0.3], scale: 1.8 },
  {
    gltf: "next",
    position: [1.8, -0.9, 2.3],
    rotation: [Math.PI / 2.5, Math.PI / 2, Math.PI / 6],
    animate: (t, o) => {
      o.scale *= 1.2 + Math.sin((t / 4) * TAU) * 0.1;
      o.rot.y += Math.sin((t / 4) * TAU) * 0.15;
    },
  },
  {
    // Hexagon logo ticking around one face at a time.
    gltf: "graphql",
    position: [-2.7, 1.4, 1.5],
    rotation: [Math.PI / 1.8, 0, 0],
    scale: 1.3,
    animate: (t, o) => {
      const stepDuration = 16 / 6;
      const step = Math.floor((t % 16) / stepDuration);
      const within = ((t % 16) % stepDuration) / stepDuration;
      o.rot.y -= (step + easeOut(Math.min(within * 2, 1))) * (Math.PI / 3);
    },
  },
  { gltf: "mongodb", position: [-2.6, 2.3, 0], rotation: [Math.PI / 1.3, Math.PI * 2, 0] },
  {
    // Two quick hops, then still.
    gltf: "framer-motion",
    position: [-1.3, 2.3, 0.7],
    rotation: [Math.PI / 2.1, Math.PI * 2.2, Math.PI * 2],
    animate: (t, o) => {
      const p = t % 2.8;
      o.pos.y += 0.3 + (p < 0.8 ? Math.abs(Math.sin((p / 0.8) * TAU)) * 0.1 : 0);
    },
  },
  {
    gltf: "storybook",
    position: [1.2, 1.8, 1.9],
    rotation: [0, 0, Math.PI * 2],
    scale: 0.9,
    animate: (t, o) => {
      o.rot.y += Math.sin((t / 5) * TAU) * (Math.PI / 30);
      o.rot.x += Math.PI / 2 + Math.sin((t / 5) * TAU) * (Math.PI / 60);
    },
  },
  {
    // Lazy tumble.
    gltf: "python",
    position: [-4, 0.3, 0],
    rotation: [-Math.PI, Math.PI / 2, -Math.PI / 4],
    scale: 1.5,
    animate: (t, o) => {
      const wave = (Math.sin((t / 10) * TAU) + 1) / 2;
      o.rot.x += wave * (Math.PI * 1.5);
      o.rot.y -= wave * (Math.PI / 2 - Math.PI / 15);
    },
  },
  {
    gltf: "threejs",
    position: [-3.3, -1.1, -1],
    rotation: [Math.PI / 2, -Math.PI / 3, 0.3],
    animate: (t, o) => {
      o.rot.x += (t / 9) * TAU;
    },
  },
  {
    // Jittery little shiver — it is a testing tool, it is anxious.
    gltf: "jest",
    position: [-3.65, -1.55, 1],
    rotation: [Math.PI / 2.1, -Math.PI / 4, 0.2],
    animate: (t, o) => {
      const p = t % 3;
      if (p < 1) {
        o.pos.x += Math.sin(p * TAU * 2) * 0.05;
        o.pos.y -= Math.abs(Math.sin(p * TAU)) * 0.1;
        o.rot.y += Math.sin(p * TAU) * 0.15;
      }
    },
  },
  {
    gltf: "cloud-run",
    position: [-6.1, -1.1, -1.5],
    rotation: [Math.PI / 1.8, -Math.PI / 3, -Math.PI / 5],
    scale: 1.2,
    animate: (t, o) => {
      o.rot.z += Math.sin((t / 4) * TAU) * (Math.PI / 20);
      o.rot.y += Math.PI / 4 + Math.sin((t / 4) * TAU) * (Math.PI / 10);
    },
  },
  { gltf: "firebase", position: [5.8, 0.3, -1], rotation: [Math.PI / 2.2, -Math.PI / 18, Math.PI / 10], scale: 1.2 },
  {
    // Illustrator and Photoshop chase each other in a quick circle, then rest.
    gltf: "illustrator",
    position: [4, -0.5, -3],
    rotation: [Math.PI / 2, Math.PI / 5, -Math.PI / 9],
    animate: (t, o) => {
      const angle = burst(t, 4.9, 0.18) * TAU;
      o.pos.x += 0.4 - Math.cos(angle) * 0.4;
      o.pos.z += Math.sin(angle) * 0.5;
    },
  },
  {
    gltf: "photoshop",
    position: [4.8, -0.6, -3],
    rotation: [Math.PI / 2.1, -Math.PI / 5.2, Math.PI / 5],
    animate: (t, o) => {
      const angle = burst(t, 4.9, 0.18) * TAU;
      o.pos.x += Math.cos(angle) * 0.4 - 0.4;
      o.pos.z -= Math.sin(angle) * 0.5;
    },
  },
];

function CameraRig({
  mouseX,
  mouseY,
  targetZ,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  targetZ: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const cx = (-1 * mouseX.get()) / 3500;
    const cy = mouseY.get() / 5000;

    // Mutating the camera inside useFrame is the standard React Three Fiber
    // pattern — the scene graph is deliberately outside React's render cycle.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.x = cx;
    camera.position.y = cy;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const IDENTITY = { pos: new THREE.Vector3(), rot: new THREE.Euler(), scale: 1 };

function ToolIcon({ config }: { config: IconConfig }) {
  const { gltf, position, rotation, scale = 1 } = config;
  const { scene } = useGLTF(`/model/${gltf}.gltf`);
  const group = useRef<THREE.Group>(null);
  const clone = useMemo(() => scene.clone(true), [scene]);

  // Scratch object reused every frame so choreography allocates nothing.
  const offsets = useRef({ pos: new THREE.Vector3(), rot: new THREE.Euler(), scale: 1 });

  useFrame((state) => {
    const g = group.current;
    if (!g || !config.animate) return;

    const o = offsets.current;
    o.pos.copy(IDENTITY.pos);
    o.rot.copy(IDENTITY.rot);
    o.scale = 1;
    config.animate(state.clock.elapsedTime, o);

    g.position.set(position[0] + o.pos.x, position[1] + o.pos.y, position[2] + o.pos.z);
    g.rotation.set(rotation[0] + o.rot.x, rotation[1] + o.rot.y, rotation[2] + o.rot.z);
    g.scale.setScalar(scale * o.scale);
  });

  const [lx, ly, lz] = position;

  return (
    <>
      <pointLight position={[lx * 1.1, ly * 1.1, lz + 1]} intensity={0.8} />
      <group ref={group} position={position} rotation={rotation} scale={scale}>
        <primitive object={clone} />
      </group>
    </>
  );
}

function Scene({
  mouseX,
  mouseY,
  targetZ,
  onContextLostChange,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  targetZ: number;
  onContextLostChange: (lost: boolean) => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ pointerEvents: "none" }}
      resize={{ scroll: false, offsetSize: true }}
      camera={{ fov: 95, near: 0.1, far: 200, position: [0, 0, 4] }}
      onCreated={({ gl }) => {
        // A canvas whose WebGL context has been lost (GPU pressure, too many
        // live contexts, driver reset) is composited as an opaque block, so it
        // must be hidden until the browser restores the context.
        const el = gl.domElement;
        el.addEventListener("webglcontextlost", () => onContextLostChange(true));
        el.addEventListener("webglcontextrestored", () => onContextLostChange(false));
        if (gl.getContext()?.isContextLost()) onContextLostChange(true);
      }}
    >
      <ambientLight intensity={Math.PI / 3} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} targetZ={targetZ} />
      {/* useGLTF suspends; without a boundary the whole Canvas root suspends,
          and Strict Mode's dev double-mount then duplicates loader work and
          loses the WebGL context (pmndrs/react-three-fiber#3492). */}
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

const TechStack = () => {
  const [ref, bounds] = useMeasure({ scroll: true });
  const { x, y } = useMouse();
  const [{ isHover, isTap, isClick }] = useHero();
  const [contextLost, setContextLost] = useState(false);
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

  // Hero context lives outside the Canvas. R3F children render in a separate
  // reconciler root that cannot see this component's contexts, so the camera
  // target crosses the boundary as a plain prop.
  const targetZ = isHover? ( isClick ? 3.9 : isTap ? 5 : 4.5 ) : 5 ;

  /** Do not wrap `<Canvas>` in `motion.*` — R3F uses a separate reconciler and Motion breaks `ReactCurrentOwner`. */
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn(
        // -z-10 keeps the backdrop behind the hero card so the canvas can
        // never paint over the content, whatever state the GPU is in.
        "pointer-events-none absolute inset-0 -z-10 overflow-visible",
        "size-full",
        contextLost && "invisible",
      )}
      initial="rest"
      animate={isHover ? "hover" : "rest"}
      variants={{
        rest: { opacity: 0, transition: { duration: 0.6 } },
        hover: { opacity: 1, transition: { duration: 0.4 } },
      }}
    >
      <Scene
        mouseX={mouseX}
        mouseY={mouseY}
        targetZ={targetZ}
        onContextLostChange={setContextLost}
      />
    </motion.div>
  );
};

export default TechStack;
