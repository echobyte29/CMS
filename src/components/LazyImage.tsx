import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  blurHash?: string;
  aspectRatio?: string;
  preload?: boolean;
  loadingComponent?: React.ReactNode;
  onLoad?: () => void;
  rootMargin?: string;
  className?: string;
  wrapperClassName?: string;
  placeholderClassName?: string;
}

export default function LazyImage({
  src,
  alt,
  fallback,
  blurHash,
  aspectRatio = "16/9",
  preload = false,
  loadingComponent,
  onLoad,
  rootMargin = "200px",
  className = "",
  wrapperClassName = "",
  placeholderClassName = "",
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(preload);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up intersection observer to detect when the image is in view
  useEffect(() => {
    if (isLoaded) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootMargin, isLoaded]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Render placeholder during loading
  const renderPlaceholder = () => {
    if (loadingComponent) return loadingComponent;
    
    return (
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800",
          placeholderClassName
        )}
      >
        <Skeleton className="w-full h-full" />
      </div>
    );
  };

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden",
        aspectRatio && `aspect-[${aspectRatio}]`,
        wrapperClassName
      )}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPlaceholder()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual image */}
      {(isInView || preload) && (
        <motion.img
          src={error && fallback ? fallback : src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
} 