import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

// Form Components
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, formData: Record<string, any>) => void;
  className?: string;
}

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  valid?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
  containerClassName?: string;
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  touched?: boolean;
  valid?: boolean;
  helperText?: string;
  showCount?: boolean;
  containerClassName?: string;
}

interface FormFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: 'error' | 'success' | 'info';
  className?: string;
}

interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

// Enhanced Form Component
export function EnhancedForm({ children, onSubmit, className, ...props }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e, formData);
    }
  }, [onSubmit, formData]);

  return (
    <form className={cn("space-y-6", className)} onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}

// Form Field Component
export function FormField({ children, className, ...props }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

// Form Label Component
export function FormLabel({ children, required, className, ...props }: FormLabelProps) {
  return (
    <label 
      className={cn(
        "text-sm font-medium leading-none mb-2 block text-foreground",
        className
      )} 
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

// Form Input Component
export function FormInput({
  error,
  touched,
  valid,
  helperText,
  leftIcon,
  rightIcon,
  onClear,
  showClear = false,
  containerClassName,
  className,
  onChange,
  ...props
}: FormInputProps) {
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const isInvalid = touched && error;
  const isValid = touched && valid && !error;

  return (
    <div className={cn("space-y-1", containerClassName)}>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        
        <input
          className={cn(
            "w-full px-4 py-2.5 border rounded-lg bg-background transition-colors duration-200",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-2",
            leftIcon && "pl-10",
            (rightIcon || (showClear && props.value)) && "pr-10",
            isInvalid 
              ? "border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-900/30" 
              : isValid 
                ? "border-green-300 focus:border-green-500 focus:ring-green-200 dark:border-green-800 dark:focus:border-green-700 dark:focus:ring-green-900/30" 
                : "border-input focus:border-primary focus:ring-primary/20",
            className
          )}
          onChange={handleChange}
          {...props}
        />
        
        {isInvalid && !rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
        
        {isValid && !rightIcon && !showClear && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        
        {showClear && props.value && !rightIcon && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {(isInvalid || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p 
              className={cn(
                "text-xs",
                isInvalid ? "text-red-500 dark:text-red-400" : "text-muted-foreground"
              )}
            >
              {isInvalid ? error : helperText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Form Textarea Component
export function FormTextarea({
  error,
  touched,
  valid,
  helperText,
  showCount = false,
  maxLength,
  containerClassName,
  className,
  value,
  onChange,
  ...props
}: FormTextareaProps) {
  const isInvalid = touched && error;
  const isValid = touched && valid && !error;
  const currentLength = typeof value === 'string' ? value.length : 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={cn("space-y-1", containerClassName)}>
      <div className="relative">
        <textarea
          className={cn(
            "w-full px-4 py-3 border rounded-lg bg-background transition-colors duration-200",
            "min-h-[120px] placeholder:text-muted-foreground focus:outline-none focus:ring-2",
            isInvalid 
              ? "border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-800 dark:focus:border-red-700 dark:focus:ring-red-900/30" 
              : isValid 
                ? "border-green-300 focus:border-green-500 focus:ring-green-200 dark:border-green-800 dark:focus:border-green-700 dark:focus:ring-green-900/30" 
                : "border-input focus:border-primary focus:ring-primary/20",
            className
          )}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <AnimatePresence mode="wait">
          {(isInvalid || helperText) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <p 
                className={cn(
                  "text-xs",
                  isInvalid ? "text-red-500 dark:text-red-400" : "text-muted-foreground"
                )}
              >
                {isInvalid ? error : helperText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {showCount && maxLength && (
          <p 
            className={cn(
              "text-xs text-muted-foreground ml-auto",
              currentLength > maxLength * 0.8 && currentLength < maxLength ? "text-amber-500" : "",
              currentLength >= maxLength ? "text-red-500" : ""
            )}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

// Form Feedback Component
export function FormFeedback({ children, type = 'info', className, ...props }: FormFeedbackProps) {
  const iconMap = {
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const styleMap = {
    error: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900/50",
    success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-900/50",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900/50",
  };

  return (
    <div 
      className={cn(
        "px-4 py-3 border rounded-lg flex items-start gap-2.5",
        styleMap[type],
        className
      )}
      {...props}
    >
      <span className="flex-shrink-0 mt-0.5">{iconMap[type]}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

// Form Submit Button Component
export function FormSubmitButton({
  children,
  isLoading = false,
  loadingText = "Submitting...",
  className,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className={cn(
        "flex justify-center items-center px-5 py-2.5 rounded-lg font-medium",
        "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        "disabled:opacity-70 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
} 