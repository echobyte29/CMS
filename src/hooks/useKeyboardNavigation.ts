import { useEffect, useRef, useState, useCallback } from 'react';

type KeyboardAction = 'next' | 'previous' | 'first' | 'last' | 'escape' | 'enter' | 'tab';
type KeyboardDirection = 'horizontal' | 'vertical' | 'both';

interface UseKeyboardNavigationOptions {
  /**
   * CSS selector for focusable elements
   * @default 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
   */
  focusableSelector?: string;
  
  /**
   * Direction of keyboard navigation
   * @default 'both'
   */
  direction?: KeyboardDirection;
  
  /**
   * Whether to enable arrow key navigation
   * @default true
   */
  enableArrowKeys?: boolean;
  
  /**
   * Whether to trap focus within the container
   * @default false
   */
  trapFocus?: boolean;
  
  /**
   * Whether to auto-focus the first element when initialized
   * @default false
   */
  autoFocus?: boolean;
  
  /**
   * Callback when a navigation action is performed
   */
  onAction?: (action: KeyboardAction, element: HTMLElement) => void;
  
  /**
   * Container reference - if not provided, document is used
   */
  containerRef?: React.RefObject<HTMLElement>;
}

export function useKeyboardNavigation({
  focusableSelector = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  direction = 'both',
  enableArrowKeys = true,
  trapFocus = false,
  autoFocus = false,
  onAction,
  containerRef
}: UseKeyboardNavigationOptions = {}) {
  const internalRef = useRef<HTMLElement | null>(null);
  const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(-1);

  // Get all focusable elements in the container
  const getFocusableElements = useCallback(() => {
    const container = containerRef?.current || internalRef.current || document.documentElement;
    return Array.from(container.querySelectorAll(focusableSelector)) as HTMLElement[];
  }, [containerRef, focusableSelector]);

  // Focus a specific element by index
  const focusElement = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    // Handle wrapping if trap focus is enabled
    let targetIndex = index;
    if (trapFocus) {
      if (index < 0) targetIndex = elements.length - 1;
      if (index >= elements.length) targetIndex = 0;
    } else {
      if (index < 0 || index >= elements.length) return;
    }

    // Focus the element
    elements[targetIndex]?.focus();
    setCurrentFocusIndex(targetIndex);
    
    return elements[targetIndex];
  }, [getFocusableElements, trapFocus]);

  // Focus the first element
  const focusFirstElement = useCallback(() => {
    const element = focusElement(0);
    if (element && onAction) onAction('first', element);
  }, [focusElement, onAction]);

  // Focus the last element
  const focusLastElement = useCallback(() => {
    const elements = getFocusableElements();
    const element = focusElement(elements.length - 1);
    if (element && onAction) onAction('last', element);
  }, [focusElement, getFocusableElements, onAction]);

  // Focus the next element
  const focusNextElement = useCallback(() => {
    const elements = getFocusableElements();
    if (currentFocusIndex === -1) {
      const element = focusElement(0);
      if (element && onAction) onAction('next', element);
      return;
    }

    const element = focusElement(currentFocusIndex + 1);
    if (element && onAction) onAction('next', element);
  }, [currentFocusIndex, focusElement, getFocusableElements, onAction]);

  // Focus the previous element
  const focusPreviousElement = useCallback(() => {
    if (currentFocusIndex <= 0) {
      const element = focusElement(0);
      if (element && onAction) onAction('previous', element);
      return;
    }

    const element = focusElement(currentFocusIndex - 1);
    if (element && onAction) onAction('previous', element);
  }, [currentFocusIndex, focusElement, onAction]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if modifier keys are pressed or within editable content
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.target instanceof HTMLElement && 
         (e.target.isContentEditable || 
          e.target.tagName === 'INPUT' || 
          e.target.tagName === 'TEXTAREA' || 
          e.target.tagName === 'SELECT')) {
        if (e.key !== 'Escape' && e.key !== 'Tab') return;
      }

      if (enableArrowKeys) {
        // Handle arrow key navigation based on direction setting
        switch (e.key) {
          case 'ArrowRight':
            if (direction === 'horizontal' || direction === 'both') {
              e.preventDefault();
              focusNextElement();
            }
            break;
          case 'ArrowLeft':
            if (direction === 'horizontal' || direction === 'both') {
              e.preventDefault();
              focusPreviousElement();
            }
            break;
          case 'ArrowDown':
            if (direction === 'vertical' || direction === 'both') {
              e.preventDefault();
              focusNextElement();
            }
            break;
          case 'ArrowUp':
            if (direction === 'vertical' || direction === 'both') {
              e.preventDefault();
              focusPreviousElement();
            }
            break;
          case 'Home':
            e.preventDefault();
            focusFirstElement();
            break;
          case 'End':
            e.preventDefault();
            focusLastElement();
            break;
          case 'Escape':
            if (onAction) {
              e.preventDefault();
              onAction('escape', document.activeElement as HTMLElement);
            }
            break;
          case 'Enter':
            if (onAction) {
              onAction('enter', document.activeElement as HTMLElement);
            }
            break;
          case 'Tab':
            if (trapFocus) {
              // If Shift+Tab is pressed
              if (e.shiftKey) {
                const elements = getFocusableElements();
                const firstElement = elements[0];
                const lastElement = elements[elements.length - 1];
                
                // If first element is focused and Shift+Tab, move to last element
                if (document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement?.focus();
                  setCurrentFocusIndex(elements.length - 1);
                }
              } else {
                const elements = getFocusableElements();
                const lastElement = elements[elements.length - 1];
                
                // If last element is focused and Tab, move to first element
                if (document.activeElement === lastElement) {
                  e.preventDefault();
                  elements[0]?.focus();
                  setCurrentFocusIndex(0);
                }
              }
              
              if (onAction) onAction('tab', document.activeElement as HTMLElement);
            }
            break;
        }
      }
    };

    // Update focus index when focus changes
    const handleFocusIn = () => {
      if (!document.activeElement) return;
      
      const elements = getFocusableElements();
      const index = elements.indexOf(document.activeElement as HTMLElement);
      if (index !== -1) {
        setCurrentFocusIndex(index);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    // Auto-focus the first element if autoFocus is true
    if (autoFocus) {
      focusFirstElement();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [
    direction, 
    enableArrowKeys, 
    focusFirstElement, 
    focusLastElement, 
    focusNextElement, 
    focusPreviousElement, 
    getFocusableElements, 
    onAction, 
    trapFocus, 
    autoFocus
  ]);

  return {
    focusElement,
    focusFirstElement,
    focusLastElement,
    focusNextElement,
    focusPreviousElement,
    getCurrentFocusIndex: () => currentFocusIndex,
    getFocusableElements,
    setContainerRef: (el: HTMLElement | null) => {
      internalRef.current = el;
    }
  };
} 