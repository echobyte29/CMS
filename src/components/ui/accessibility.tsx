import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

// Component for visually hidden content (accessible to screen readers)
interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        className
      )}
      style={{
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
      }}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * SkipLink component - Allows keyboard users to skip to the main content
 * Invisible until focused, then appears for keyboard navigation
 */
interface SkipLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** The ID of the main content area to skip to */
  contentId?: string;
  /** Custom text for the skip link */
  text?: string;
}

export function SkipLink({
  contentId = "main-content",
  text = "Skip to main content",
  className,
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4",
        "bg-background text-foreground py-2 px-4 rounded-md shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {text}
    </a>
  );
}

/**
 * LiveRegion component - Announces changes to screen readers
 * Used for important updates that need to be announced immediately
 */
interface LiveRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The announcement text */
  children: React.ReactNode;
  /** ARIA live setting - assertive for immediate announcement, polite for when idle */
  ariaLive?: 'assertive' | 'polite';
  /** Whether the region should be visible or hidden */
  visuallyHidden?: boolean;
}

export function LiveRegion({
  children,
  ariaLive = 'polite',
  visuallyHidden = true,
  className,
  ...props
}: LiveRegionProps) {
  const prevChildrenRef = useRef<React.ReactNode>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  // This ensures that even if the children prop doesn't change,
  // but its content does, it will still be announced
  useEffect(() => {
    if (prevChildrenRef.current !== children && regionRef.current) {
      // Clear and update the region to ensure announcement
      const currentContent = regionRef.current.textContent;
      regionRef.current.textContent = '';
      
      // Use a short timeout to ensure the clearing registers before re-adding
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = currentContent;
        }
      }, 50);
    }
    
    prevChildrenRef.current = children;
  }, [children]);

  return (
    <div
      ref={regionRef}
      aria-live={ariaLive}
      aria-atomic="true"
      className={cn(
        visuallyHidden && "sr-only",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Higher order component to make any component accessible with keyboard
interface KeyboardAccessibleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  role?: string;
  tabIndex?: number;
}

export function KeyboardAccessible({
  children,
  onClick,
  role = "button",
  tabIndex = 0,
  className,
  ...props
}: KeyboardAccessibleProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <div
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Component for providing aria-labelledby helper
interface LabelProviderProps extends React.HTMLAttributes<HTMLSpanElement> {
  id: string;
  children: React.ReactNode;
}

export function LabelProvider({ id, children, className, ...props }: LabelProviderProps) {
  return (
    <span id={id} className={cn("sr-only", className)} {...props}>
      {children}
    </span>
  );
}

// Component for focus trap within modals
interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function FocusTrap({ children, active = true, ...props }: FocusTrapProps) {
  const startRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!active) return;

    const handleTabStart = (e: KeyboardEvent) => {
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        endRef.current?.focus();
      }
    };

    const handleTabEnd = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        startRef.current?.focus();
      }
    };

    startRef.current?.addEventListener("keydown", handleTabStart);
    endRef.current?.addEventListener("keydown", handleTabEnd);

    return () => {
      startRef.current?.removeEventListener("keydown", handleTabStart);
      endRef.current?.removeEventListener("keydown", handleTabEnd);
    };
  }, [active]);

  return (
    <>
      {active && <div tabIndex={0} ref={startRef} />}
      {children}
      {active && <div tabIndex={0} ref={endRef} />}
    </>
  );
}

/**
 * Dialog trigger that's fully accessible
 */
interface AccessibleDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Dialog title for accessibility */
  dialogTitle: string;
}

export function AccessibleDialogTrigger({
  children,
  dialogTitle,
  className,
  ...props
}: AccessibleDialogTriggerProps) {
  return (
    <button
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls={`dialog-${dialogTitle.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        "outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AriaDescribedByElement({
  id, 
  children
}: { 
  id: string; 
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="sr-only">
      {children}
    </div>
  );
} 