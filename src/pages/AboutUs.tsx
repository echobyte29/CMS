import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHub, Linkedin, ExternalLink, Star, Code, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  bio: string;
  badges?: string[];
}

const contributors: TeamMember[] = [
  {
    name: 'Gowtham',
    role: 'Web Developer',
    image: 'https://ui-avatars.com/api/?name=Gowtham&background=0D8ABC&color=fff',
    github: 'https://github.com/gowtham',
    linkedin: 'https://linkedin.com/in/gowtham',
    bio: 'Passionate web developer who loves creating seamless user experiences with modern technology stack.',
    badges: ['React', 'TypeScript', 'Node.js']
  },
  {
    name: 'Harsha Vardhan Reddy',
    role: 'Contributor',
    image: 'https://ui-avatars.com/api/?name=Harsha+Vardhan+Reddy&background=9333EA&color=fff',
    github: 'https://github.com/harsha',
    linkedin: 'https://linkedin.com/in/harsha',
    bio: 'Technology enthusiast with a passion for open-source contributions and community building.',
    badges: ['Python', 'JavaScript', 'Cloud']
  },
  {
    name: 'Hema Mayukha Vasireddy',
    role: 'Contributor',
    image: 'https://ui-avatars.com/api/?name=Hema+Mayukha+Vasireddy&background=F97316&color=fff',
    github: 'https://github.com/hema',
    linkedin: 'https://linkedin.com/in/hema',
    bio: 'Creative thinker and problem solver with expertise in software development and project management.',
    badges: ['Java', 'Spring', 'AWS']
  },
  {
    name: 'Shreeteja Mutukundu',
    role: 'Web Developer',
    image: 'https://ui-avatars.com/api/?name=Shreeteja+Mutukundu&background=3B82F6&color=fff',
    github: 'https://github.com/shreeteja',
    linkedin: 'https://linkedin.com/in/shreeteja',
    bio: 'Full-stack developer and UI/UX enthusiast focused on creating beautiful, functional web applications.',
    badges: ['React', 'Next.js', 'TailwindCSS']
  }
];

const explorers: TeamMember[] = [
  {
    name: 'Varshitha Ravuri',
    role: 'Explorer',
    image: 'https://ui-avatars.com/api/?name=Varshitha+Ravuri&background=10B981&color=fff',
    github: 'https://github.com/varshitha',
    linkedin: 'https://linkedin.com/in/varshitha',
    bio: 'Exploring the world of technology with curiosity and determination.',
    badges: ['React', 'Machine Learning']
  },
  {
    name: 'Mani Mahalakshmi',
    role: 'Explorer',
    image: 'https://ui-avatars.com/api/?name=Mani+Mahalakshmi&background=EC4899&color=fff',
    github: 'https://github.com/mani',
    linkedin: 'https://linkedin.com/in/mani',
    bio: 'Passionate about learning new technologies and contributing to impactful projects.',
    badges: ['Data Science', 'Web Development']
  },
  {
    name: 'Gandikota Babitha',
    role: 'Explorer',
    image: 'https://ui-avatars.com/api/?name=Gandikota+Babitha&background=EAB308&color=fff',
    github: 'https://github.com/babitha',
    linkedin: 'https://linkedin.com/in/babitha',
    bio: 'Enthusiastic learner with a keen interest in software development and project management.',
    badges: ['UI/UX', 'Frontend']
  }
];

const faculty: TeamMember[] = [
  {
    name: 'Munniraju Vadlamudi',
    role: 'Faculty Advisor',
    image: 'https://ui-avatars.com/api/?name=Munniraju+Vadlamudi&background=6366F1&color=fff',
    linkedin: 'https://linkedin.com/in/munniraju',
    bio: 'Experienced educator and mentor with a passion for guiding students in their technical journey.',
    badges: ['Computer Science', 'Research', 'Mentorship']
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/50 dark:bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/3" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-6">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30 rounded-full">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Our Team
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-300"
            >
              Meet the Team Behind <br />
              <span className="text-blue-600 dark:text-blue-400">ACM Student Chapter</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-12"
            >
              We're a diverse group of students and faculty dedicated to fostering a vibrant 
              computing community through innovation, learning, and collaboration.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="contributors" className="w-full">
            <div className="text-center mb-12">
              <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-100 p-1 text-zinc-500 dark:bg-zinc-800/90 dark:text-zinc-400">
                <TabsTrigger 
                  value="contributors" 
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all 
                  data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm 
                  dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Contributors
                </TabsTrigger>
                <TabsTrigger 
                  value="explorers"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all 
                  data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm 
                  dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Explorers
                </TabsTrigger>
                <TabsTrigger 
                  value="faculty"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all 
                  data-[state=active]:bg-white data-[state=active]:text-zinc-950 data-[state=active]:shadow-sm 
                  dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Faculty
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="contributors" className="mt-0">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {contributors.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="explorers" className="mt-0">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {explorers.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="faculty" className="mt-0">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="flex justify-center"
              >
                <div className="max-w-md">
                  {faculty.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <Badge variant="outline" className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30 rounded-full">
                  <Award className="h-3.5 w-3.5 mr-1.5" />
                  Our Mission
                </Badge>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-300">
                Fostering Innovation and <br />Building a Tech Community
              </h2>
              
              <p className="text-gray-600 dark:text-slate-400 mb-8 text-lg">
                Our ACM Student Chapter aims to create a vibrant community of tech enthusiasts 
                dedicated to advancing computing as a science and profession. We provide a platform 
                for students to learn, collaborate, and grow in their technological journey.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300">Organizing workshops, hackathons, and tech talks</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300">Building a supportive network for student developers</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300">Connecting students with industry professionals</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300">Promoting research and innovation in computing</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-500/30 dark:to-purple-500/30 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
              {/* Floating shapes */}
              <div className="absolute top-1/4 -right-16 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 -left-16 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <motion.div variants={itemVariants} className="group">
      <Card className="overflow-hidden border-0 bg-white shadow-xl dark:bg-slate-800/90 dark:shadow-slate-700/[0.1] hover:shadow-2xl transition-all duration-300 h-full">
        <div className="relative h-72 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          
          {/* Profile image with animated gradient border */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
              <Avatar className="h-36 w-36 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Social links */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-white shadow-md dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300">
                <GitHub className="h-5 w-5 text-gray-700 dark:text-slate-300" />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-white shadow-md dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-gray-700 dark:text-slate-300" />
              </a>
            )}
          </div>
        </div>
        
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
          
          <p className="text-gray-600 dark:text-slate-400 mb-4 text-sm">{member.bio}</p>
          
          {member.badges && member.badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {member.badges.map((badge, idx) => (
                <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AboutUs;