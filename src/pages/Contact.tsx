import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import Scene from '../components/Scene';
import { motion } from "framer-motion";
import { useTheme } from '../utils/ThemeContext';

const SocialSphere = ({ position, color, icon: Icon, url, delay, name }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + delay) * 0.5;
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position} renderOrder={2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={"#fff"} transparent opacity={0.3} />
      <Html distanceFactor={15} renderOrder={3}>
        <div className="relative">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center gap-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Icon className="w-8 h-8 text-white hover:scale-110 transition-transform" />
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
              className="absolute top-full mt-2 text-white text-sm font-medium whitespace-nowrap"
            >
              {name}
            </motion.span>
          </a>
        </div>
      </Html>
    </mesh>
  );
};

const HorizontalLine = () => {
  return (
    <mesh position={[0, -2.5, 0]} renderOrder={2}>
      <boxGeometry args={[4, 0.02, 0.1]} />
      <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
    </mesh>
  );
};

const SceneWrapper = () => {
  return (
    <group position={[0, 0, -2]} renderOrder={1}>
      <Scene />
    </group>
  );
};

const Contact = () => {
  const { theme } = useTheme();
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ujjwalSk',
      color: '#333333',
      position: [-4, 0, 0]
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/ujjwalsk/',
      color: '#0077b5',
      position: [-1.5, 0, 0]
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/ujjwal2k24/',
      color: '#e4405f',
      position: [1.5, 0, 0]
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:ujjwal2k24@gmail.com',
      color: '#ea4335',
      position: [4, 0, 0]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative pt-36 text-center z-10">
        <h1 className={`text-6xl font-bold ${theme.text} mb-6`}>
          Let's Connect
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          I'm always open to new opportunities and collaborations
        </p>
      </div>
      <motion.div 
        className={`absolute inset-0 ${theme.background}`}
        style={{
          transformPerspective: "1000px"
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 25], fov: 20 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SceneWrapper />
          <HorizontalLine />
          {socialLinks.map((social, index) => (
            <SocialSphere
              key={social.name}
              position={social.position}
              color={social.color}
              icon={social.icon}
              url={social.url}
              name={social.name}
              delay={index * Math.PI * 0.5}
            />
          ))}
        </Canvas>
      </motion.div>
    </div>
  );
};

export default Contact;