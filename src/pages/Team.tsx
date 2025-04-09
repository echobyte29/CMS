import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Users, Star } from 'lucide-react';
import TeamMember from '@/components/TeamMember';

// Nature-themed image URLs
const natureImages = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', // Forest
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80', // Mountains
  'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Blue sky
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80', // Sunset
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Mountain lake
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Green forest
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80', // Beach
  'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', // Waterfall
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', // Canyon
  'https://i.pinimg.com/736x/9e/89/93/9e8993be84dbc765292464d74519534a.jpg', 
];

// Floating particle component
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 40 + 10}px`,
            height: `${Math.random() * 40 + 10}px`,
            animationDuration: `${Math.random() * 20 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

const teamData = {
  faculty: [
    {
      name: "Dr. Munniraju Vadlamudi",
      role: "Faculty Advisor",
      image: natureImages[0],
      linkedIn: "https://www.linkedin.com/in/munniraju-vadlamudi/",
    },
  ],
  leadership: [
    {
      name: "U.Senthil Kumar",
      role: "Web Master",
      image: natureImages[1],
      linkedIn: "https://www.linkedin.com/in/sentilkumar/",
    },
    {
      name: "Sameer Farhad",
      role: "Mentor",
      image: natureImages[2],
      linkedIn: "https://www.linkedin.com/in/sameerfarhad/",
    },
  ],
  developers: [
    {
      name: "Shreeteja Mutukundu",
      role: "Web Developer",
      image: natureImages[9],
      linkedIn: "https://www.linkedin.com/in/shreeteja172/",
      isFeatured: true, // Special flag for enhanced styling
    },
    {
      name: "Gowtham",
      role: "Web Developer",
      image: natureImages[3],
      linkedIn: "https://www.linkedin.com/in/gowtham/",
    },
  ],
  contributors: [
    {
      name: "Harsha Vardhan Reddy",
      role: "Contributor",
      image: natureImages[4],
      linkedIn: "https://www.linkedin.com/in/harshavardhanreddy/",
    },
    {
      name: "Hema Mayukha Vasireddy",
      role: "Contributor",
      image: natureImages[5],
      linkedIn: "https://www.linkedin.com/in/hemamayukhavasireddy/",
    },
  ],
  explorers: [
    {
      name: "Varshitha Ravuri",
      role: "Explorer",
      image: natureImages[7],
      linkedIn: "https://www.linkedin.com/in/varshitha-ravuri/",
    },
    {
      name: "Mani Mahalakshmi",
      role: "Explorer",
      image: natureImages[8],
      linkedIn: "https://www.linkedin.com/in/mani-mahalakshmi/",
    },
    {
      name: "Gandikota Babitha",
      role: "Explorer",
      image: natureImages[0],
      linkedIn: "https://www.linkedin.com/in/gandikota-babitha/",
    },
  ],
};

// Custom featured team member component with enhanced styling
const FeaturedTeamMember = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      <div className="relative p-1 bg-white dark:bg-gray-900 rounded-xl">
        <TeamMember
          name={member.name}
          role={member.role}
          image={member.image}
          linkedIn={member.linkedIn}
          delay={0}
        />
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1 rounded-full">
          <Star className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
};

const Team = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add floating particles animation to CSS
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
          background-size: 400% 400%;
        }
      </style>`
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Floating particles */}
      <Particles />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
        >
          Meet Our Team
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Our team of dedicated members working together to create innovative solutions
          and foster a community of learning and excellence.
        </motion.p>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full"></div>
      </section>

      {/* Faculty Section */}
      <section className="container mx-auto px-4 py-8 backdrop-blur-sm bg-white/30 dark:bg-gray-800/20 rounded-3xl my-8 shadow-lg relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
        >
          <div className="w-8 h-1 bg-blue-500 mr-3"></div>
          Faculty Advisor
        </motion.h2>
        
        <div className="flex justify-center">
          {teamData.faculty.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedIn={member.linkedIn}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container mx-auto px-4 py-8 bg-white/50 dark:bg-gray-800/30 rounded-3xl my-8 shadow-lg backdrop-blur-sm relative z-10">
        <motion.div className="flex items-center mb-8">
          <div className="w-8 h-1 bg-purple-500 mr-3"></div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
          >
            Leadership
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-purple-500/50 to-transparent ml-4"
          />
        </motion.div>
        
        <div className="flex flex-wrap justify-center">
          {teamData.leadership.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedIn={member.linkedIn}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* Web Developers Section */}
      <section className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl my-8 shadow-lg backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 relative z-10">
        <motion.div className="flex items-center mb-8">
          <div className="w-8 h-1 bg-blue-600 mr-3"></div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <Code className="h-6 w-6 text-blue-600" />
            Web Developers
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-blue-500/50 to-transparent ml-4"
          />
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {teamData.developers.map((member, index) => (
            member.isFeatured ? (
              <FeaturedTeamMember key={member.name} member={member} />
            ) : (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TeamMember
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  linkedIn={member.linkedIn}
                  delay={index}
                />
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Contributors Section */}
      <section className="container mx-auto px-4 py-8 bg-white/50 dark:bg-gray-800/30 rounded-3xl my-8 shadow-lg backdrop-blur-sm relative z-10">
        <motion.div className="flex items-center mb-8">
          <div className="w-8 h-1 bg-green-500 mr-3"></div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <Users className="h-6 w-6 text-green-600" />
            Contributors
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-green-500/50 to-transparent ml-4"
          />
        </motion.div>
        
        <div className="flex flex-wrap justify-center">
          {teamData.contributors.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedIn={member.linkedIn}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* Explorers Section */}
      <section className="container mx-auto px-4 py-8 bg-white/50 dark:bg-gray-800/30 rounded-3xl my-8 shadow-lg backdrop-blur-sm relative z-10">
        <motion.div className="flex items-center mb-8">
          <div className="w-8 h-1 bg-yellow-500 mr-3"></div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
          >
            <Star className="h-6 w-6 text-yellow-500" />
            Explorers
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-yellow-500/50 to-transparent ml-4"
          />
        </motion.div>
        
        <div className="flex flex-wrap justify-center">
          {teamData.explorers.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedIn={member.linkedIn}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="container mx-auto px-4 py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden group"
        >
          {/* Background animated pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold mb-4 relative">Want to join our team?</h2>
          <p className="mb-6 max-w-lg mx-auto relative">
            We're always looking for talented and passionate individuals to join our community. 
            If you're interested in becoming part of the ACM family, reach out to us!
          </p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact" 
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:bg-blue-50 transition-all relative"
          >
            Get in Touch
            <ExternalLink size={18} className="ml-2" />
            <span className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></span>
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;