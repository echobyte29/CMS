import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

interface EnhancedTooltipContentProps 
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  variant?: 'default' | 'info' | 'error' | 'success' | 'warning'
  size?: 'default' | 'sm' | 'lg'
  showArrow?: boolean
  delayDuration?: number
  isAnimated?: boolean
}

const tooltipVariants = {
  initial: { 
    opacity: 0,
    scale: 0.95,
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

const variantStyles = {
  default: "bg-popover text-popover-foreground border-border",
  info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-800/50",
  error: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/40 dark:text-red-100 dark:border-red-800/50",
  success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/40 dark:text-green-100 dark:border-green-800/50",
  warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-800/50",
};

const sizeStyles = {
  default: "px-3 py-1.5 text-sm",
  sm: "px-2 py-1 text-xs",
  lg: "px-4 py-2 text-base",
};

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * AccessibleTooltip - A more accessible tooltip component with improved keyboard support
 */
interface AccessibleTooltipProps {
  /**
   * The content to show in the tooltip
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;
  /**
   * The delay before showing the tooltip in milliseconds
   * @default 300
   */
  delayDuration?: number;
  /**
   * The side to show the tooltip on
   * @default "top"
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Additional CSS classes for the tooltip content
   */
  contentClassName?: string;
  /**
   * Whether to make the tooltip content interactive
   * @default false
   */
  interactive?: boolean;
}

export function AccessibleTooltip({
  content,
  children,
  delayDuration = 300,
  side = "top",
  contentClassName,
  interactive = false,
}: AccessibleTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  // Close the tooltip on blur if it's not interactive
  const handleBlur = React.useCallback(() => {
    if (!interactive) {
      setOpen(false);
    }
  }, [interactive]);

  const child = React.Children.only(children) as React.ReactElement;
  
  // Add accessibility props to the child
  const enhancedChild = React.cloneElement(child, {
    ref: triggerRef,
    "aria-describedby": open ? "tooltip" : undefined,
    onKeyDown: (e: React.KeyboardEvent) => {
      handleKeyDown(e);
      if (child.props.onKeyDown) {
        child.props.onKeyDown(e);
      }
    },
    onFocus: (e: React.FocusEvent) => {
      setOpen(true);
      if (child.props.onFocus) {
        child.props.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent) => {
      handleBlur();
      if (child.props.onBlur) {
        child.props.onBlur(e);
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      setOpen(true);
      if (child.props.onMouseEnter) {
        child.props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setOpen(false);
      if (child.props.onMouseLeave) {
        child.props.onMouseLeave(e);
      }
    },
  });

  return (
    <TooltipProvider>
      <Tooltip open={open} delayDuration={delayDuration}>
        <TooltipTrigger asChild>{enhancedChild}</TooltipTrigger>
        <TooltipContent 
          id="tooltip" 
          role="tooltip" 
          side={side} 
          className={cn(
            interactive && "pointer-events-auto",
            contentClassName
          )}
          onEscapeKeyDown={() => setOpen(false)}
          onPointerDownOutside={() => setOpen(false)}
          avoidCollisions
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
