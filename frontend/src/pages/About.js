import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

const About = () => {
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
        <h1 className="text-4xl font-bold text-primary mb-4">About Me</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Full Stack Developer & Data Science Learner passionate about creating impactful solutions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            src="/avatar.png"
            alt="Profile"
            className="w-full max-w-md mx-auto rounded-xl shadow-lg"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800">My Journey</h3>
          <p className="text-gray-600">
            I am an enthusiastic and detail-oriented aspiring Software Engineer with hands-on experience in web development and
            data science through personal projects and self-study. I have a strong foundation in front-end and back-end technologies
            with a passion for creating efficient, user-friendly applications.
          </p>
          <p className="text-gray-600">
            As a quick learner committed to continuous skill development and growth in the tech industry, I'm constantly exploring
            new technologies and building projects that solve real-world problems.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Education</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-gray-800">Bachelor of Engineering in Computer Science Engineering</h4>
                <p className="text-gray-600">Nitte Meenakshi Institute of Technology, Bengaluru</p>
                <p className="text-gray-500">2022 - 2026</p>
                <p className="text-gray-600">CGPA: 8.9/10</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-gray-800">NEB, Class XII</h4>
                <p className="text-gray-600">Saint Xaviers, Kathmandu, Nepal</p>
                <p className="text-gray-500">2019 - 2021</p>
                <p className="text-gray-600">Percentage: 90%</p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-gray-800">NEB, Class X</h4>
                <p className="text-gray-600">Laligurans Academy, Sarlahi, Nepal</p>
                <p className="text-gray-500">2007 - 2019</p>
                <p className="text-gray-600">Percentage: 98%</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Internship & Training</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-gray-800">Machine Learning using Python</h4>
                <p className="text-gray-600">Aquazmen Pvt Ltd, Bengaluru</p>
                <p className="text-gray-500">March 2023 - April 2023</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600 text-sm">
                  <li>Developed and deployed machine learning models, including linear regression, decision trees, and random forests, to solve real-world problems.</li>
                  <li>Applied feature engineering techniques and optimized models for better performance in production environments.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <a
              href="https://drive.google.com/file/d/192Eq-kbQ6xZStK9jiJoSadXeDlp-VKnd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2"
            >
              <span>Download Resume</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <FiDownload />
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 bg-gray-50 py-16 px-4 rounded-xl">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-12">My Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'Frontend', skills: ['React.js', 'JavaScript', 'HTML/CSS', 'Responsive Design'] },
            { name: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB'] },
            { name: 'Programming', skills: ['Python', 'Java', 'C/C++', 'JavaScript'] },
            { name: 'Data Science', skills: ['Scikit-learn', 'NumPy', 'Pandas', 'Machine Learning'] }
          ].map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h4 className="font-medium text-primary mb-3">{category.name}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {category.skills.map((skill, j) => (
                  <li key={j} className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About; 