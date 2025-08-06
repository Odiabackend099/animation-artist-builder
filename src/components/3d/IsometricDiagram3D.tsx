import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface IsometricBoxProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label?: string;
  step?: number;
}

const IsometricBox: React.FC<IsometricBoxProps> = ({ 
  position, 
  size, 
  color, 
  label, 
  step 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Glow effect
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
    
    if (labelRef.current && step) {
      labelRef.current.position.y = position[1] + size[1] + 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
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
            color="hsl(193, 100%, 70%)"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Simplified step indicator without Text3D */}
        {step && (
          <group ref={labelRef} position={[0, size[1] + 0.8, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial 
                color="hsl(193, 100%, 70%)"
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

const ConnectionPath: React.FC<{ 
  start: [number, number, number]; 
  end: [number, number, number];
  delay?: number;
}> = ({ start, end, delay = 0 }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.5 + 0.5;
      material.opacity = 0.3 + pulse * 0.4;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + 1,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end)
  ], [start, end]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 20, 0.02, 8, false), [curve]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="hsl(193, 100%, 70%)"
        transparent
        opacity={0.6}
        emissive="hsl(193, 100%, 70%)"
        emissiveIntensity={0.2}
      />
    </mesh>
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
        color="hsl(280, 100%, 70%)"
        emissive="hsl(280, 100%, 70%)"
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
      color: "hsl(220, 30%, 25%)",
      label: "CLIENT",
      step: 1
    },
    {
      position: [0, 1, 0] as [number, number, number],
      size: [1, 0.6, 0.8] as [number, number, number],
      color: "hsl(193, 100%, 50%)",
      label: "CLOUD",
      step: 2
    },
    {
      position: [2, 0.5, -1] as [number, number, number],
      size: [0.9, 0.9, 0.6] as [number, number, number],
      color: "hsl(193, 100%, 60%)",
      label: "AGENT",
      step: 3
    },
    {
      position: [1, -1, 1.5] as [number, number, number],
      size: [0.6, 0.8, 0.3] as [number, number, number],
      color: "hsl(220, 30%, 25%)",
      label: "USER",
      step: 4
    }
  ], []);

  const connectionPaths = useMemo(() => [
    { start: [-2, 0, 1] as [number, number, number], end: [0, 1, 0] as [number, number, number], delay: 0 },
    { start: [0, 1, 0] as [number, number, number], end: [2, 0.5, -1] as [number, number, number], delay: 1 },
    { start: [2, 0.5, -1] as [number, number, number], end: [1, -1, 1.5] as [number, number, number], delay: 2 }
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
          color="hsl(193, 100%, 70%)"
          castShadow
        />
        <pointLight 
          position={[-5, 5, -5]} 
          intensity={0.3} 
          color="hsl(280, 100%, 70%)" 
        />
        
        {/* Scene elements */}
        {sceneElements.map((element, index) => (
          <IsometricBox
            key={index}
            position={element.position}
            size={element.size}
            color={element.color}
            label={element.label}
            step={element.step}
          />
        ))}
        
        {/* Connection paths */}
        {connectionPaths.map((path, index) => (
          <ConnectionPath
            key={index}
            start={path.start}
            end={path.end}
            delay={path.delay}
          />
        ))}
        
        {/* Data flow animation */}
        <DataFlow path={dataFlowPath} />
        
        {/* Ground plane */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial
            color="hsl(220, 30%, 8%)"
            transparent
            opacity={0.1}
          />
        </mesh>
      </Canvas>
    </div>
  );
};