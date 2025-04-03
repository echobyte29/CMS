import React, { useState, useEffect } from 'react';
import EventCard, { EventType } from '@/components/EventCard';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Calendar as CalendarIcon, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

// Sample data for events
const sampleEvents: EventType[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Convention Center",
    description: "Annual technology conference featuring the latest innovations",
    image: "/images/tech-conf.jpg",
    category: "Technology"
  },
  {
    id: 2,
    title: "Networking Mixer",
    date: "2024-03-20",
    time: "06:00 PM",
    location: "Downtown Hub",
    description: "Evening of professional networking and connections",
    image: "/images/networking.jpg",
    category: "Networking"
  },
  // Add more sample events as needed
];

const Events = () => {
  const [date, setDate] = useState<Date>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(sampleEvents);

  // Filter events based on search query, date, and category
  useEffect(() => {
    let filtered = [...sampleEvents];

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (date) {
      filtered = filtered.filter(event =>
        event.date === format(date, 'yyyy-MM-dd')
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(event =>
        event.category === selectedCategory
      );
    }

    setFilteredEvents(filtered);
  }, [searchQuery, date, selectedCategory]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 dark:text-white">Upcoming Events</h1>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 dark:bg-slate-800/50 dark:text-white"
              />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal dark:bg-slate-800/50 dark:text-white dark:border-slate-700",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark:bg-slate-800">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="dark:bg-slate-800"
              />
            </PopoverContent>
          </Popover>

          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] dark:bg-slate-800/50 dark:text-white dark:border-slate-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800">
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Networking">Networking</SelectItem>
              <SelectItem value="Workshop">Workshop</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
            </SelectContent>
          </Select>

          <ButtonCustom
            onClick={() => {
              setDate(undefined);
              setSearchQuery("");
              setSelectedCategory("");
            }}
            variant="outline"
            className="dark:bg-slate-800/50 dark:text-white dark:border-slate-700"
          >
            <Filter className="mr-2 h-4 w-4" />
            Clear Filters
          </ButtonCustom>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
