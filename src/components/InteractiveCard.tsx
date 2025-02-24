import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children, className = '' }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};

export default InteractiveCard;