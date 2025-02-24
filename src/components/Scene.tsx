import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const sphereRef2 = useRef<THREE.Mesh>(null);
  const sphereRef3 = useRef<THREE.Mesh>(null);
  const sphereRef4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = time * 0.3;
      sphereRef.current.rotation.y = time * 0.2;
    }
    
    if (sphereRef2.current) {
      sphereRef2.current.rotation.x = -time * 0.2;
      sphereRef2.current.rotation.y = -time * 0.3;
      sphereRef2.current.position.x = Math.sin(time * 0.5) * 2;
      sphereRef2.current.position.y = Math.cos(time * 0.3) * 1;
    }

    if (sphereRef3.current) {
      sphereRef3.current.rotation.x = time * 0.4;
      sphereRef3.current.rotation.z = time * 0.2;
      sphereRef3.current.position.x = Math.cos(time * 0.4) * 3;
      sphereRef3.current.position.y = Math.sin(time * 0.6) * 1.5;
    }

    if (sphereRef4.current) {
      sphereRef4.current.rotation.y = time * 0.5;
      sphereRef4.current.rotation.z = time * 0.3;
      sphereRef4.current.position.x = Math.sin(time * 0.3) * 4;
      sphereRef4.current.position.y = Math.cos(time * 0.5) * 2;
    }
  });

  return (
    <>
      <Stars 
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={1.5}
      />
      
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2}>
          <MeshDistortMaterial
            color="#000000"
            attach="material"
            distort={0.5}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      <Float
        speed={1.2}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <Sphere ref={sphereRef2} args={[0.5, 64, 64]} scale={1}>
          <MeshDistortMaterial
            color="#000000"
            attach="material"
            distort={0.8}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      <Float
        speed={1.8}
        rotationIntensity={2}
        floatIntensity={3}
      >
        <Sphere ref={sphereRef3} args={[0.3, 48, 48]} scale={1}>
          <MeshDistortMaterial
            color="#000000"
            attach="material"
            distort={1}
            speed={2.5}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>

      <Float
        speed={2}
        rotationIntensity={1.5}
        floatIntensity={2.5}
      >
        <Sphere ref={sphereRef4} args={[0.2, 32, 32]} scale={1}>
          <MeshDistortMaterial
            color="#000000"
            attach="material"
            distort={1.2}
            speed={3}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>
    </>
  );
}