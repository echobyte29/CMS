import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, ChevronDown, Home, Users, Calendar, 
  BookOpen, LogIn, LogOut, User, Info
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'Membership', href: '/membership', icon: <Users className="h-5 w-5" /> },
  { name: 'Events', href: '/events', icon: <Calendar className="h-5 w-5" /> },
  { name: 'About Us', href: '/team', icon: <Info className="h-5 w-5" /> },
];

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Make the navbar appear solid on auth pages
  const isAuthPage = ['/login', '/signup', '/admin/login'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isAuthPage
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-800/50' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <Logo className="h-10 w-10 text-blue-500" />
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">ACM Chapter</span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-1"
        >
          <ul className="flex space-x-1 mr-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              
              return (
                <motion.li key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-300 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-600/20 dark:text-blue-400 dark:border-blue-500/30' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 text-sm font-medium dark:bg-blue-600/20 dark:text-blue-400 dark:border-blue-500/30">
                  <User className="h-4 w-4 mr-2" />
                  <span>My Account</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                <motion.div 
                  className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl border border-gray-100 dark:bg-slate-800 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  initial={false}
                  variants={variants}
                  style={{ translateY: '-10px' }}
                >
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-100 dark:border-slate-700 my-1"></div>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center dark:text-red-400 dark:hover:bg-slate-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-lg bg-transparent border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors duration-300 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <LogIn className="h-4 w-4 inline-block mr-1 -mt-px" />
                    Login
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300"
                  >
                    Join Now
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </motion.nav>
        
        {/* Mobile Menu Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden flex items-center"
        >
          <ThemeToggle className="mr-2" />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 dark:bg-slate-900/95 dark:border-slate-800"
          >
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className={`block px-4 py-3 rounded-lg font-medium flex items-center transition-colors duration-300 ${
                          isActive 
                            ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-600/20 dark:text-blue-400 dark:border-blue-500/30' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <span className="mr-3">{link.icon}</span>
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              <div className="border-t border-gray-100 dark:border-slate-800 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-gray-100 font-medium flex items-center dark:text-red-400 dark:hover:bg-slate-800"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to="/login" 
                      className="text-center px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors duration-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
