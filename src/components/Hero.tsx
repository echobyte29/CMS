import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Users, Calendar, Award, Building2 } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { icon: <Users className="text-blue-500" />, label: "Active Members", value: "250+", 
      description: "Students & professionals" },
    { icon: <Calendar className="text-purple-500" />, label: "Annual Events", value: "20+", 
      description: "Workshops & hackathons" },
    { icon: <Award className="text-amber-500" />, label: "Years Active", value: "12", 
      description: "Established presence" },
    { icon: <Building2 className="text-emerald-500" />, label: "Partner Companies", value: "35+", 
      description: "Industry connections" }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-[100vh] flex flex-col items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-blue-300 dark:opacity-30 dark:bg-blue-600"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 bg-purple-300 dark:opacity-20 dark:bg-purple-600"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: '40%', right: '10%' }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 bg-teal-300 dark:opacity-20 dark:bg-teal-500"
          animate={{
            x: [0, 70, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ bottom: '10%', left: '30%' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 bg-grid-white opacity-[0.03] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundPosition: `${mousePosition.x * 0.02}px ${mousePosition.y * 0.02}px`,
          transition: 'background-position 0.1s ease-out'
        }}
      />

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 w-full">
        <div className="flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100 backdrop-blur-sm mb-8 dark:bg-slate-800/50 dark:border-slate-700/50"
          >
            <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-slate-200">Welcome to ACM Student Chapter</span>
          </motion.div>

          {/* Main title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-white max-w-5xl"
          >
            <span className="inline-block">Empowering</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 inline-block">
              Future Innovators
            </span>{' '}
            <span className="inline-block">in Computing</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 dark:text-slate-300 text-center max-w-3xl mx-auto"
          >
            Join our vibrant community of talented students, professionals, and researchers 
            passionate about advancing computing as a science and profession.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => navigate('/membership')} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              Become a Member
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/events')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-gray-800 font-medium border border-gray-200 flex items-center justify-center gap-2 dark:bg-slate-800/50 dark:text-white dark:border-slate-700/50"
            >
              Explore Events
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 to-white/80 dark:from-slate-800/80 dark:to-slate-900/80 border border-gray-100 dark:border-slate-700/50 backdrop-blur-md p-6 group shadow-md dark:shadow-none"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 dark:bg-slate-800 dark:border-slate-700/50">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-slate-400">{stat.label}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-500 mt-1">{stat.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center dark:border-slate-600"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 dark:bg-blue-400"
          />
        </motion.div>
        <span className="text-xs text-gray-500 mt-2 dark:text-slate-500">Scroll Down</span>
      </motion.div>
    </div>
  );
};

export default Hero;
