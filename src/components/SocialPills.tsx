import {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SocialPills = () => {
  const location = useLocation();
  const [isContactPage, setContactPage] = useState(location.pathname === '/contact');
  const [isHomePage, setHomePage] = useState(location.pathname === "/");
  useEffect(()=>{
    setContactPage(location.pathname === '/contact');
    setHomePage(location.pathname === "/");
  },[location, isContactPage, isHomePage]);
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ujjwalSk',
      color: 'hover:text-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/ujjwalsk/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/ujjwal2k24/',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:ujjwal2k24@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-30 flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {
      <motion.a
        href="/assets/files/resume.pdf"
        download
        variants={itemVariants}
        whileHover={isContactPage?{rotate:60}:{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg 
          transition-colors duration-300 hover:text-gray-700
          hover:shadow-xl group`}
          style={(isHomePage || isContactPage)?{scale: 1.2, rotate: 90}:{}}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span
          className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 
            px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium
            shadow-lg whitespace-nowrap transition-opacity duration-300
            ${(isHomePage || isContactPage) ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          Download Resume
        </span>
      </motion.a>
      }
      {!isContactPage && socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg 
            transition-colors duration-300 ${social.color}
            hover:shadow-xl group`}
        >
          <social.icon className="w-5 h-5" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 
            px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-medium
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            whitespace-nowrap shadow-lg">
            {social.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialPills;