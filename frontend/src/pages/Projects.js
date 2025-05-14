import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo, FiX, FiEye } from 'react-icons/fi';
import { projects } from '../data/projects';

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
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

const ProjectCard = ({ project, index, onViewDetails }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-white/5 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 min-h-[60px] transform group-hover:translate-y-[-4px] transition-transform duration-300">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/80 border border-primary/20 group-hover:text-primary group-hover:border-primary/40 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100/10 text-gray-400 group-hover:bg-gray-100/20 transition-all duration-300">
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
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            >
              <FiGithub size={18} />
              <span className="text-sm">Code</span>
            </a>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            >
              <FiExternalLink size={18} />
              <span className="text-sm">Live</span>
            </a>
          </div>
          <button
            onClick={() => onViewDetails(project)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
          >
            <FiEye size={16} />
            <span className="text-sm">View Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      className="py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">My Projects</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Here's a collection of projects I've worked on, showcasing my skills in web development and data science.
          <span className="block mt-2 text-sm text-gray-500 italic">Click the info icon on a project to see more details.</span>
        </p>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.div>
  );
};

export default Projects; 