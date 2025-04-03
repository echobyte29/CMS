import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, Home, Users, LogIn } from 'lucide-react';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
    { name: 'Membership', path: '/membership', icon: <Users className="h-4 w-4 mr-1" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'glass-effect py-3 shadow-sm' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="transition-all hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center text-sm font-medium transition-all duration-200 mx-4',
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="flex items-center text-sm font-medium transition-all duration-200 text-foreground/80 hover:text-foreground"
            >
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 transition-all hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <span
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300 ease-in-out',
                  isMobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
                )}
              />
              <span
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300 ease-in-out',
                  isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'
                )}
              />
              <span
                className={cn(
                  'h-0.5 bg-foreground transition-all duration-300 ease-in-out',
                  isMobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-6'
                )}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 glass-effect border-t border-border transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center py-2 px-3 rounded-lg transition-all',
                location.pathname === item.path
                  ? 'bg-accent text-primary'
                  : 'hover:bg-secondary'
              )}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          <Link
            to="/login"
            className="flex items-center py-2 px-3 rounded-lg transition-all hover:bg-secondary"
          >
            <LogIn className="h-4 w-4 mr-1" />
            <span className="ml-2">Login</span>
          </Link>
          <Link
            to="/signup"
            className="block w-full bg-primary text-primary-foreground rounded-xl px-4 py-2.5 text-center font-medium shadow-sm transition-all hover:bg-primary/90"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
