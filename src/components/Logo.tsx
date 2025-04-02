
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center space-x-2 font-bold", className)}>
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground text-sm">ACM</span>
      </div>
      <span className="text-lg">ACM Chapter</span>
    </div>
  );
};

export default Logo;
