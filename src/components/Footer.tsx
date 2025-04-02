
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Home, Calendar, Users, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 font-bold text-xl mb-4">
              <span className="text-primary">ACM</span>
              <span>Student Chapter</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Empowering the next generation of computing professionals through education, networking, and career development opportunities.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'linkedin', 'github'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={`${social} profile`}
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/', icon: <Home className="w-3.5 h-3.5" /> },
                { name: 'Membership', path: '/membership', icon: <Users className="w-3.5 h-3.5" /> },
                { name: 'Events', path: '/events', icon: <Calendar className="w-3.5 h-3.5" /> },
                { name: 'Contact', path: '/contact', icon: <Mail className="w-3.5 h-3.5" /> },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary mr-2">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ACM Student Chapter. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
