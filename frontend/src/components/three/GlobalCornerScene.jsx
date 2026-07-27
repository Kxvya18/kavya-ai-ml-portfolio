import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useLocation } from "react-router-dom";

// A hypergraph = triangles connecting groups of 3 nodes
function Hypergraph({ scale = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
      ref.current.rotation.x += delta * 0.1;
    }
  });

  const nodes = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      const phi = Math.acos(-1 + (2 * i) / 18);
      const theta = Math.sqrt(18 * Math.PI) * phi;
      const r = 1.4;
      arr.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);

  const triangles = React.useMemo(() => {
    const tris = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * nodes.length);
      let b = (a + 1 + Math.floor(Math.random() * 5)) % nodes.length;
      let c = (b + 1 + Math.floor(Math.random() * 5)) % nodes.length;
      tris.push([nodes[a], nodes[b], nodes[c]]);
    }
    return tris;
  }, [nodes]);

  return (
    <group ref={ref} scale={scale}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#e6d9a8" emissive="#c9a961" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {triangles.map((t, i) => (
        <mesh key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([...t[0], ...t[1], ...t[2]])}
              count={3}
              itemSize={3}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#c9a961" transparent opacity={0.12} side={2} />
        </mesh>
      ))}
      {triangles.map((t, i) => (
        <group key={`e${i}`}>
          <Line points={[t[0], t[1]]} color="#c9a961" lineWidth={0.8} transparent opacity={0.5} />
          <Line points={[t[1], t[2]]} color="#c9a961" lineWidth={0.8} transparent opacity={0.5} />
          <Line points={[t[2], t[0]]} color="#c9a961" lineWidth={0.8} transparent opacity={0.5} />
        </group>
      ))}
    </group>
  );
}

function MiniNode() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.rotation.z += delta * 0.2;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color="#c9a961"
          wireframe
          emissive="#c9a961"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 20, 20]} />
        <meshStandardMaterial color="#e6d9a8" emissive="#c9a961" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Fixed corner scene:
 * - Hidden on hero (hero has its own 3D)
 * - Small MiniNode when scrolling middle sections
 * - Blooms into hypergraph on skills section
 */
export default function GlobalCornerScene() {
  const { pathname } = useLocation();
  const [mode, setMode] = useState("hidden"); // hidden | mini | bloom

  useEffect(() => {
    if (pathname !== "/") {
      setMode("mini");
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      const skills = document.getElementById("skills");
      const hero = document.getElementById("top");
      const heroH = hero ? hero.offsetHeight : 800;
      if (y < heroH * 0.7) {
        setMode("hidden");
        return;
      }
      if (skills) {
        const rect = skills.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          setMode("bloom");
          return;
        }
      }
      setMode("mini");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const sizeClass =
    mode === "hidden"
      ? "opacity-0 scale-75 pointer-events-none w-24 h-24"
      : mode === "mini"
      ? "opacity-100 scale-100 w-24 h-24 md:w-28 md:h-28"
      : "opacity-100 scale-100 w-64 h-64 md:w-80 md:h-80";

  return (
    <div
      className={`fixed z-40 top-20 right-6 md:right-10 transition-all duration-700 ease-out ${sizeClass}`}
      style={{ pointerEvents: "none" }}
    >
      <div className="w-full h-full rounded-full overflow-hidden border border-[#3a3220]/60 bg-[#0e0c08]/40 backdrop-blur-md">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={0.8} />
          <pointLight position={[-3, -2, 2]} intensity={0.4} color="#f0e6cf" />
          <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
            {mode === "bloom" ? <Hypergraph scale={1.4} /> : <MiniNode />}
          </Float>
        </Canvas>
      </div>
    </div>
  );
}
