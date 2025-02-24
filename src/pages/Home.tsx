import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Scene from '../components/Scene';
import SnakeGame from '../components/SnakeGame';
import { useTheme } from '../utils/ThemeContext';
import { Link } from 'react-router-dom';
import TimedTooltip from '../utils/TimedTooltip';
import { Keyboard } from 'lucide-react';

function GlowingText({ children }: { children: React.ReactNode }) {

  return (
    <motion.div
      style={{
        transformPerspective: "1000px"
      }}
      className="relative inline-block"
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-lg opacity-50 blur-xl"
      />
    </motion.div>
  );
}

function FloatingParticle({ delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 2, 0],
        opacity: [0.8, 0.8, 0],
        y: [-20, -60],
        x: [-20, 20]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeOut"
      }}
      className="absolute w-1 h-1 bg-white rounded-full"
    />
  );
}

function ScrollPrompt() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-6 h-6 border-2 border-black rounded-full relative"
      >
        <motion.div
          animate={{
            y: [0, 4, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1 h-1 bg-black rounded-full absolute left-1/2 top-1 -translate-x-1/2"
        />
      </motion.div>
      <span className="text-sm text-gray-600">Scroll to explore</span>
    </motion.div>
  );
}

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      mouseX.set(x * 100);
      mouseY.set(y * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="h-screen relative overflow-hidden">
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

      {!window.localStorage.getItem('theme') && <TimedTooltip msg="Use arrow keys or WASD to interact with snake !" vanish={7000} Icon={Keyboard}/>}
      <SnakeGame />
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <GlowingText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h1 className="text-8xl font-bold mb-4 bg-clip-border text-white">
              Ujjwal
            </h1>
          </motion.div>
          </GlowingText>
          

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.p
              className="text-2xl text-gray-700 font-light relative z-10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "#ffffff8c",
              }}
            >
              Software Developer & Creative Coder
            </motion.p>
            {[...Array(5)].map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.4} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
              >
                View Projects
              </motion.button>
            </Link>
            <Link to="/contact">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-white bg-white rounded-lg hover:bg-black hover:text-white transition-colors duration-300"
              >
                Contact Me
              </motion.button>
            </Link>
          </motion.div>
        </div>

      </div>

      {/* <AudioVisualizer /> */}
      <ScrollPrompt />
    </div>
  );
}

export default Home;