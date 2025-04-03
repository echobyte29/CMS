import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ButtonCustom } from './ui/button-custom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (entry.target.classList.contains('hero-title')) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100');
              }, 100);
            } else if (entry.target.classList.contains('hero-subtitle')) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100');
              }, 300);
            } else if (entry.target.classList.contains('hero-cta')) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100');
              }, 500);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-slate-900" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-white dark:from-primary dark:via-slate-900 dark:to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent dark:from-slate-900"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent dark:from-slate-900"></div>
      </div>
      
      {/* Hero content */}
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent border border-accent-foreground/10 text-sm text-accent-foreground animate-fade-in dark:bg-blue-500/20 dark:text-white">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Welcome to ACM Student Chapter</span>
          </div>
          
          {/* Title */}
          <h1 className="hero-title opacity-0 animate-on-scroll text-4xl font-bold sm:text-5xl md:text-6xl tracking-tight hero-text">
            Empowering <span className="text-gradient">Future Innovators</span> in Computing
          </h1>
          
          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 animate-on-scroll max-w-2xl mx-auto text-xl text-foreground/80 dark:text-white/90">
            Join our community of talented students, professionals, and researchers passionate about advancing computing as a science and profession.
          </p>
          
          {/* CTA buttons */}
          <div className="hero-cta opacity-0 animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <ButtonCustom size="lg" className="w-full sm:w-auto">
              Become a Member
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonCustom>
            <ButtonCustom variant="outline" size="lg" className="w-full sm:w-auto dark:border-white/20 dark:text-white dark:hover:bg-white/10">
              Explore Events
            </ButtonCustom>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12">
            {[
              { label: "Active Members", value: "250+" },
              { label: "Annual Events", value: "20+" },
              { label: "Years Active", value: "12" },
              { label: "Partner Companies", value: "35+" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="glass-card p-4 sm:p-6 animate-fade-up dark:bg-slate-800/50" 
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground dark:text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="block h-12 w-0.5 bg-foreground/20 dark:bg-white/20 mb-1"></span>
        <span className="sr-only">Scroll down</span>
      </div>
    </div>
  );
};

export default Hero;
