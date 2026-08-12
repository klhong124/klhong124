"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * The drifting 3D icon cluster behind a case study header, fed with the models
 * that match that study's stack. Same recipe as the mobile hero scene: capped
 * DPR and a slow drift so it reads as atmosphere rather than a widget.
 *
 * The cluster is pushable: the pointer is tracked on `window` (the canvas
 * itself is pointer-events-none so it never steals clicks from the page),
 * projected onto the scene, and applied as a repulsion force. A critically
 * damped spring pulls every icon back onto its drift path afterwards.
 */

type Vec3 = [number, number, number];

type IconConfig = {
  model: string;
  position: Vec3;
  rotation: Vec3;
  scale: number;
  drift: number;
  /** Signed spin speed — negative values rotate the other way. */
  spin: number;
};

/** Pointer position in scene units on the z=0 plane, shared via ref. */
type WorldPointer = { pos: THREE.Vector3; active: boolean };

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Scatters any number of icons on a golden-angle spiral so they never bunch
 * up, then randomizes everything else from ranges: size, depth, drift speed,
 * base tilt, and spin direction. Every visit deals a slightly different scene.
 */
function makeConfigs(models: string[]): IconConfig[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return models.map((model, index) => {
    const angle = index * goldenAngle + rand(-0.35, 0.35);
    const radius =
      models.length === 1
        ? rand(0, 0.3)
        : 0.9 + (index / models.length) * 1.3 + rand(-0.15, 0.25);
    return {
      model,
      position: [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        rand(-0.6, 0.4),
      ],
      rotation: [Math.PI / rand(1.9, 2.5), rand(-0.4, 0.4), rand(-0.5, 0.5)],
      scale: rand(0.75, 1.7),
      drift: rand(0.2, 0.55),
      spin: rand(0.15, 0.45) * (Math.random() < 0.5 ? -1 : 1),
    };
  });
}

/**
 * Converts the latest window pointer position into scene coordinates once per
 * frame, by unprojecting through the camera onto the z=0 plane the icons live
 * around. Mounted before the icons so they read this frame's value.
 */
function PointerProbe({
  pointer,
  world,
}: {
  pointer: React.RefObject<{ x: number; y: number; active: boolean }>;
  world: React.RefObject<WorldPointer>;
}) {
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ gl, camera }) => {
    const p = pointer.current;
    const w = world.current;
    if (!p || !w) return;
    if (!p.active) {
      w.active = false;
      return;
    }

    const rect = gl.domElement.getBoundingClientRect();
    const ndcX = ((p.x - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((p.y - rect.top) / rect.height) * 2 + 1;
    // A little margin beyond the canvas so icons near the edge still react.
    if (Math.abs(ndcX) > 1.3 || Math.abs(ndcY) > 1.3) {
      w.active = false;
      return;
    }

    vec.set(ndcX, ndcY, 0.5).unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    w.pos.copy(camera.position).addScaledVector(dir, distance);
    w.active = true;
  });

  return null;
}

function ToolIcon({ config, world }: { config: IconConfig; world: React.RefObject<WorldPointer> }) {
  const group = useRef<THREE.Group>(null);
  const offset = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const { scene } = useGLTF(`/model/${config.model}.gltf`);
  // Recentre the model on its own bounding-box centre: most of these GLTFs
  // have an off-origin pivot, so rotating the wrapper made the icon swing
  // around in an arc. With the geometry centred, the same rotation spins
  // each element in place instead.
  const clone = useMemo(() => {
    const c = scene.clone();
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.sub(center);
    return c;
  }, [scene]);
  const { position, rotation, scale, drift, spin } = config;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    // Clamped so a background tab does not integrate one giant step on return.
    const dt = Math.min(delta, 1 / 30);
    const off = offset.current;
    const vel = velocity.current;

    // The undisturbed drift path — where the icon wants to be.
    const baseX = position[0] + Math.sin(t * drift) * 0.25;
    const baseY = position[1] + Math.cos(t * drift * 0.9) * 0.18;
    const baseZ = position[2] + Math.sin(t * drift * 0.7) * 0.1;

    // Pointer repulsion: a squared falloff inside the push radius, so grazing
    // an icon nudges it while driving through it shoves it out of the way.
    const w = world.current;
    if (w?.active) {
      const dx = baseX + off.x - w.pos.x;
      const dy = baseY + off.y - w.pos.y;
      const dist = Math.hypot(dx, dy);
      const radius = 1 + scale * 0.6;
      if (dist < radius && dist > 1e-4) {
        const falloff = 1 - dist / radius;
        const push = (14 * falloff * falloff * dt) / dist;
        vel.x += dx * push;
        vel.y += dy * push;
        vel.z += rand(-0.4, 0.4) * falloff * dt;
      }
    }

    // Spring back to the drift path, with damping so it settles instead of
    // oscillating forever.
    vel.addScaledVector(off, -5 * dt);
    vel.multiplyScalar(Math.exp(-2.8 * dt));
    off.addScaledVector(vel, dt);

    g.position.set(baseX + off.x, baseY + off.y, baseZ + off.z);
    // Velocity leaks into rotation so a pushed icon tumbles a little instead
    // of translating rigidly.
    g.rotation.set(
      rotation[0] + Math.sin(t * drift * 0.5) * 0.15 - vel.y * 0.25,
      rotation[1] + t * spin + vel.x * 0.35,
      rotation[2] + Math.cos(t * drift * 0.6) * 0.08 + vel.x * 0.15,
    );
    g.scale.setScalar(scale);
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={clone} />
    </group>
  );
}

export default function WorkTechBackdrop({ models }: { models: string[] }) {
  const [contextLost, setContextLost] = useState(false);
  // Randomized once per mount — useState keeps the layout stable across
  // re-renders while still reshuffling on every page visit.
  const [configs] = useState(() => makeConfigs(models));

  // Raw pointer in client coordinates, written by window listeners; world is
  // the per-frame projection into the scene. Both live in refs so pointer
  // movement never re-renders React.
  const pointer = useRef({ x: 0, y: 0, active: false });
  const world = useRef<WorldPointer>({ pos: new THREE.Vector3(), active: false });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        contextLost && "invisible",
      )}
    >
      <Canvas
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
        resize={{ scroll: false, offsetSize: true }}
        camera={{ fov: 55, near: 0.1, far: 100, position: [0, 0, 5.5] }}
        onCreated={({ gl }) => {
          const el = gl.domElement;
          el.addEventListener("webglcontextlost", () => setContextLost(true));
          el.addEventListener("webglcontextrestored", () => setContextLost(false));
          if (gl.getContext()?.isContextLost()) setContextLost(true);
        }}
      >
        <ambientLight intensity={Math.PI / 2.5} />
        <PointerProbe pointer={pointer} world={world} />
        <Suspense fallback={null}>
          <group>
            {configs.map((config) => (
              <ToolIcon key={config.model} config={config} world={world} />
            ))}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
