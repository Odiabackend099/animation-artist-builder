import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface IsometricBoxProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  step?: number;
}

const IsometricBox: React.FC<IsometricBoxProps> = ({ 
  position, 
  size, 
  color, 
  step 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const indicatorRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Glow effect
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
    
    if (indicatorRef.current && step) {
      indicatorRef.current.position.y = position[1] + size[1] + 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Wireframe outline */}
        <mesh>
          <boxGeometry args={[size[0] + 0.02, size[1] + 0.02, size[2] + 0.02]} />
          <meshBasicMaterial
            color="#60A5FA"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Simplified step indicator */}
        {step && (
          <group ref={indicatorRef} position={[0, size[1] + 0.8, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial 
                color="#60A5FA"
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
};

const DataFlow: React.FC<{ path: [number, number, number][] }> = ({ path }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particleRef.current && path.length > 1) {
      const t = (Math.sin(state.clock.elapsedTime) + 1) / 2;
      const index = Math.floor(t * (path.length - 1));
      const nextIndex = Math.min(index + 1, path.length - 1);
      const localT = (t * (path.length - 1)) % 1;
      
      const current = path[index];
      const next = path[nextIndex];
      
      particleRef.current.position.lerpVectors(
        new THREE.Vector3(...current),
        new THREE.Vector3(...next),
        localT
      );
    }
  });

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color="#A855F7"
        emissive="#A855F7"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

export const IsometricDiagram3D: React.FC = () => {
  const sceneElements = useMemo(() => [
    {
      position: [-2, 0, 1] as [number, number, number],
      size: [0.8, 1.2, 0.4] as [number, number, number],
      color: "#334155",
      step: 1
    },
    {
      position: [0, 1, 0] as [number, number, number],
      size: [1, 0.6, 0.8] as [number, number, number],
      color: "#0EA5E9",
      step: 2
    },
    {
      position: [2, 0.5, -1] as [number, number, number],
      size: [0.9, 0.9, 0.6] as [number, number, number],
      color: "#3B82F6",
      step: 3
    },
    {
      position: [1, -1, 1.5] as [number, number, number],
      size: [0.6, 0.8, 0.3] as [number, number, number],
      color: "#334155",
      step: 4
    }
  ], []);

  const dataFlowPath = useMemo(() => [
    [-2, 0, 1],
    [0, 1, 0],
    [2, 0.5, -1],
    [1, -1, 1.5]
  ] as [number, number, number][], []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6} 
          color="#60A5FA"
          castShadow
        />
        <pointLight 
          position={[-5, 5, -5]} 
          intensity={0.3} 
          color="#A855F7" 
        />
        
        {/* Scene elements */}
        {sceneElements.map((element, index) => (
          <IsometricBox
            key={index}
            position={element.position}
            size={element.size}
            color={element.color}
            step={element.step}
          />
        ))}
        
        {/* Data flow animation */}
        <DataFlow path={dataFlowPath} />
        
        {/* Ground plane */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial
            color="#1E293B"
            transparent
            opacity={0.1}
          />
        </mesh>
      </Canvas>
    </div>
  );
};