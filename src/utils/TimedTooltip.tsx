import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TimedTooltipProps = { msg: string, vanish: number, Icon: React.ElementType};

const TimedTooltip = ({ msg, vanish, Icon }: TimedTooltipProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Start countdown
    const duration = vanish; // value in ms (1000 = 1s) to vanish the tooltip
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      
      if (remaining <= 0) {
        setIsVisible(false);
        clearInterval(timer);
      } else {
        setProgress(remaining);
      }
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-16 right-44 bg-white/80 text-black px-4 py-3 rounded-lg z-20"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">Tip: {msg}</span>
          </div>
          
          {/* Progress ring */}
          <svg 
            className="absolute -top-2 -right-2 w-6 h-6 transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              className="fill-none stroke-white/20"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              className="fill-none stroke-white"
              strokeWidth="2"
              strokeDasharray={100}
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimedTooltip;