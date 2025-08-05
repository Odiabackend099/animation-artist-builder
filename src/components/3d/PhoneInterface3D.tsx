import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const PhoneModel: React.FC = () => {
  const phoneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={phoneRef}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[1.2, 2.4, 0.2]} />
          <meshStandardMaterial
            color="hsl(220, 30%, 8%)"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[1.1, 2.2, 0.02]} />
          <meshBasicMaterial
            color="hsl(220, 30%, 5%)"
          />
        </mesh>
        
        {/* Screen glow */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[1.1, 2.2, 0.01]} />
          <meshBasicMaterial
            color="hsl(193, 100%, 70%)"
            transparent
            opacity={0.3}
          />
        </mesh>
        
        {/* AI Avatar on screen */}
        <mesh position={[0, 0.3, 0.13]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial
            color="hsl(193, 100%, 70%)"
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Voice waves */}
        {[1, 2, 3].map((wave, index) => (
          <VoiceWave key={index} radius={0.5 + wave * 0.3} delay={index * 500} />
        ))}
      </group>
    </Float>
  );
};

const VoiceWave: React.FC<{ radius: number; delay: number }> = ({ radius, delay }) => {
  const waveRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (waveRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3 + delay) * 0.5 + 0.5;
      waveRef.current.scale.setScalar(0.8 + pulse * 0.4);
      const material = waveRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.4 * (1 - pulse);
    }
  });

  return (
    <mesh ref={waveRef} position={[0, 0.3, 0.2]}>
      <ringGeometry args={[radius, radius + 0.05, 32]} />
      <meshBasicMaterial
        color="hsl(193, 100%, 70%)"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  
  const particleCount = 100;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < particleCount; i++) {
      pos.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ]);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < particleCount; i++) {
        const matrix = new THREE.Matrix4();
        const [x, y, z] = positions[i];
        
        matrix.setPosition(
          x + Math.sin(time + i) * 0.5,
          y + Math.cos(time + i * 0.5) * 0.3,
          z + Math.sin(time * 0.5 + i) * 0.2
        );
        
        particlesRef.current.setMatrixAt(i, matrix);
      }
      
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial
        color="hsl(193, 100%, 70%)"
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
};

export const PhoneInterface3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [3, 1, 4], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          color="hsl(193, 100%, 70%)"
        />
        <pointLight 
          position={[-3, 3, 3]} 
          intensity={0.4} 
          color="hsl(280, 100%, 70%)" 
        />
        
        <PhoneModel />
        <FloatingParticles />
        
        {/* Environment glow */}
        <Sphere args={[8]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="hsl(193, 100%, 70%)"
            transparent
            opacity={0.02}
            side={THREE.BackSide}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};