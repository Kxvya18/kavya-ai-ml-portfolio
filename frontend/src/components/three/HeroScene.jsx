import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

// Rotating graph node cluster
function GraphNetwork({ mouse }) {
  const groupRef = useRef();
  const nodeCount = 42;

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.2;
      arr.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);

  const edges = useMemo(() => {
    const list = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 1.6) list.push([nodes[i], nodes[j]]);
      }
    }
    return list;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.3,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.current.x * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#e6e1d6"
            emissive="#c9a961"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {edges.map((e, i) => (
        <Line
          key={i}
          points={e}
          color="#8a7c5c"
          lineWidth={0.6}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a89b7a"
          size={0.015}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    mouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
  };

  return (
    <div onMouseMove={onMove} className="absolute inset-0">
      {/* Skeleton shown until the Canvas has painted */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          ready ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        {/* soft ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#c9a961]/8 blur-3xl" />
        {/* faux graph nodes shimmering */}
        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 w-full h-full opacity-40"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const cx = 400 + Math.cos((i / 24) * Math.PI * 2) * (140 + (i % 3) * 30);
            const cy = 250 + Math.sin((i / 24) * Math.PI * 2) * (110 + (i % 3) * 20);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3"
                fill="#c9a961"
                opacity={0.4}
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.8;0.2"
                  dur="2.4s"
                  begin={`${(i % 6) * 0.15}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>
      </div>

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        onCreated={() => setTimeout(() => setReady(true), 200)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#c9a961" />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <GraphNetwork mouse={mouse} />
        </Float>
        <ParticleField />
      </Canvas>
    </div>
  );
}
