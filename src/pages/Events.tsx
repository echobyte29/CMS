import React, { useState, useEffect } from 'react';
import EventCard, { EventType } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Clock, 
  MapPin, 
  ArrowDownUp,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, isBefore, isAfter, parseISO, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Nature images for events
const natureImages = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', // Forest
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80', // Mountains
  'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Blue sky
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80', // Sunset
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Mountain lake
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Green forest
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80', // Beach
  'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80', // Waterfall
];

// Expanded sample data for events with current and future dates
const sampleEvents: EventType[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Convention Center",
    description: "Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.",
    image: natureImages[0],
    category: "Technology",
    isUpcoming: false // Past event
  },
  {
    id: 2,
    title: "Networking Mixer",
    date: "2024-03-20",
    time: "06:00 PM",
    location: "Downtown Hub",
    description: "Evening of professional networking and connections with industry leaders and professionals.",
    image: natureImages[1],
    category: "Networking",
    isUpcoming: false // Past event
  },
  {
    id: 3,
    title: "Web Development Workshop",
    date: format(new Date(), 'yyyy-MM-dd'), // Today
    time: "10:00 AM",
    location: "ACM Labs",
    description: "Hands-on workshop to learn the latest web development technologies and frameworks.",
    image: natureImages[2],
    category: "Workshop",
    isUpcoming: true
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'), // 3 days from now
    time: "02:00 PM",
    location: "Design Studio",
    description: "Learn essential UI/UX design principles to create intuitive and beautiful interfaces.",
    image: natureImages[3],
    category: "Design",
    isUpcoming: true
  },
  {
    id: 5,
    title: "AI Ethics Symposium",
    date: format(addDays(new Date(), 6), 'yyyy-MM-dd'), // 6 days from now
    time: "01:00 PM",
    location: "University Auditorium",
    description: "Exploring ethical considerations in artificial intelligence development and implementation.",
    image: natureImages[4],
    category: "Technology",
    isUpcoming: true
  },
  {
    id: 6,
    title: "Hackathon 2024",
    date: format(addDays(new Date(), 9), 'yyyy-MM-dd'), // 9 days from now
    time: "09:00 AM",
    location: "Innovation Hub",
    description: "48-hour coding marathon to build innovative solutions for real-world problems.",
    image: natureImages[5],
    category: "Hackathon",
    isUpcoming: true
  },
  {
    id: 7,
    title: "Cloud Computing Masterclass",
    date: format(addDays(new Date(), 12), 'yyyy-MM-dd'), // 12 days from now
    time: "11:00 AM",
    location: "Tech Campus",
    description: "Deep dive into cloud architecture, services, and best practices with industry experts.",
    image: natureImages[6],
    category: "Technology",
    isUpcoming: true
  },
  {
    id: 8,
    title: "Women in Tech Panel",
    date: format(addDays(new Date(), 20), 'yyyy-MM-dd'), // 20 days from now
    time: "04:00 PM",
    location: "Community Center",
    description: "Inspiring panel featuring women leaders in technology sharing their experiences and insights.",
    image: natureImages[7],
    category: "Networking",
    isUpcoming: true
  },
  {
    id: 9,
    title: "Cybersecurity Conference",
    date: format(addDays(new Date(), 35), 'yyyy-MM-dd'), // 35 days from now
    time: "10:00 AM",
    location: "Security Institute",
    description: "Learn about the latest threats, defenses, and best practices in cybersecurity.",
    image: natureImages[0],
    category: "Technology",
    isUpcoming: true
  },
  {
    id: 10,
    title: "Summer Code Camp",
    date: format(addDays(new Date(), 60), 'yyyy-MM-dd'), // 60 days from now
    time: "09:00 AM",
    location: "ACM Campus",
    description: "Intensive coding bootcamp for students to learn programming fundamentals and advanced topics.",
    image: natureImages[1],
    category: "Workshop",
    isUpcoming: true
  },
];

// Time period filters
type TimePeriod = 'all' | 'past' | 'upcoming-10-days' | 'upcoming-future';

// Add pattern SVG for the hero background
const patternBg = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(sampleEvents);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  
  const eventsPerPage = 6;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  // Get current date for comparisons
  const today = new Date();
  const tenDaysFromNow = addDays(today, 10);

  // Filter and sort events
  useEffect(() => {
    const filterAndSortEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let filtered = [...sampleEvents];

        // Apply search filter
        if (searchQuery) {
          filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Apply date filter
        if (date) {
          filtered = filtered.filter(event => 
            isSameDay(parseISO(event.date), date)
          );
        }

        // Apply category filter
        if (selectedCategory && selectedCategory !== 'all') {
          filtered = filtered.filter(event => 
            event.category === selectedCategory
          );
        }

        // Apply time period filter
        if (timePeriod !== 'all') {
          filtered = filtered.filter(event => {
            const eventDate = parseISO(event.date);
            
            switch(timePeriod) {
              case 'past':
                return isBefore(eventDate, today) && !isSameDay(eventDate, today);
              case 'upcoming-10-days':
                return (isAfter(eventDate, today) || isSameDay(eventDate, today)) && 
                       (isBefore(eventDate, tenDaysFromNow) || isSameDay(eventDate, tenDaysFromNow));
              case 'upcoming-future':
                return isAfter(eventDate, tenDaysFromNow);
              default:
                return true;
            }
          });
        }

        // Sort events
        filtered.sort((a, b) => {
          if (sortBy === 'date') {
            const dateA = parseISO(a.date);
            const dateB = parseISO(b.date);
            return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
          } else {
            return sortOrder === 'asc' 
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }
        });
        
        setFilteredEvents(filtered);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (err) {
        setError('An error occurred while filtering events. Please try again.');
        console.error('Error filtering events:', err);
      } finally {
        setIsLoading(false);
      }
    };

    filterAndSortEvents();
  }, [searchQuery, date, selectedCategory, timePeriod, sortBy, sortOrder]);

  // Function to determine which badge to show based on date
  const renderTimeBadge = (dateStr: string) => {
    const eventDate = parseISO(dateStr);
    const isEventToday = isSameDay(eventDate, today);
    const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (isEventToday) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
          Today
        </Badge>
      );
    } else if (daysUntil > 0 && daysUntil <= 10) {
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
          In {daysUntil} days
        </Badge>
      );
    } else if (daysUntil < 0) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400">
          Past event
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
          Upcoming
        </Badge>
      );
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setDate(undefined);
    setSelectedCategory("all");
    setTimePeriod('all');
    setSortBy('date');
    setSortOrder('asc');
  };

  // Get unique categories for the filter
  const categories = [...new Set(sampleEvents.map(event => event.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden bg-primary">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("${patternBg}")`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70 animate-gradient" />
        
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-delayed" />
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                Upcoming Events
              </h1>
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6" />
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
                Discover and join our exciting lineup of events, workshops, and conferences
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredEvents.filter(e => !isBefore(parseISO(e.date), today)).length}
                </div>
                <div className="text-sm text-white/70">Upcoming Events</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {categories.length}
                </div>
                <div className="text-sm text-white/70">Categories</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {filteredEvents.filter(e => isSameDay(parseISO(e.date), today)).length}
                </div>
                <div className="text-sm text-white/70">Today's Events</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value: 'date' | 'title') => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
                <SelectItem value="upcoming-10-days">Next 10 Days</SelectItem>
                <SelectItem value="upcoming-future">Future Events</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                .map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No events found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
