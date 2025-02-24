import { motion } from 'framer-motion';

const ContactArrow = () => {
  const pathVariants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0,
      y: -20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="fixed bottom-28 right-20 z-50">
      <motion.div
        initial="initial"
        animate="animate"
        className="relative"
      >
        <motion.div
          variants={textVariants}
          className="absolute -top-2 text-white font-bold text-[27px]"
        >
          Say Hello
        </motion.div>
        
        <svg
          width="200"
          height="200"
          viewBox="0 0 300 200"
        >
          {/* Main curved arrow */}
          <motion.path
            d="M80 20 C 80 100, 150 160, 280 160"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            variants={pathVariants}
          />
          
          {/* Arrow head */}
          <motion.path
            d="M260 140 L 280 160 L 260 180"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ContactArrow;