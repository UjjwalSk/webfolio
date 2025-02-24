import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, GradientTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

// The actual 3D sphere component
const FloatingSphere = () => {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animate the sphere
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      sphereRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
      sphereRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <Sphere
      ref={sphereRef}
      args={[1, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <MeshDistortMaterial
        color="#ffffff"
        attach="material"
        distort={0.4}
        speed={3}
        roughness={0.1}
        metalness={0.8}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['red', 'blue', 'white']}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
};

// The wrapper component that includes the Canvas
const Logo = () => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  
  return (
    <motion.div
      className="w-12 h-12 relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/" className="block w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 2 : 1} />
          <directionalLight position={[-10, -10, -5]} intensity={isDark ? 1 : 0.5} color={isDark ? "#6366f1" : "#4f46e5"} />
          <FloatingSphere />
        </Canvas>
      </Link>
    </motion.div>
  );
};

export default Logo;