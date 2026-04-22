'use client';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000; // Optimized density for performance
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sz[i] = Math.random() * 1.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.03; // Slower, smoother rotation
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.025} 
        color="#9093ff" 
        transparent 
        opacity={0.3} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export const NeuralCanvas = React.memo(function NeuralCanvas() {
  return (
    <div className="fixed inset-0 z-[-15] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 60 }} 
        dpr={1} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
        {/* Subtle glow orb */}
        <mesh position={[2, 1, -2]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.03} />
        </mesh>
      </Canvas>
    </div>
  );
});
