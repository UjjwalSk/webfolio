import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Edges, Float } from '@react-three/drei';
import { Briefcase, Code, School } from 'lucide-react';
import * as THREE from 'three';
import { useTheme } from '../utils/ThemeContext';
import Scene from '../components/Scene';

// Timeline data remains the same
const timelineData = [
  {
      "year": "Present",
      "title": "Software Engineering-Associate",
      "description": "Full Time",
      "icon": Briefcase,
      "location": "FICO, Bangalore",
      "logo": "/assets/images/about/fico-logo-blue.svg",
  },
  {
      "year": "May 2023 - June 2024",
      "title": "Software Engineering - Intern",
      "description": "Internship",
      "icon": Code,
      "location": "FICO, Bangalore",
      "logo": "/assets/images/about/fico-logo-blue.svg",
  },
  {
    "year": "2020 - 2024",
    "title": "Bachelors in Engineering in Computer Science",
    "description": "Bachelors",
    "icon": School,
    "location": "Chitkara University, Punjab, India",
    "logo": "/assets/images/about/chitkara.svg",
  },
  {
    "year": "2020 - On Hold",
    "title": "Bachelor of Science (BS) In Data Science and Applications",
    "description": "Bachelors",
    "icon": School,
    "location": "IIT Madras, Chennai, India",
    "logo": "/assets/images/about/iitm.svg",
  },
  {
    "year": "Nov 2021 - Dec 2021",
    "title": "Data Structure Scholar",
    "description": "Internship",
    "icon": Code,
    "location": "TwoWaits",
    "logo": "/assets/images/about/twowaits.png",
  },
  {
    "year": "2020",
    "title": "Higher Secondary Education",
    "description": "12th Standard",
    "icon": School,
    "location": "Vaish Senior Secondary School, Charkhi Dadri, Haryana, India",
  },
  {
      "year": "2018",
      "title": "Secondary Education",
      "description": "10th Standard",
      "icon": School,
      "location": "Vaish Senior Secondary School, Charkhi Dadri, Haryana, India",
  }
];

// 3D Shape Component
function GeometricShape({ position, color, speed, shapeType }) {
  const meshRef = useRef();
  
  // Generate geometry based on shape type
  const geometry = useMemo(() => {
    switch(shapeType) {
      case 'cube':
        return new THREE.BoxGeometry(1, 1, 1);
      case 'cuboid':
        return new THREE.BoxGeometry(1.5, 1, 0.5);
      case 'pyramid':
        return new THREE.ConeGeometry(0.7, 1, 4);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.8);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(0.8);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(0.8);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [shapeType]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x += speed * 0.01;
    meshRef.current.rotation.y += speed * 0.012;
    meshRef.current.position.y = position[1] + Math.sin(time * speed * 0.5) * 0.3;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.5) * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshPhongMaterial 
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
        <Edges
          scale={1}
          threshold={15} // Display edges only at angles greater than this value
          color={color}
        />
      </mesh>
    </Float>
  );
}

// Background Scene Component
function BackgroundShapes() {
  const shapes = useMemo(() => {
    const shapeTypes = ['cube', 'cuboid', 'pyramid', 'octahedron', 'tetrahedron', 'icosahedron'];
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8
      ],
      color: `#000`,
      speed: Math.random() * 0.5 + 0.5,
      scale: Math.random() * 0.5 + 0.5,
      shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
    }));
  }, []);

  return (
    <group>
      {shapes.map((shape, i) => (
        <GeometricShape key={i} {...shape} />
      ))}
    </group>
  );
}

// Scene Component
function Scene3D() {
  return (
    <>
      <color attach="background" args={['#f8f9ff']} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <BackgroundShapes />
    </>
  );
}

// Timeline Item Component (remains the same)
const TimelineItem = ({ theme, data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative flex items-center mb-12 last:mb-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
      
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? "white" : "black"
        }}
        className="relative z-10 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center"
      >
        <Icon className={`w-8 h-8 ${isHovered ? "text-black" :'text-white' }`} />
      </motion.div>
      <motion.div
        animate={{
          x: isHovered ? 10 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        className={`ml-8 ${theme.reverseBg} ${theme.text} backdrop-blur-sm rounded-xl p-6 shadow-xl flex-1`}
      >
        <div className='flex justify-between items-center'>
          <div>
            <span className="text-sm font-semibold text-purple-600">{data.year}</span>
            <h3 className={`text-xl font-bold text-[${theme.primary}] mt-1`}>{data.title}</h3>
            <p className={`text-[${theme.secondary}] mt-2`}>{data.description}</p>
            <p className={`text-[${theme.secondary}] mt-2`}>{data.location}</p>
          </div>
          {data.logo && <div>
            <img className='w-36 h-36' src={data.logo}/>
          </div>}
        </div>
      </motion.div>
    </motion.div>
  );
};

function About() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen relative ${theme.text} ${theme.background}`}>
      <motion.div 
        className={`absolute inset-0 ${theme.background}`} // TODO: add themes here
        style={{
          transformPerspective: "1000px"
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scene />
        </Canvas>
      </motion.div>
      <div className="relative z-10 pt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">My Journey</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-500">
              A versatile full-stack developer, multi-language programmer, and creative coder with strong UI/UX skills & talent for solving complex problems.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timelineData.map((item, index) => (
              <TimelineItem theme={theme} key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;