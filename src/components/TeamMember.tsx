import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedIn?: string;
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  image, 
  linkedIn, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="flex flex-col items-center p-4"
    >
      <div className="relative group">
        <div className="overflow-hidden rounded-xl mb-4 bg-gray-100">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={image}
            alt={name}
            className="w-48 h-48 object-cover object-center"
          />
        </div>
        
        {linkedIn && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute bottom-4 right-0 left-0 flex justify-center"
          >
            <a 
              href={linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white py-1 px-3 rounded-full flex items-center text-sm font-medium shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin size={16} className="mr-1" />
              Connect
            </a>
          </motion.div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
    </motion.div>
  );
};

export default TeamMember; 