import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MembershipTiers from '@/components/MembershipTiers';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Check, User, Calendar, BookOpen, ArrowRight } from 'lucide-react';

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
            <h1 className="text-4xl font-bold sm:text-5xl mb-6 animate-fade-in dark:text-white">Membership Benefits</h1>
            <p className="text-xl text-muted-foreground dark:text-slate-300 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Join our vibrant community of computing enthusiasts and access exclusive resources, events, and opportunities.
            </p>
            <ButtonCustom size="lg" className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              Join Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonCustom>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
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
                title: 'Professional Development',
                features: [
                  'Resume building workshops',
                  'Interview preparation sessions',
                  'Career fairs with industry leaders',
                  'Professional networking opportunities'
                ]
              },
              {
                icon: <Calendar />,
                title: 'Exclusive Events',
                features: [
                  'Technical workshops and seminars',
                  'Hackathons and coding competitions',
                  'Industry speaker sessions',
                  'Social networking events'
                ]
              },
              {
                icon: <BookOpen />,
                title: 'Academic Resources',
                features: [
                  'Access to digital library and publications',
                  'Study groups and tutoring sessions',
                  'Research opportunities',
                  'Conference travel grants'
                ]
              },
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="glass-card p-8 animate-fade-up dark:bg-slate-800/50"
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
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Member Stories</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              Hear what our members have to say about their experience with the ACM Student Chapter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Being part of ACM has connected me with like-minded peers and opened doors to internship opportunities I wouldn't have found otherwise.",
                name: "Alex Chen",
                title: "Computer Science, Junior",
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&h=200"
              },
              {
                quote: "The workshops and technical talks organized by ACM have significantly enhanced my skills and knowledge beyond what I learn in the classroom.",
                name: "Sophia Williams",
                title: "Software Engineering, Senior",
                image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
              },
              {
                quote: "As an ACM officer, I've developed leadership skills that have been invaluable in my job interviews and career growth.",
                name: "Michael Johnson",
                title: "Data Science, Graduate Student",
                image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&h=200"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card p-8 flex flex-col animate-fade-up dark:bg-slate-800/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground dark:text-slate-300 mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground dark:text-slate-300">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300">
              Have questions about membership? Find answers to common inquiries below.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How do I join the ACM Student Chapter?",
                answer: "You can join by completing the registration form on our website and paying the membership fee. Once your application is processed, you'll receive confirmation and access to member benefits."
              },
              {
                question: "Is membership open to all majors?",
                answer: "Yes! While our focus is on computing and technology, we welcome students from all majors who are interested in these fields. Interdisciplinary perspectives enrich our community."
              },
              {
                question: "How long does membership last?",
                answer: "Memberships are valid for one academic year and must be renewed annually. We'll send you a reminder when it's time to renew."
              },
              {
                question: "Are there opportunities to get involved beyond attending events?",
                answer: "Absolutely! Members can volunteer for event planning, join committees, run for officer positions, mentor other students, and contribute to chapter projects."
              },
              {
                question: "Can I get a refund if I'm not satisfied with my membership?",
                answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your membership within the first month, contact us for a full refund."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="glass-card p-6 animate-fade-up dark:bg-slate-800/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{faq.question}</h3>
                <p className="text-muted-foreground dark:text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground dark:text-slate-300 mb-4">Still have questions?</p>
            <Link to="/contact">
              <ButtonCustom variant="outline">
                Contact Us
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
