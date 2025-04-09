import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, Home, Calendar, Users, ArrowRight, Github, Twitter, Linkedin, 
  Facebook, Instagram, Code, ChevronRight, ExternalLink, Info
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const socialLinks = [
    { name: 'Twitter', icon: <Twitter className="h-4 w-4" />, href: '#', color: 'hover:bg-blue-500' },
    { name: 'Facebook', icon: <Facebook className="h-4 w-4" />, href: '#', color: 'hover:bg-blue-600' },
    { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" />, href: '#', color: 'hover:bg-blue-700' },
    { name: 'Instagram', icon: <Instagram className="h-4 w-4" />, href: '#', color: 'hover:bg-pink-600' },
    { name: 'GitHub', icon: <Github className="h-4 w-4" />, href: '#', color: 'hover:bg-slate-700' }
  ];
  
  const quickLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Membership', path: '/membership', icon: <Users className="w-4 h-4" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'About Us', path: '/team', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];
  
  const isAuthPage = ['/login', '/signup', '/admin/login'].includes(location.pathname);
  
  return (
    <footer className="bg-white border-t border-gray-100 dark:bg-slate-950 dark:border-slate-800/50">
      {/* Footer top curved border */}
      <div className="w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 40" className="w-full h-10 fill-white dark:fill-slate-950 translate-y-1">
          <path d="M0,0L60,5.3C120,11,240,21,360,24C480,27,600,21,720,16C840,11,960,5,1080,8C1200,11,1320,21,1380,26.7L1440,32L1440,40L1380,40C1320,40,1200,40,1080,40C960,40,840,40,720,40C600,40,480,40,360,40C240,40,120,40,60,40L0,40Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand and description */}
          <motion.div variants={item} className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-5">
              <Logo className="h-12 w-12" />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">ACM Chapter</span>
            </div>
            <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-md">
              Empowering the next generation of computing professionals through education, networking, and career development opportunities.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 ${social.color} transition-colors duration-300`}
                  aria-label={`${social.name} profile`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={item} className="col-span-1">
            <h3 className="font-semibold text-lg mb-5 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center group transition-colors duration-300 w-full"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white mr-3 transition-colors duration-300 dark:bg-slate-800 dark:text-blue-400">
                        {link.icon}
                      </span>
                      {link.name}
                      <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item} className="col-span-1">
            <h3 className="font-semibold text-lg mb-5 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: 'ACM Digital Library', href: '/resources/library' },
                { name: 'Learning Center', href: '/resources/learning' },
                { name: 'Career Resources', href: '/resources/careers' },
                { name: 'Research Papers', href: '/resources/research' },
                { name: 'Open Source Projects', href: '/resources/projects' },
              ].map((resource) => (
                <li key={resource.name}>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <button
                      onClick={() => handleNavigation(resource.href)}
                      className="text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center group transition-colors duration-300 w-full"
                    >
                      <ExternalLink className="mr-2 h-3 w-3 text-gray-500 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                      {resource.name}
                    </button>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item} className="col-span-1">
            <h3 className="font-semibold text-lg mb-5 text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500"
                />
                <motion.button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 p-1.5 rounded-lg hover:bg-blue-500/10 transition-colors duration-300 dark:text-blue-400 dark:hover:bg-blue-500/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-500 dark:text-slate-500">
            © {currentYear} ACM Student Chapter
          </p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
            <button 
              onClick={() => handleNavigation('/privacy-policy')}
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNavigation('/terms-of-service')}
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNavigation('/cookie-policy')}
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              Cookie Policy
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
