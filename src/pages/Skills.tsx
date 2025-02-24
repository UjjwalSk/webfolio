import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll } from 'framer-motion';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import CircularGallery from '../utils/CircularGallery';
import Scene from '../components/Scene';
import { useTheme } from '../utils/ThemeContext';

const SKILL_CATEGORIES = {
  "Programming Languages": [
    "Python",
    "C",
    "C++",
    "Java",
    "TypeScript",
    "Go",
    "Bash"
  ],
  "Web Development": [
    "HTML5",
    "CSS3",
    "React",
    "NodeJS",
    "Express",
    "ThreeJs",
    "SASS",
    "TailwindCSS",
    "Bootstrap",
    "P5Js"
  ],
  "Databases": [
    "MongoDB",
    "PostgreSQL",
    "Mysql",
    "Firebase"
  ],
  "DevOps & Cloud": [
    "Docker",
    "Kubernetes",
    "AWS",
    "Jenkins",
    "Sonarqube",
    "Git",
    "Github"
  ],
  "Operating Systems": [
    "Linux",
    "Windows",
    "MacOS"
  ],
  "Design & Graphics": [
    "Figma",
    "OpenCV",
    "Processing",
    "Postman",
    "AndroidStudio"
  ]
};

const SKILL_LOGOS = {
  Python: "/assets/images/skills/icons/python.svg",
  C: "/assets/images/skills/icons/c.svg",
  "C++": "/assets/images/skills/icons/cplusplus.svg",
  Java: "/assets/images/skills/icons/java.svg",
  HTML5: "/assets/images/skills/icons/html5.svg",
  CSS3: "/assets/images/skills/icons/css3.svg",
  Bootstrap: "/assets/images/skills/icons/bootstrap.svg",
  TailwindCSS: "/assets/images/skills/icons/tailwindcss.svg",
  SASS: "/assets/images/skills/icons/sass.svg",
  NodeJS: "/assets/images/skills/icons/nodejs.svg",
  Express: "/assets/images/skills/icons/express.svg",
  ThreeJs: "/assets/images/skills/icons/threejs.svg",
  GoLang: "/assets/images/skills/icons/go.svg",
  Figma: "/assets/images/skills/icons/figma.svg",
  OpenCV: "/assets/images/skills/icons/opencv.svg",
  React: "/assets/images/skills/icons/react.svg",
  TypeScript: "/assets/images/skills/icons/typescript.svg",
  Docker: "/assets/images/skills/icons/docker.svg",
  AWS: "/assets/images/skills/icons/mysql.svg",
  Mysql: "/assets/images/skills/icons/mongodb.svg",
  MongoDB: "/assets/images/skills/icons/mongodb.svg",
  Firebase: "/assets/images/skills/icons/firebase.svg",
  PostgreSQL: "/assets/images/skills/icons/postgresql.svg",
  Git: "/assets/images/skills/icons/git.svg",
  Github: "/assets/images/skills/icons/github.svg",
  Go: "/assets/images/skills/icons/go.svg",
  Kubernetes: "/assets/images/skills/icons/k8s.svg",
  Processing: "/assets/images/skills/icons/processing.svg",
  Sonarqube: "/assets/images/skills/icons/sonarqube.svg",
  Jenkins: "/assets/images/skills/icons/jenkins.svg",
  Bash: "/assets/images/skills/icons/bash.svg",
  Linux: "/assets/images/skills/icons/linux.svg",
  Windows: "/assets/images/skills/icons/windows8.svg",
  MacOS: "/assets/images/skills/icons/apple.svg",
  P5Js: "/assets/images/skills/icons/p5js.svg",
  Postman:  "/assets/images/skills/icons/postman.svg",
  AndroidStudio: "/assets/images/skills/icons/androidstudio.svg"
};

const FEATURED_PROJECTS = [
  {
    text: "BloodLink",
    image: "/assets/images/skills/1.jpg",
  },
  {
    text: "3d Audio Visualizer",
    image: "/assets/images/skills/2.jpg",
  },
  {
    text: "3d Solar",
    image: "/assets/images/skills/3.jpg",
  },
  {
    text: "Traximo",
    image: "/assets/images/skills/4.jpg",
  },
  {
    text: "MyWorld",
    image: "/assets/images/skills/5.jpg",
  },
  {
    text: "Task-Manager",
    image: "/assets/images/skills/6.jpg",
  },
  {
    text: "Fractal Tree",
    image: "/assets/images/skills/7.jpg",
  }
];

function BranchNode({ skill, index, total, radius = 200 }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <group position={[x, y, 0]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[20, 32, 32]} scale={hovered ? 1.2 : 1}>
          <MeshDistortMaterial
            color={hovered ? "#ffffff" : "#000000"}
            attach="material"
            distort={0.3}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function SkillBranch({ category, skills, angle, radius = 300 }) {
  return (
    <group rotation={[0, 0, angle]}>
      {skills.map((skill, index) => (
        <BranchNode
          key={skill}
          skill={skill}
          index={index}
          total={skills.length}
          radius={radius}
        />
      ))}
    </group>
  );
}

function Scene3D() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.PI / 2;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {Object.entries(SKILL_CATEGORIES).map(([category, skills], index, array) => (
        <SkillBranch
          key={category}
          category={category}
          skills={skills}
          angle={(index / array.length) * Math.PI * 2}
        />
      ))}
      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[50, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#000000"
            attach="material"
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

const SkillCard = ({ category, skills, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${theme.reverseBg} ${theme.text} backdrop-blur-md shadow-xl rounded-xl p-6 hover:bg-white/20 transition-all duration-500 h-full w-full hover:cursor-pointer`}
    >
      <h3 className="text-xl font-semibold mb-6">{category}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 group min-w-0"
          >
            <div className="flex-shrink-0">
              <img
                src={SKILL_LOGOS[skill]}
                alt={skill}
                className="w-6 h-6"
              />
            </div>
            <span className="transition-colors duration-300 text-sm truncate">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};




function Skills() {
  const { scrollYProgress } = useScroll();
  const {theme} = useTheme();

  return (
    <div className={`min-h-screen overflow-hidden relative ${theme.background}`}>
      <motion.div 
              className={`absolute inset-0 ${theme.background}`} // TODO: add themes here
              style={{
                transformPerspective: "500px"
              }}
            >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scene />
        </Canvas>
      </motion.div>
      <div className="relative pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center mb-8"
        >
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-5xl font-bold ${theme.text} mb-4`}
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className={`text-gray-500 text-lg`}
          >
            A comprehensive overview of my technical skills
          </motion.p>
        </motion.div>

        <div className="container mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
              <SkillCard key={category} category={category} skills={skills} theme={theme}/>
            ))}
          </div>
        </div>
        
        <div className='h-[450px]'>
          <CircularGallery bend={3} textColor="#fff" borderRadius={0.05} items={FEATURED_PROJECTS}/>
        </div>
      </div>
    </div>
  );
}

export default Skills;