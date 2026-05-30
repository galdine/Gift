"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i * 3] = (Math.random() - 0.5) * 0.003;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, spd];
  }, [count]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += speeds[i3] + mouse.current.x * 0.0003;
      pos[i3 + 1] += speeds[i3 + 1] + mouse.current.y * 0.0003;
      pos[i3 + 2] += speeds[i3 + 2];

      if (Math.abs(pos[i3]) > 10) pos[i3] *= -0.9;
      if (Math.abs(pos[i3 + 1]) > 10) pos[i3 + 1] *= -0.9;
      if (Math.abs(pos[i3 + 2]) > 5) pos[i3 + 2] *= -0.9;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#d4f4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wide = window.innerWidth >= 640;
    setEnabled(!reduced && wide);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
