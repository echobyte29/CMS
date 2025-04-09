// @ts-nocheck
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MembershipTiers from '@/components/MembershipTiers';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Check, User, Calendar, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';

const Membership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5 dark:bg-slate-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-slate-900/50 dark:to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full dark:bg-primary/20">
              Join ACM Today
            </span>
            <h1 className="text-4xl font-bold sm:text-5xl mb-6 animate-fade-in dark:text-white">
              Unlock Your Computing Career Potential
            </h1>
            <p className="text-xl text-muted-foreground dark:text-slate-300 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Get exclusive access to industry connections, technical workshops, career resources, and a supportive community of computing enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonCustom 
                size="lg" 
                className="animate-fade-in bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300" 
                style={{ animationDelay: '200ms' }}
              >
                Join Now
                <ArrowRight className="ml-2 h-4 w-4 animate-bounce-x" />
              </ButtonCustom>
              <ButtonCustom 
                variant="outline" 
                size="lg" 
                className="animate-fade-in border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transform hover:scale-105 transition-all duration-300" 
                style={{ animationDelay: '300ms' }}
              >
                View Benefits
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Why Join ACM Student Chapter?</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              Membership in our chapter opens doors to opportunities that will enhance your academic journey and future career.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <User />,
                title: 'Career Development',
                features: [
                  'One-on-one mentorship with industry professionals',
                  'Resume reviews and interview preparation',
                  'Exclusive job and internship opportunities',
                  'Networking events with top tech companies'
                ]
              },
              {
                icon: <Calendar />,
                title: 'Technical Growth',
                features: [
                  'Hands-on technical workshops and bootcamps',
                  'Competitive programming contests',
                  'Industry expert speaker sessions',
                  'Collaborative project opportunities'
                ]
              },
              {
                icon: <BookOpen />,
                title: 'Learning Resources',
                features: [
                  'Access to ACM Digital Library',
                  'Curated learning paths and tutorials',
                  'Research collaboration opportunities',
                  'Conference travel grants and scholarships'
                ]
              },
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="glass-card p-8 animate-fade-up hover:shadow-lg transition-all duration-300 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-muted-foreground dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <MembershipTiers className="bg-secondary dark:bg-slate-900/50" />

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">What Our Members Say</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              Hear from our members about how ACM membership has impacted their academic and professional journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The mentorship program connected me with a senior engineer at Google who helped me prepare for technical interviews. I landed my dream internship!",
                name: "Sarah Chen",
                title: "Computer Science, Senior",
                image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=200&h=200&q=80"
              },
              {
                quote: "The workshops and hackathons helped me build practical skills that my regular coursework didn't cover. It gave me a real advantage in my job search.",
                name: "James Rodriguez",
                title: "Software Engineering, Junior",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&h=200&q=80"
              },
              {
                quote: "Being part of ACM's research group opened doors to collaboration opportunities. I'm now publishing my first paper as an undergraduate!",
                name: "Priya Patel",
                title: "Data Science, Senior",
                image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=200&h=200&q=80"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card p-8 flex flex-col animate-fade-up hover:shadow-lg transition-all duration-300 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                </div>
                
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground dark:text-slate-300 mb-6 flex-grow italic relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                    <img 
                      src={testimonial.image} 
                      alt="Nature background"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold dark:text-white group-hover:text-primary transition-colors duration-300">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground dark:text-slate-300">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300">
              Everything you need to know about ACM membership and benefits.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What are the requirements to join ACM?",
                answer: "Any student enrolled in a computing-related program can join ACM. We welcome students from Computer Science, Software Engineering, Data Science, IT, and related fields. Non-computing majors with a strong interest in technology are also welcome to apply."
              },
              {
                question: "How much does membership cost?",
                answer: "Student membership is $15/year, which includes access to all chapter events, workshops, and resources. We also offer need-based scholarships to ensure membership is accessible to all students."
              },
              {
                question: "What events do you organize?",
                answer: "We organize technical workshops, coding competitions, hackathons, industry speaker sessions, career fairs, and social networking events. Events are held both in-person and virtually to accommodate all members."
              },
              {
                question: "How can I get involved beyond basic membership?",
                answer: "Members can join special interest groups, become project leads, mentor other students, or run for leadership positions. We also have committees for event planning, outreach, and technical content creation."
              },
              {
                question: "What career support do you provide?",
                answer: "We offer resume reviews, mock interviews, career mentorship, job/internship referrals, and networking opportunities with industry professionals. Members also get access to exclusive job postings from our corporate partners."
              },
              {
                question: "Is membership recognized professionally?",
                answer: "Yes! ACM membership is globally recognized and can be listed on your resume. Active participation and leadership roles in ACM activities are viewed favorably by employers and graduate schools."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="glass-card p-6 animate-fade-up hover:shadow-lg transition-all duration-300 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-3 dark:text-white">{faq.question}</h3>
                <p className="text-muted-foreground dark:text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground dark:text-slate-300 mb-4">Still have questions?</p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact">
                <ButtonCustom 
                  variant="outline"
                  className="border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transform hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                </ButtonCustom>
              </Link>
              <Link to="/join">
                <ButtonCustom
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
                >
                  Join Now
                  <ArrowRight className="ml-2 h-4 w-4 animate-bounce-x" />
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
