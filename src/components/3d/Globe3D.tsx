import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const GlobeWireframe: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Create wireframe geometry
  const wireframeGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(3, 32, 16);
    return new THREE.WireframeGeometry(geometry);
  }, []);

  // Create data points on the globe
  const dataPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const phi = Math.acos(-1 + (2 * i) / 50);
      const theta = Math.sqrt(50 * Math.PI) * phi;
      
      const x = 3.1 * Math.cos(theta) * Math.sin(phi);
      const y = 3.1 * Math.sin(theta) * Math.sin(phi);
      const z = 3.1 * Math.cos(phi);
      
      points.push([x, y, z] as [number, number, number]);
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main wireframe globe */}
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color="hsl(193, 100%, 70%)" 
          transparent 
          opacity={0.3}
        />
      </lineSegments>
      
      {/* Inner glow */}
      <Sphere args={[2.8]}>
        <meshBasicMaterial
          color="hsl(193, 100%, 70%)"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Data points */}
      {dataPoints.map((position, index) => (
        <Float key={index} speed={1} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={position}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color="hsl(193, 100%, 70%)"
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Pulse rings */}
      {[1, 2, 3].map((ring, index) => (
        <PulseRing key={index} radius={3.5 + ring * 0.5} delay={index * 1000} />
      ))}
    </group>
  );
};

const PulseRing: React.FC<{ radius: number; delay: number }> = ({ radius, delay }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.5 + 0.5;
      ringRef.current.scale.setScalar(0.8 + pulse * 0.4);
      const material = ringRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 * (1 - pulse);
    }
  });

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[radius, radius + 0.1, 32]} />
      <meshBasicMaterial
        color="hsl(193, 100%, 70%)"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const Globe3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [8, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="hsl(193, 100%, 70%)" intensity={0.5} />
        
        <GlobeWireframe />
        
        {/* Background particles */}
        <group>
          {Array.from({ length: 200 }, (_, i) => (
            <Float key={i} speed={0.5} rotationIntensity={0} floatIntensity={1}>
              <mesh
                position={[
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20
                ]}
              >
                <sphereGeometry args={[0.01, 4, 4]} />
                <meshBasicMaterial
                  color="hsl(193, 100%, 70%)"
                  transparent
                  opacity={0.4}
                />
              </mesh>
            </Float>
          ))}
        </group>
      </Canvas>
    </div>
  );
};