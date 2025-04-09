import React, { Suspense, lazy, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCard } from '@/components/ui/skeleton';

interface LazyProps {
  fallback?: React.ReactNode;
  className?: string;
  showSpinner?: boolean;
  spinnerSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
}

// Default fallback loading component
const DefaultFallback = ({ 
  className = "", 
  showSpinner = true,
  spinnerSize = 'md',
  variant = 'default'
}: LazyProps) => {
  if (variant === 'card') {
    return <SkeletonCard className={className} />;
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {showSpinner && (
        <div
          className={`animate-spin rounded-full border-t-2 border-primary ${
            spinnerSize === 'sm' ? 'h-5 w-5 border-2' : 
            spinnerSize === 'lg' ? 'h-10 w-10 border-4' : 
            'h-8 w-8 border-3'
          }`}
        />
      )}
    </div>
  );
};

/**
 * Creates a lazily-loaded component with a custom fallback UI
 * @param importFunc - Dynamic import function
 * @param options - Options for the lazy component
 * @returns Lazy-loaded component with suspense
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  {
    fallback,
    className = "",
    showSpinner = true,
    spinnerSize = 'md',
    variant = 'default'
  }: LazyProps = {}
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense 
      fallback={
        fallback || 
        <DefaultFallback 
          className={className} 
          showSpinner={showSpinner} 
          spinnerSize={spinnerSize}
          variant={variant}
        />
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Example usage:
// const LazyDashboard = createLazyComponent(() => import('@/pages/Dashboard'), { 
//   variant: 'card',
//   className: 'h-screen w-full' 
// }); 