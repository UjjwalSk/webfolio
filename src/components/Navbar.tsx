import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, User, Briefcase, Mail, Home, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';
import Logo from '../utils/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentTheme, setCurrentTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key==="Escape") {
        setIsOpen(false);
    }
  };

  window.addEventListener("keydown", handleKeyPress);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: User, label: 'About', href: '/about' },
    { icon: Code, label: 'Skills', href: '/skills' },
    { icon: Briefcase, label: 'Projects', href: '/projects' },
    { icon: Mail, label: 'Contact', href: '/contact' },
  ];

  const toggleTheme = () => {
    let currTheme = (currentTheme === 'dark' ? 'light' : 'dark');
    window.localStorage.setItem('theme', currTheme);
    setCurrentTheme(currTheme);
  };

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }
    },
  };

  // Background blur effect
  const blurVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
      }
    },
  };

  return (
    <>
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || 'bg-transparent'
        } ${scrolled ? 'shadow-lg' : ''}`}
        animate={{
          backdropFilter: scrolled || isOpen ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Theme Toggle, Hamburger & Other options */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className={`${theme.text} hover:opacity-75 p-2 rounded-full relative overflow-hidden`}
                aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: currentTheme === 'dark' ? 0 : 360 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {currentTheme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
              
              {/* Hamburger Button with Animations */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`${theme.text} z-50 rounded-full`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="relative w-8 h-8 flex items-center justify-center"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-40"
              variants={blurVariants}
              initial="closed"
              animate="open"
              exit="closed"
            />
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div 
                className="w-full max-w-4xl mx-auto px-4 pt-24 pb-8 grid gap-6"
                variants={menuVariants}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={menuItemVariants}
                    custom={index}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.href}
                      className={`text-4xl md:text-5xl font-medium flex items-center space-x-4 py-4 px-2 
                        ${location.pathname === item.href ? 'text-white' : 'text-white/30'}
                        transition-colors duration-300 hover:text-white group`}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        className="p-2 bg-black/20 rounded-lg"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <item.icon className="w-8 h-8 md:w-10 md:h-10" />
                      </motion.div>
                      <span>{item.label}</span>
                      <motion.div
                        className="h-0.5 w-0 bg-white absolute bottom-2 left-14"
                        initial={{ width: location.pathname === item.href ? "30%" : "0%" }}
                        whileHover={{ width: "30%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/30 to-indigo-600/30 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;