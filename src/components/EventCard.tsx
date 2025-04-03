import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';

export interface EventType {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

interface EventCardProps {
  event: EventType;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ event, className = '' }) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg dark:bg-slate-800/50 dark:border-slate-700 ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-sm font-medium bg-primary/90 text-white rounded-full">
            {event.category}
          </span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="dark:text-white">{event.title}</CardTitle>
        <CardDescription className="dark:text-slate-400">{event.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground dark:text-slate-400">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground dark:text-slate-400">
            <Clock className="mr-2 h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground dark:text-slate-400">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <ButtonCustom className="w-full">
          Register Now
        </ButtonCustom>
      </CardContent>
    </Card>
  );
};

export default EventCard;
