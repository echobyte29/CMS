import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-600/20">
          <span className="text-white text-sm font-bold">ACM</span>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-purple-400 dark:bg-purple-500 animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-blue-300 dark:bg-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default Logo;
