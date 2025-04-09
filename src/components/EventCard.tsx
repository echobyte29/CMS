import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EventType {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  isUpcoming: boolean;
}

interface EventCardProps {
  event: EventType;
  index?: number;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 group hover:shadow-lg",
      className
    )}>
      <div className="relative">
        {/* Image section with overlay */}
        <div className="h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-slate-900">
              {event.category}
            </span>
          </div>
          
          {/* Date at the bottom of image */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center text-white text-sm font-medium">
              <Calendar className="w-4 h-4 mr-1" />
              {event.date}
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
        <CardDescription className="mt-1 line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-0 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-2 h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-4 flex justify-between items-center">
        <span className={cn(
          "text-xs font-medium",
          event.isUpcoming ? "text-blue-600" : "text-gray-500"
        )}>
          {event.isUpcoming ? 'Upcoming' : 'Past event'}
        </span>
        
        <Button size="sm" className="rounded-full" variant="outline">
          {event.isUpcoming ? 'Register' : 'View Details'} 
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
