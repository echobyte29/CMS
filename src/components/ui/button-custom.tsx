import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'subtle' | 'primary' | 'secondary' | 'accent' | 'gradient' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonCustomProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    isLoading = false, 
    leftIcon,
    rightIcon,
    fullWidth = false,
    asLink = false,
    href,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none disabled:select-none";
    
    const variants = {
      default: "bg-background text-foreground border border-border hover:border-border/80 hover:bg-accent/30 shadow-sm",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-primary/30 border border-primary/10",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
      outline: "border border-border bg-transparent hover:bg-accent/30 text-foreground",
      ghost: "bg-transparent hover:bg-accent/30 text-foreground",
      subtle: "bg-accent/20 text-accent-foreground hover:bg-accent/30",
      link: "bg-transparent text-primary underline-offset-4 hover:underline no-underline p-0 h-auto shadow-none",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm shadow-destructive/20",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 border-0",
    };
    
    const sizes = {
      default: "h-10 px-5 py-2 text-sm rounded-lg gap-2",
      sm: "h-9 px-4 py-2 text-xs rounded-md gap-1.5",
      lg: "h-11 px-6 py-2.5 text-base rounded-lg gap-2",
      xl: "h-12 px-7 py-3 text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 rounded-lg p-2",
      "icon-sm": "h-8 w-8 rounded-md p-1.5",
      "icon-lg": "h-12 w-12 rounded-xl p-2.5",
    };

    const content = (
      <>
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </>
    );

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    );

    if (asLink && href) {
      return (
        <a 
          href={href}
          className={buttonClasses}
          {...(props as any)}
        >
          {content}
        </a>
      );
    }

    return (
      <motion.button
        whileHover={variant !== 'link' ? { scale: 1.02 } : {}}
        whileTap={variant !== 'link' ? { scale: 0.98 } : {}}
        className={buttonClasses}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
