import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import EventCard, { EventType } from '@/components/EventCard';
import { ArrowRight, Calendar, Award, BookOpen, Users, Briefcase, Code, Trophy, Network } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

// Sample data for upcoming events
const upcomingEvents: EventType[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning Workshop',
    description: 'Learn the fundamentals of machine learning algorithms and applications in this hands-on workshop.',
    date: 'Oct, 15 2023',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Science Building, Room 101',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&h=400',
    capacity: 45,
    registeredCount: 38,
    isUpcoming: true
  },
  {
    id: '2',
    title: 'Web Development Hackathon',
    description: 'Join teams to build innovative web applications in this 24-hour coding challenge.',
    date: 'Nov 5, 2023',
    time: '9:00 AM - 9:00 AM (next day)',
    location: 'Student Union, Great Hall',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400',
    capacity: 100,
    registeredCount: 67,
    isUpcoming: true
  },
  {
    id: '3',
    title: 'Industry Talk: The Future of AI Ethics',
    description: 'Discussing the ethical implications of AI development with industry experts.',
    date: 'Nov 20, 2023',
    time: '4:00 PM - 6:00 PM',
    location: 'Virtual Event',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=400',
    capacity: 200,
    registeredCount: 75,
    isUpcoming: true
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Why Join ACM Student Chapter?</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              Discover the benefits of being part of our vibrant community of computing enthusiasts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users />,
                title: 'Community',
                description: 'Connect with like-minded peers, industry professionals, and academic leaders in computing.'
              },
              {
                icon: <BookOpen />,
                title: 'Learning',
                description: 'Access exclusive workshops, seminars, and learning resources to enhance your skills.'
              },
              {
                icon: <Briefcase />,
                title: 'Career Growth',
                description: 'Get career guidance, internship opportunities, and networking events with top companies.'
              },
              {
                icon: <Code />,
                title: 'Technical Projects',
                description: 'Work on real-world projects and gain hands-on experience in various technologies.'
              },
              {
                icon: <Trophy />,
                title: 'Competitions',
                description: 'Participate in hackathons, coding contests, and other competitive events.'
              },
              {
                icon: <Network />,
                title: 'Global Network',
                description: 'Join a worldwide network of ACM members and access international opportunities.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 animate-fade-up dark:bg-slate-800/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-muted-foreground dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-secondary/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Active Members", value: "250+" },
              { label: "Annual Events", value: "20+" },
              { label: "Years Active", value: "12" },
              { label: "Partner Companies", value: "35+" }
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center animate-fade-up dark:bg-slate-800/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-bold mb-2 dark:text-white">{stat.value}</div>
                <div className="text-muted-foreground dark:text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
              <p className="text-muted-foreground max-w-2xl">
                Don't miss our upcoming events designed to enhance your knowledge and connect you with industry professionals.
              </p>
            </div>
            <Link 
              to="/events" 
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-4 md:mt-0 group"
            >
              <span>View All Events</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <EventCard 
                key={event.id} 
                event={event} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-slate-900/50 dark:to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-sm text-primary mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Join Our Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">Ready to advance your career in computing?</h2>
            <p className="text-lg text-muted-foreground dark:text-slate-300 mb-8">
              Become a member of our ACM Student Chapter today and unlock a world of opportunities in computing and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonCustom size="lg">
                Become a Member
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonCustom>
              <ButtonCustom variant="outline" size="lg" className="dark:bg-slate-800/50">
                Learn More
              </ButtonCustom>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
