// @ts-nocheck
import React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:border-slate-700/50 transition-colors duration-300"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border border-gray-100 text-gray-700 shadow-lg dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
          <DropdownMenuItem 
            onClick={() => setTheme("light")} 
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:bg-slate-700 dark:focus:text-white"
          >
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")} 
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:bg-slate-700 dark:focus:text-white"
          >
            <Moon className="h-4 w-4 text-blue-500" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")} 
            className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:bg-slate-700 dark:focus:text-white"
          >
            <Laptop className="h-4 w-4 text-gray-500 dark:text-slate-400" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeToggle;