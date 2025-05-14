import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiExternalLink, FiLinkedin, FiInstagram, FiEye, FiX } from 'react-icons/fi';
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiFramer, SiMongodb, SiMysql, SiPostgresql, SiPrisma,
  SiGit, SiGithub, SiNodedotjs, SiExpress, SiVercel, SiPostman,
  SiOpenjdk, SiLinux, SiPnpm, SiZod
} from 'react-icons/si';
import emailjs from '@emailjs/browser';

// Import project data
import { projects } from '../data/projects';

// Initialize EmailJS with your public key
emailjs.init("J28JCSFeW3C1rY3YT");

// Spark component
const SparkAnimation = ({ isSmall = false }) => {
  return (
    <motion.div
      className={`absolute ${isSmall ? 'w-2 h-2' : 'w-3 h-3'} rounded-full bg-gradient-to-r from-primary via-white to-accent`}
      initial={{ scale: 0.8 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        filter: "blur(1px)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)"
      }}
    />
  );
};

const CircularSparkPath = () => {
  return (
    <>      
      {/* First spark - right side */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20">
          <SparkAnimation isSmall={false} />
        </div>
      </motion.div>
      
      {/* Second spark - left side */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: [180, 540] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20">
          <SparkAnimation isSmall={true} />
        </div>
      </motion.div>
    </>
  );
};

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (isTyping) {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, 100); // Speed of typing
      } else {
        setIsDone(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1000); // Pause at the end
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length - 1));
        }, 100); // Speed of erasing
      } else {
        setIsDone(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text]);

  return (
    <span className="inline-block min-w-[4ch]">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState("Web Developer");
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
      setCurrentText(prev => 
        prev === "Web Developer" ? "Data Science Learner" : "Web Developer"
      );
    }, 6000); // Complete cycle duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white flex flex-wrap items-center gap-3">
        <span className="whitespace-nowrap">Hi, I'm</span>
        <div className="relative inline-block min-w-[280px] md:min-w-[400px] overflow-hidden">
          <TypewriterText key={key} text={currentText} />
        </div>
      </h1>
    </div>
  );
};

// Animation variants for projects section
const containerVariants = {
  hidden: { 
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  }
};

// Animation variants for skills section
const skillsContainerVariants = {
  hidden: { 
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
      ease: "easeOut",
      duration: 0.3
    }
  }
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      mass: 0.6
    }
  }
};

// Keep the hover animation snappy but slightly smoother
const skillHoverAnimation = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 12,
    mass: 0.6
  }
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.5
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary-dark border border-white/10 rounded-xl overflow-hidden max-w-4xl w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
            >
              <FiX size={20} />
            </button>

            {/* Project Image */}
            <div className="relative h-[300px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
              
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-gray-300">{project.detailedDescription}</p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white"
                >
                  <FiGithub size={20} />
                  View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors text-primary"
                >
                  <FiExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Home = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    emailjs.sendForm(
      'service_v8zrwn4',
      'template_pw6xslu',
      form.current,
      'J28JCSFeW3C1rY3YT'
    )
      .then((result) => {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        form.current.reset();
      })
      .catch((error) => {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.'
        });
        console.error('EmailJS Error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary-dark text-gray-100"
    >
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/5"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-7xl w-full py-20">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 text-center md:text-left flex flex-col items-center md:items-start justify-center min-h-[400px]"
            >
              <AnimatedText />
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
                Building modern web applications and deriving insights from data.
                Passionate about creating impactful solutions using cutting-edge technologies.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center md:justify-start"
              >
                <a
                  href="https://drive.google.com/file/d/192Eq-kbQ6xZStK9jiJoSadXeDlp-VKnd/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg gap-2 backdrop-blur-sm bg-secondary/80 border-gray-700 hover:bg-secondary text-white group relative overflow-hidden"
                >
                  <span>Download Resume</span>
                  <motion.div
                    className="inline-block"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <FiDownload className="group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </motion.div>
            </motion.div>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative flex-1 flex justify-center items-center min-h-[400px]"
            >
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full opacity-20 animate-pulse" />
                
                {/* Spark Animation */}
                <div className="absolute -inset-2">
                  <CircularSparkPath />
                </div>
                
                {/* Image */}
                <motion.div
                  className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src="/avatar.png"
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Code-like decorative elements */}
                <div className="absolute -top-4 -right-4 text-primary/40 font-mono text-sm">&lt;/&gt;</div>
                <div className="absolute -bottom-4 -left-4 text-accent/40 font-mono text-sm">{`{ }`}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-gray-300 text-lg">Get to know me better</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">Full Stack Developer & Data Science Learner</h3>
              <p className="text-gray-300">
                I am a passionate developer with expertise in both web development and data science.
                With a strong foundation in the MERN stack and machine learning, I create innovative
                solutions that combine beautiful interfaces with powerful functionality.
              </p>
              <p className="text-gray-300">
                My journey in technology has led me to work on diverse projects, from web applications
                to data analysis solutions. I'm constantly learning and adapting to new technologies
                to deliver the best possible solutions.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-primary gap-2 backdrop-blur-sm bg-primary/80 border-primary/20 hover:bg-primary/90 text-white"
                >
                  Get in Touch <FiArrowRight />
                </button>
                <a
                  href="https://drive.google.com/file/d/192Eq-kbQ6xZStK9jiJoSadXeDlp-VKnd/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn gap-2 backdrop-blur-sm bg-secondary/80 border-gray-700 hover:bg-secondary text-white group relative overflow-hidden"
                >
                  <span>Resume</span>
                  <motion.div
                    className="inline-block"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <FiDownload className="group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="backdrop-blur-md bg-secondary/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">Frontend</h4>
                <p className="text-gray-300">React, Next.js, Tailwind CSS</p>
              </div>
              <div className="backdrop-blur-md bg-secondary/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">Backend</h4>
                <p className="text-gray-300">Node.js, Express, MongoDB</p>
              </div>
              <div className="backdrop-blur-md bg-secondary/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">Data Science</h4>
                <p className="text-gray-300">Python, TensorFlow, scikit-learn</p>
              </div>
              <div className="backdrop-blur-md bg-secondary/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">Tools</h4>
                <p className="text-gray-300">Git, Docker, AWS</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
            <p className="text-gray-300 text-lg">Technologies I work with</p>
          </motion.div>
          <motion.div 
            variants={skillsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto"
          >
            {[
              { icon: <SiHtml5 size={20} />, name: "HTML", color: "text-[#e34c26]" },
              { icon: <SiCss3 size={20} />, name: "CSS", color: "text-[#1572b6]" },
              { icon: <SiJavascript size={20} />, name: "JavaScript", color: "text-[#f7df1e]" },
              { icon: <SiTypescript size={20} />, name: "TypeScript", color: "text-[#3178c6]" },
              { icon: <SiReact size={20} />, name: "ReactJS", color: "text-[#61dafb]" },
              { icon: <SiNextdotjs size={20} />, name: "NextJS", color: "text-white" },
              { icon: <SiTailwindcss size={20} />, name: "Tailwind CSS", color: "text-[#06b6d4]" },
              { icon: <SiFramer size={20} />, name: "Framer Motion", color: "text-[#0055ff]" },
              { icon: <SiMongodb size={20} />, name: "MongoDB", color: "text-[#47a248]" },
              { icon: <SiMysql size={20} />, name: "MySQL", color: "text-[#4479a1]" },
              { icon: <SiPostgresql size={20} />, name: "PostgreSQL", color: "text-[#336791]" },
              { icon: <SiPrisma size={20} />, name: "Prisma", color: "text-[#2d3748]" },
              { icon: <SiGit size={20} />, name: "Git", color: "text-[#f05032]" },
              { icon: <SiGithub size={20} />, name: "GitHub", color: "text-white" },
              { icon: <SiNodedotjs size={20} />, name: "NodeJS", color: "text-[#68a063]" },
              { icon: <SiExpress size={20} />, name: "ExpressJS", color: "text-white" },
              { icon: <SiVercel size={20} />, name: "Vercel", color: "text-white" },
              { icon: <SiPostman size={20} />, name: "Postman", color: "text-[#ff6c37]" },
              { icon: <SiOpenjdk size={20} />, name: "Java", color: "text-[#007396]" },
              { icon: <SiLinux size={20} />, name: "Linux", color: "text-[#fcc624]" },
              { icon: <SiPnpm size={20} />, name: "pnpm", color: "text-[#f9ad00]" },
              { icon: <SiZod size={20} />, name: "Zod", color: "text-[#8a4baf]" }
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={skillItemVariants}
                whileHover={skillHoverAnimation}
                className={`flex items-center gap-2 bg-[#171717] ${skill.color} px-3 py-2 rounded-full border border-[#333]`}
              >
                {skill.icon}
                <span className="text-white text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 0.8
                  }
                }}
                className="group backdrop-blur-md bg-secondary/50 rounded-xl border border-gray-700 overflow-hidden hover:bg-secondary/70 transition-all duration-300"
              >
                <div className="relative overflow-hidden px-6 pt-6">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="h-48 w-full object-cover rounded-xl bg-secondary-light/50"
                    whileHover={{ 
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        mass: 0.8
                      }
                    }}
                  />
                  <div className="absolute inset-6 rounded-xl bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <FiGithub size={18} />
                        <span className="text-sm">Code</span>
                      </a>
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <FiExternalLink size={18} />
                        <span className="text-sm">Live</span>
                      </a>
                    </div>
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                    >
                      <FiEye size={16} />
                      <span className="text-sm">View Details</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ProjectModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#090909] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-black to-accent/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-300 text-lg">Let's create something amazing together</p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-xl bg-black/30 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl"
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="from_name" className="block text-sm font-medium text-gray-300">Name</label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="from_name"
                        id="from_name"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-xl
                        transition-all duration-300 group-hover:bg-black/70"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="from_email" className="block text-sm font-medium text-gray-300">Email</label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="from_email"
                        id="from_email"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-xl
                        transition-all duration-300 group-hover:bg-black/70"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-xl
                      transition-all duration-300 group-hover:bg-black/70"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                  <div className="relative group">
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent backdrop-blur-xl
                      transition-all duration-300 resize-none group-hover:bg-black/70"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                </div>

                {submitStatus.message && (
                  <div className={`p-4 rounded-xl ${
                    submitStatus.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-6 py-4 rounded-xl bg-[#1a1a1a] text-white font-medium relative 
                  overflow-hidden border border-white/10 backdrop-blur-xl transition-all duration-300
                  hover:bg-[#222222] shadow-[0_0_15px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="group-hover:translate-x-[-4px] transition-transform duration-300">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://www.linkedin.com/in/sonusk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-black/50 border border-white/10 
                    hover:bg-black/70 transition-all duration-300 group backdrop-blur-xl"
                  >
                    <FiLinkedin className="text-xl text-primary group-hover:text-white transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://github.com/SonuSk584"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-black/50 border border-white/10 
                    hover:bg-black/70 transition-all duration-300 group backdrop-blur-xl"
                  >
                    <FiGithub className="text-xl text-primary group-hover:text-white transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://www.instagram.com/sonusk153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-black/50 border border-white/10 
                    hover:bg-black/70 transition-all duration-300 group backdrop-blur-xl"
                  >
                    <FiInstagram className="text-xl text-primary group-hover:text-white transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">Instagram</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home; 