import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const barCount = 7; // Number of vertical bars

  useEffect(() => {
    // Create audio element on mount
    audioRef.current = new Audio('/assets/audio/music.mp3');
    audioRef.current.loop = true;
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const handleToggleSound = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
        alert("Please click again to play audio. Browser requires user interaction first.");
      });
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  // Create array for vertical bars
  const bars = Array.from({ length: barCount });

  return (
    <motion.div
      className="fixed bottom-8 right-[47.5%] z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={handleToggleSound}
        className="bg-black/30 backdrop-blur-md hover:bg-black/40 rounded-full p-3 w-15 h-8 shadow-lg flex items-center justify-center gap-0.5 border border-white/10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {bars.map((_, index) => (
            <motion.div
              key={index}
              className="w-1 bg-white rounded-full"
              initial={{ height: 5 }}
              animate={{
                height: isPlaying ? [5, 12, 18, 10, 15, 8][index % 6] : 5,
              }}
              transition={{
                duration: isPlaying ? 0.8 : 0.4,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.1
              }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default AudioVisualizer;