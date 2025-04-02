
import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonCustom } from './ui/button-custom';

export type EventType = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  capacity: number;
  registeredCount: number;
  isUpcoming: boolean;
};

interface EventCardProps {
  event: EventType;
  className?: string;
  featured?: boolean;
  style?: React.CSSProperties;
}

const EventCard = ({ event, className, featured = false, style }: EventCardProps) => {
  const { title, description, date, time, location, image, capacity, registeredCount, isUpcoming } = event;
  
  const percentageFilled = Math.min(100, Math.round((registeredCount / capacity) * 100));
  const isAlmostFull = percentageFilled > 80;
  
  return (
    <div 
      className={cn(
        'glass-card overflow-hidden transition-all hover:shadow-md group',
        featured ? 'lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0' : 'flex flex-col',
        className
      )}
      style={style}
    >
      {/* Image */}
      <div className={cn(
        'relative overflow-hidden',
        featured ? 'h-60 lg:h-full' : 'h-48'
      )}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isUpcoming && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
            Upcoming
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col p-5 flex-grow">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
        
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-primary mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <span>{location}</span>
          </div>
        </div>
        
        {/* Capacity indicator */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 text-primary mr-1.5" />
              <span>{registeredCount} / {capacity} registered</span>
            </div>
            {isAlmostFull && (
              <span className="text-destructive font-medium">Almost full!</span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isAlmostFull ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${percentageFilled}%` }}
            ></div>
          </div>
          
          <ButtonCustom 
            className="w-full mt-4" 
            disabled={!isUpcoming}
          >
            {isUpcoming ? "Register Now" : "Event Passed"}
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
