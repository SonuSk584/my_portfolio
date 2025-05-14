import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const SKLogo = () => (
  <Link to="/">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:border-white/20 cursor-pointer group"
    >
      <div className="flex items-center font-mono text-sm tracking-tighter">
        <span className="text-white/60">&lt;</span>
        <span className="text-white font-semibold mx-[1px]">SK</span>
        <span className="text-white/60">/&gt;</span>
      </div>
      <motion.div
        className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Section links for scrolling
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' 
      });
    }
  };

  // Check for section visibility when scrolling
  useEffect(() => {
    const handleScroll = () => {      
      for (const section of navLinks) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Determine if the section is in view
        if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks]);

  // Check for hash in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          scrollToSection(id);
        }, 100);
      }
    }
  }, [location]);

  return (
    <nav className="bg-[#141414] text-white fixed w-full top-0 z-50 backdrop-blur-sm opacity-80">
      {/* Matching the home section's gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/5 opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <SKLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute left-0 right-0 h-0.5 bg-blue-500 bottom-[-4px]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-2 py-1 ${
                  activeSection === link.id
                    ? 'text-white font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar; 