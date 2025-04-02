
import React, { useState, useEffect } from 'react';
import EventCard, { EventType } from '@/components/EventCard';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Calendar, Filter, Search } from 'lucide-react';

// Sample data for events
const allEvents: EventType[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning Workshop',
    description: 'Learn the fundamentals of machine learning algorithms and applications in this hands-on workshop.',
    date: 'Oct 15, 2023',
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
  },
  {
    id: '4',
    title: 'Networking Mixer with Tech Industry Professionals',
    description: 'An opportunity to connect with professionals from leading tech companies in a casual setting.',
    date: 'Dec 3, 2023',
    time: '6:00 PM - 8:00 PM',
    location: 'University Center, Ballroom A',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=400',
    capacity: 75,
    registeredCount: 30,
    isUpcoming: true
  },
  {
    id: '5',
    title: 'Cloud Computing Workshop: AWS Fundamentals',
    description: 'Learn the basics of Amazon Web Services and deploy your first application to the cloud.',
    date: 'Dec 10, 2023',
    time: '1:00 PM - 4:00 PM',
    location: 'Computer Science Building, Lab 203',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=400',
    capacity: 40,
    registeredCount: 12,
    isUpcoming: true
  },
  {
    id: '6',
    title: 'Python Programming Contest',
    description: 'Test your Python skills against other students in this algorithmic challenge.',
    date: 'Jan 15, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Computer Science Building, Room 101',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=400',
    capacity: 50,
    registeredCount: 5,
    isUpcoming: true
  },
  {
    id: '7',
    title: 'UI/UX Design Workshop',
    description: 'Learn principles of effective user interface and experience design for digital products.',
    date: 'Sep 12, 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Design Building, Studio 302',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=400',
    capacity: 30,
    registeredCount: 30,
    isUpcoming: false
  },
  {
    id: '8',
    title: 'Fall Welcome Social',
    description: 'Meet fellow ACM members and learn about upcoming events for the semester.',
    date: 'Sep 5, 2023',
    time: '5:00 PM - 7:00 PM',
    location: 'Computer Science Building, Lobby',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=400',
    capacity: 100,
    registeredCount: 87,
    isUpcoming: false
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [events, setEvents] = useState<EventType[]>(allEvents);
  const [featuredEvent, setFeaturedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set the featured event (first upcoming event)
    const upcoming = allEvents.filter(event => event.isUpcoming);
    if (upcoming.length > 0) {
      setFeaturedEvent(upcoming[0]);
    }
  }, []);

  useEffect(() => {
    // Filter events based on search term and filter selection
    let filteredEvents = allEvents;
    
    if (filter === 'upcoming') {
      filteredEvents = filteredEvents.filter(event => event.isUpcoming);
    } else if (filter === 'past') {
      filteredEvents = filteredEvents.filter(event => !event.isUpcoming);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(
        event => 
          event.title.toLowerCase().includes(term) || 
          event.description.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term)
      );
    }
    
    setEvents(filteredEvents);
  }, [searchTerm, filter]);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-light via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm text-primary mb-6 animate-fade-in">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Events & Workshops</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>Upcoming Events</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Discover workshops, talks, and networking opportunities designed to enhance your skills and expand your professional network.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Featured Event</h2>
            </div>
            <EventCard event={featuredEvent} featured={true} />
          </div>
        </section>
      )}
      
      {/* Search and Filter */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
            {/* Search */}
            <div className="relative flex-grow max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filter:
              </span>
              <div className="flex rounded-lg overflow-hidden border border-border">
                {['all', 'upcoming', 'past'].map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      filter === option
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => setFilter(option as 'all' | 'upcoming' | 'past')}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} className="animate-fade-up" />
              ))}
            </div>
          ) : (
            <div className="glass-card p-10 text-center animate-fade-in">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
              <ButtonCustom variant="outline" onClick={() => { setSearchTerm(''); setFilter('all'); }}>
                Reset Filters
              </ButtonCustom>
            </div>
          )}
        </div>
      </section>
      
      {/* Calendar Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Academic Year Calendar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Plan ahead with our calendar of events for the entire academic year. Subscribe to stay updated.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Fall Semester', 'Spring Semester', 'Summer'].map((semester, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">{semester}</h3>
                  <ul className="space-y-4">
                    {[1, 2, 3].map((_, j) => (
                      <li key={j} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs font-medium">{j+1}</span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {semester === 'Fall Semester' && j === 0 && 'Welcome Social'}
                            {semester === 'Fall Semester' && j === 1 && 'Hackathon'}
                            {semester === 'Fall Semester' && j === 2 && 'Industry Panel'}
                            {semester === 'Spring Semester' && j === 0 && 'Technical Workshop Series'}
                            {semester === 'Spring Semester' && j === 1 && 'Career Fair Prep'}
                            {semester === 'Spring Semester' && j === 2 && 'Programming Competition'}
                            {semester === 'Summer' && j === 0 && 'Online Coding Bootcamp'}
                            {semester === 'Summer' && j === 1 && 'Research Showcase'}
                            {semester === 'Summer' && j === 2 && 'Industry Internship Panel'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {semester === 'Fall Semester' && ['Sep 5', 'Oct 15-16', 'Nov 10'][j]}
                            {semester === 'Spring Semester' && ['Feb 5-20', 'Mar 8', 'Apr 15'][j]}
                            {semester === 'Summer' && ['Jun 1-30', 'Jul 15', 'Aug 5'][j]}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ButtonCustom variant="outline" size="sm" className="w-full">
                      See All {semester} Events
                    </ButtonCustom>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
              <ButtonCustom>
                Subscribe to Calendar
              </ButtonCustom>
              <ButtonCustom variant="outline">
                Download Calendar (.ics)
              </ButtonCustom>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Registration Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Event Registration Information</h2>
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-3">Registration Process</h3>
                  <p className="text-muted-foreground">
                    Register for events directly through our website. ACM members receive priority registration and may attend most events for free.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-3">Attendance Policy</h3>
                  <p className="text-muted-foreground">
                    Please arrive 10 minutes before the event starts. If you can't attend, cancel your registration at least 24 hours in advance.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-3">Special Accommodations</h3>
                  <p className="text-muted-foreground">
                    If you require special accommodations, please contact us at least 3 days before the event.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-xl font-semibold mb-6">Have a suggestion for an event?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for new ideas and topics that interest our members. Let us know what you'd like to see!
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1">Event Type</label>
                  <select
                    id="eventType"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                  >
                    <option>Workshop</option>
                    <option>Tech Talk</option>
                    <option>Social Event</option>
                    <option>Hackathon</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="eventTopic" className="block text-sm font-medium mb-1">Topic/Title</label>
                  <input
                    type="text"
                    id="eventTopic"
                    placeholder="Suggest a topic or title"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventDescription" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="eventDescription"
                    rows={4}
                    placeholder="Briefly describe your event idea"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                  ></textarea>
                </div>
                
                <ButtonCustom type="submit" className="w-full">
                  Submit Suggestion
                </ButtonCustom>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
