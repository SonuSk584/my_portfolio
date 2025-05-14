import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone } from 'react-icons/fi';

const Contact = () => {
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
        <h1 className="text-4xl font-bold text-primary mb-4">Get In Touch</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
          <p className="text-gray-600">
            Feel free to contact me through any of the following channels. I'll get back to you as soon as possible.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Email</h4>
                <a href="mailto:sonukumart74@gmail.com" className="text-primary hover:underline">
                  sonukumart74@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiPhone size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Phone</h4>
                <a href="tel:+916364183638" className="text-primary hover:underline">
                  +91 6364183638
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiLinkedin size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">LinkedIn</h4>
                <a 
                  href="https://linkedin.com/in/sonu-k-thakur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Sonu k. thakur
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiGithub size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">GitHub</h4>
                <a 
                  href="https://github.com/Sonusk548" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Sonusk548
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h3>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span>Send Message</span>
              <FiSend />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact; 