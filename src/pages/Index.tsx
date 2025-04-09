// @ts-nocheck
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import EventCard, { EventType } from '@/components/EventCard';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Calendar, Award, BookOpen, Users, Briefcase, 
  Code, Trophy, Network, Sparkles, ArrowUpRight, ChevronRight 
} from 'lucide-react';

// Sample data for upcoming events
const upcomingEvents: EventType[] = [
  {
    id: 1,
    title: 'Introduction to Machine Learning Workshop',
    description: 'Learn the fundamentals of machine learning algorithms and applications in this hands-on workshop.',
    date: 'Oct, 15 2023',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Science Building, Room 101',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&h=400',
    category: 'Workshop',
    isUpcoming: true
  },
  {
    id: 2,
    title: 'Web Development Hackathon',
    description: 'Join teams to build innovative web applications in this 24-hour coding challenge.',
    date: 'Nov 5, 2023',
    time: '9:00 AM - 9:00 AM (next day)',
    location: 'Student Union, Great Hall',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400',
    category: 'Hackathon',
    isUpcoming: true
  },
  {
    id: 3,
    title: 'Industry Talk: The Future of AI Ethics',
    description: 'Discussing the ethical implications of AI development with industry experts.',
    date: 'Nov 20, 2023',
    time: '4:00 PM - 6:00 PM',
    location: 'Virtual Event',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=400',
    category: 'Talk',
    isUpcoming: true
  }
];

// Features data
const features = [
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Community',
    description: 'Connect with like-minded peers, industry professionals, and academic leaders in computing.'
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Learning',
    description: 'Access exclusive workshops, seminars, and learning resources to enhance your skills.'
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: 'Career Growth',
    description: 'Get career guidance, internship opportunities, and networking events with top companies.'
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: 'Technical Projects',
    description: 'Work on real-world projects and gain hands-on experience in various technologies.'
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: 'Competitions',
    description: 'Participate in hackathons, coding contests, and other competitive events.'
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: 'Global Network',
    description: 'Join a worldwide network of ACM members and access international opportunities.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute top-3/4 left-0 w-[600px] h-[600px] bg-purple-100/50 dark:bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/3" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Why Join Us</span>
              <span className="h-px w-8 bg-blue-500"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-300">
              Why Join ACM Student Chapter?
            </h2>
            <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover the benefits of being part of our vibrant community of computing enthusiasts.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative z-10 h-full p-6 rounded-2xl bg-gradient-to-br from-white/90 to-white/80 border border-gray-100 shadow-md dark:shadow-none dark:from-slate-800/90 dark:to-slate-900/90 dark:border-slate-700/50 backdrop-blur-sm overflow-hidden group-hover:border-blue-300 dark:group-hover:border-blue-500/50 transition-colors duration-300">
                  {/* Feature content */}
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 dark:text-slate-400 dark:group-hover:text-slate-300 transition-colors duration-300 flex-grow">{feature.description}</p>
                    
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Link to="/membership" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                        Learn more <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-blue-500"></span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Upcoming</span>
                <span className="h-px w-8 bg-blue-500"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-300">Upcoming Events</h2>
              <p className="text-gray-600 dark:text-slate-400 max-w-2xl">
                Don't miss our upcoming events designed to enhance your knowledge and connect you with industry professionals.
              </p>
            </div>
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium mt-6 md:mt-0 hover:bg-blue-100 transition-colors duration-300 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 dark:hover:bg-blue-500/20 group"
            >
              <span>View All Events</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/50 backdrop-blur-sm group-hover:border-blue-300 dark:group-hover:border-blue-500/30 transition-all duration-300">
                  <EventCard 
                    event={event} 
                    className="transition-all duration-300 h-full"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-600/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/50 dark:bg-purple-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white opacity-[0.03] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-white to-blue-50/80 border border-gray-100 shadow-xl dark:from-slate-800/90 dark:to-slate-900/90 dark:border-slate-700/50 dark:shadow-2xl p-10 md:p-16 backdrop-blur-sm relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-16 -mr-16">
                <div className="w-64 h-64 rounded-full bg-blue-100/80 dark:bg-blue-500/10 blur-3xl"></div>
              </div>
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16">
                <div className="w-64 h-64 rounded-full bg-purple-100/80 dark:bg-purple-500/10 blur-3xl"></div>
              </div>
              
              <div className="text-center relative">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 dark:bg-blue-500/20 dark:text-blue-400">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Join Our Community</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Ready to advance your career in computing?
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-slate-300 mb-10 max-w-xl mx-auto">
                  Become a member of our ACM Student Chapter today and unlock a world of opportunities in computing and technology.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    Become a Member
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-white text-gray-800 font-medium border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-300 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                  >
                    Learn More
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
