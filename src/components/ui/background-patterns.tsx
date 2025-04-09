import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type PatternVariant = 
  | 'dots' 
  | 'grid' 
  | 'lines' 
  | 'gradient-mesh' 
  | 'honeycomb' 
  | 'wave';

interface BackgroundPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The pattern type to display */
  variant?: PatternVariant;
  /** Whether the pattern should animate */
  animate?: boolean;
  /** Color to use for the pattern (CSS color) */
  color?: string;
  /** Custom CSS class to apply */
  className?: string;
}

export function BackgroundPattern({
  variant = 'dots',
  animate = false,
  color,
  className,
  ...props
}: BackgroundPatternProps) {
  const commonProps = {
    className: cn('absolute inset-0 w-full h-full overflow-hidden opacity-40', className),
    ...props
  };

  const animationProps = animate ? {
    initial: { opacity: 0.3 },
    animate: { opacity: 0.4 },
    transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' as const }
  } : {};

  // Choose pattern based on variant
  switch (variant) {
    case 'dots':
      return (
        <motion.div {...commonProps} {...animationProps}>
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary/10"
          >
            <defs>
              <pattern
                id="dotPattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </motion.div>
      );

    case 'grid':
      return (
        <motion.div {...commonProps} {...animationProps}>
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-500/[0.08]"
          >
            <defs>
              <pattern
                id="gridPattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 0 L40 0 L40 40 L0 40 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
          </svg>
        </motion.div>
      );

    case 'lines':
      return (
        <motion.div {...commonProps} {...animationProps}>
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary/5"
          >
            <defs>
              <pattern
                id="linePattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#linePattern)" />
          </svg>
        </motion.div>
      );

    case 'gradient-mesh':
      return (
        <motion.div
          {...props}
          className={cn('absolute inset-0 w-full h-full overflow-hidden', className)}
          {...animationProps}
        >
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl blur-xl opacity-70"></div>
          <div className="absolute -z-10 inset-0 opacity-5">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100%" 
              height="100%" 
              className="text-primary"
            >
              <defs>
                <pattern 
                  id="dotPattern" 
                  patternUnits="userSpaceOnUse" 
                  width="20" 
                  height="20" 
                  patternTransform="rotate(45)"
                >
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
        </motion.div>
      );

    case 'honeycomb':
      return (
        <motion.div {...commonProps} {...animationProps}>
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary/10"
          >
            <defs>
              <pattern
                id="honeycombPattern"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(0.5)"
              >
                <path
                  d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z M28 33L56 50L56 84L28 100L0 84L0 50L28 33Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#honeycombPattern)" />
          </svg>
        </motion.div>
      );

    case 'wave':
      return (
        <motion.div 
          {...commonProps} 
          {...animationProps}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'a\' gradientUnits=\'userSpaceOnUse\' x1=\'0\' x2=\'0\' y1=\'0\' y2=\'100%25\' gradientTransform=\'rotate(240)\'%3E%3Cstop offset=\'0\' stop-color=\'%23ffffff\' stop-opacity=\'0\'/%3E%3Cstop offset=\'1\' stop-color=\'%238B5CF6\' stop-opacity=\'0.1\'/%3E%3C/linearGradient%3E%3Cpattern patternUnits=\'userSpaceOnUse\' id=\'b\' width=\'540\' height=\'450\' x=\'0\' y=\'0\' viewBox=\'0 0 1080 900\'%3E%3Cg fill-opacity=\'0.1\'%3E%3Cpolygon fill=\'%23444\' points=\'90 150 0 300 180 300\'/%3E%3Cpolygon points=\'90 150 180 0 0 0\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 150 360 0 180 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 150 360 300 540 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 150 540 0 360 0\'/%3E%3Cpolygon points=\'630 150 540 300 720 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'630 150 720 0 540 0\'/%3E%3Cpolygon fill=\'%23444\' points=\'810 150 720 300 900 300\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'810 150 900 0 720 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'990 150 900 300 1080 300\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 150 1080 0 900 0\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'90 450 0 600 180 600\'/%3E%3Cpolygon points=\'90 450 180 300 0 300\'/%3E%3Cpolygon fill=\'%23666\' points=\'270 450 180 600 360 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'270 450 360 300 180 300\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'450 450 360 600 540 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'450 450 540 300 360 300\'/%3E%3Cpolygon fill=\'%23999\' points=\'630 450 540 600 720 600\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'630 450 720 300 540 300\'/%3E%3Cpolygon points=\'810 450 720 600 900 600\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'810 450 900 300 720 300\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'990 450 900 600 1080 600\'/%3E%3Cpolygon fill=\'%23444\' points=\'990 450 1080 300 900 300\'/%3E%3Cpolygon fill=\'%23222\' points=\'90 750 0 900 180 900\'/%3E%3Cpolygon points=\'270 750 180 900 360 900\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'270 750 360 600 180 600\'/%3E%3Cpolygon points=\'450 750 540 600 360 600\'/%3E%3Cpolygon points=\'630 750 540 900 720 900\'/%3E%3Cpolygon fill=\'%23444\' points=\'630 750 720 600 540 600\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'810 750 720 900 900 900\'/%3E%3Cpolygon fill=\'%23666\' points=\'810 750 900 600 720 600\'/%3E%3Cpolygon fill=\'%23999\' points=\'990 750 900 900 1080 900\'/%3E%3Cpolygon fill=\'%23999\' points=\'180 0 90 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 0 270 150 450 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'540 0 450 150 630 150\'/%3E%3Cpolygon points=\'900 0 810 150 990 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'0 300 -90 450 90 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'0 300 90 150 -90 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'180 300 90 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'180 300 270 150 90 150\'/%3E%3Cpolygon fill=\'%23222\' points=\'360 300 270 450 450 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 300 450 150 270 150\'/%3E%3Cpolygon fill=\'%23444\' points=\'540 300 450 450 630 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'540 300 630 150 450 150\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'720 300 630 450 810 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'720 300 810 150 630 150\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 300 810 450 990 450\'/%3E%3Cpolygon fill=\'%23999\' points=\'900 300 990 150 810 150\'/%3E%3Cpolygon points=\'0 600 -90 750 90 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'0 600 90 450 -90 450\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'180 600 90 750 270 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 600 270 450 90 450\'/%3E%3Cpolygon fill=\'%23444\' points=\'360 600 270 750 450 750\'/%3E%3Cpolygon fill=\'%23999\' points=\'360 600 450 450 270 450\'/%3E%3Cpolygon fill=\'%23666\' points=\'540 600 630 450 450 450\'/%3E%3Cpolygon fill=\'%23222\' points=\'720 600 630 750 810 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'900 600 810 750 990 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 600 990 450 810 450\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'0 900 90 750 -90 750\'/%3E%3Cpolygon fill=\'%23444\' points=\'180 900 270 750 90 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'360 900 450 750 270 750\'/%3E%3Cpolygon fill=\'%23AAA\' points=\'540 900 630 750 450 750\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'720 900 810 750 630 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'900 900 990 750 810 750\'/%3E%3Cpolygon fill=\'%23222\' points=\'1080 300 990 450 1170 450\'/%3E%3Cpolygon fill=\'%23FFF\' points=\'1080 300 1170 150 990 150\'/%3E%3Cpolygon points=\'1080 600 990 750 1170 750\'/%3E%3Cpolygon fill=\'%23666\' points=\'1080 600 1170 450 990 450\'/%3E%3Cpolygon fill=\'%23DDD\' points=\'1080 900 1170 750 990 750\'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x=\'0\' y=\'0\' fill=\'url(%23a)\' width=\'100%25\' height=\'100%25\'/%3E%3Crect x=\'0\' y=\'0\' fill=\'url(%23b)\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E")',
            backgroundSize: 'cover'
          }}
        />
      );

    default:
      return null;
  }
}

export function GradientBackground({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 -z-10", 
        className
      )}
      {...props}
    />
  );
}

export function NoiseBackground({
  className,
  opacity = '0.4',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { opacity?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10", 
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity
      }}
      {...props}
    />
  );
} 