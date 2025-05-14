import React from 'react';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sonusk',
      icon: <FiLinkedin />,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/SonuSk584',
      icon: <FiGithub />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/sonusk153/',
      icon: <FiInstagram />,
    },
  ];

  return (
    <footer className="bg-[#090909] text-gray-100 border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-6 flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:w-1/3 self-center">
            <Link to="/" className="text-xl font-bold mb-2 inline-block text-white">
              It's Sonu here
            </Link>
            <p className="text-gray-300 text-sm max-w-md mt-2">
              Crafting innovative digital solutions that elevate your business to new heights.
            </p>
          </div>
          <div className="flex items-center justify-center md:w-1/3 self-center">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary text-xl transition-all duration-200 hover:scale-110 transform mx-3"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="md:w-1/3" /> {/* Empty div for balance */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-4 text-center">
          <div className="text-gray-400 text-xs">
            © {currentYear} Sonu Kumar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;