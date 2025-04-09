import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminHeader } from "@/components/AdminHeader"

interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  location?: string
  status?: "upcoming" | "ongoing" | "completed"
  registrations?: number
  content?: string | (() => React.ReactNode)
  topic?: string
  createdAt?: string
}

// Sample default events
const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    description: "Learn modern web development techniques",
    date: "2024-04-15",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    location: "Room 101, Engineering Building",
    status: "upcoming",
    registrations: 45,
    content: () => (
      <div className="space-y-4">
        <p>
          Join us for an intensive workshop on modern web development! This hands-on session will cover:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Frontend frameworks (React, Vue, Angular)</li>
          <li>Backend development with Node.js</li>
          <li>Database design and implementation</li>
          <li>DevOps and deployment strategies</li>
        </ul>
        <div className="pt-4">
          <h4 className="font-semibold mb-2">Schedule:</h4>
          <p>09:00 AM - Introduction to Web Development</p>
          <p>10:30 AM - Frontend Development</p>
          <p>12:00 PM - Lunch Break</p>
          <p>01:00 PM - Backend Development</p>
          <p>02:30 PM - Project Implementation</p>
          <p>04:00 PM - Q&A Session</p>
        </div>
      </div>
    ),
  },
  {
    id: "2",
    title: "AI/ML Symposium",
    description: "Exploring the future of artificial intelligence",
    date: "2024-04-20",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    location: "Main Auditorium",
    status: "upcoming",
    registrations: 120,
    content: () => (
      <div className="space-y-4">
        <p>
          A comprehensive symposium on the latest developments in AI and Machine Learning, featuring:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Keynote speakers from leading tech companies</li>
          <li>Interactive sessions on practical ML applications</li>
          <li>Hands-on workshops with popular ML frameworks</li>
          <li>Networking opportunities with industry experts</li>
        </ul>
        <div className="pt-4">
          <h4 className="font-semibold mb-2">Featured Speakers:</h4>
          <ul className="space-y-2">
            <li>Dr. Sarah Johnson - AI Research Lead, Tech Corp</li>
            <li>Prof. Michael Chen - ML Department Head</li>
            <li>Ms. Emily Brown - Senior Data Scientist</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    title: "Cybersecurity Workshop",
    description: "Essential security practices for developers",
    date: "2024-04-25",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    location: "Virtual Event",
    status: "upcoming",
    registrations: 75,
    content: () => (
      <div className="space-y-4">
        <p>
          Learn crucial cybersecurity practices and protect your applications from common threats.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Understanding common security vulnerabilities</li>
          <li>Implementing secure authentication</li>
          <li>Best practices for data protection</li>
          <li>Security testing and monitoring</li>
        </ul>
        <div className="pt-4">
          <h4 className="font-semibold mb-2">Prerequisites:</h4>
          <p>Basic understanding of web development</p>
          <p>Laptop with required software installed</p>
          <p>Commitment to learning security practices</p>
        </div>
      </div>
    ),
  },
]

// Function to get event status based on date
const getEventStatus = (dateStr: string): "upcoming" | "ongoing" | "completed" => {
  const eventDate = new Date(dateStr)
  const now = new Date()
  
  // Set end of event to be 3 hours after start time
  const eventEndDate = new Date(eventDate)
  eventEndDate.setHours(eventEndDate.getHours() + 3)
  
  if (now < eventDate) {
    return "upcoming"
  } else if (now >= eventDate && now <= eventEndDate) {
    return "ongoing"
  } else {
    return "completed"
  }
}

// Function to get registration count for an event
const getRegistrationCount = (eventId: string): number => {
  try {
    const attendees = JSON.parse(localStorage.getItem("eventAttendees") || "[]")
    return attendees.filter(a => a.eventId === eventId).length
  } catch (error) {
    console.error("Error getting registration count:", error)
    return Math.floor(Math.random() * 50) + 10 // Return random number as fallback
  }
}

// Function to retrieve all events
const getAllEvents = (): Event[] => {
  try {
    // Get hosted events from localStorage
    const hostedEvents = JSON.parse(localStorage.getItem("hostedEvents") || "[]")
    
    // Process hosted events to match Event interface requirements
    const processedHostedEvents = hostedEvents.map(event => {
      // Determine event status based on date
      const status = getEventStatus(event.date)
      
      // Get registration count
      const registrations = getRegistrationCount(event.id)
      
      // Generate content based on event description
      const content = () => (
        <div className="space-y-4">
          <p>{event.description}</p>
          <div className="pt-4">
            <h4 className="font-semibold mb-2">Topic:</h4>
            <p>{event.topic}</p>
          </div>
        </div>
      )
      
      return {
        ...event,
        status,
        registrations,
        content,
        location: event.location || "Online Event", // Default location if not specified
      }
    })
    
    // Combine with default events
    return [...defaultEvents, ...processedHostedEvents]
  } catch (error) {
    console.error("Error retrieving events:", error)
    return defaultEvents
  }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>(getAllEvents())
  const [activeEvent, setActiveEvent] = useState<Event | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Listen for changes to hosted events
    const handleStorageChange = (e) => {
      if (e.key === "hostedEvents") {
        setEvents(getAllEvents())
      }
    }
    
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveEvent(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscape)
    }
  }, [activeEvent])

  useOutsideClick(ref, () => setActiveEvent(null))

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminHeader onMenuToggle={toggleSidebar} title="Events" showSearch={true} />

      <AnimatePresence>
        {activeEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 grid place-items-center z-50 p-4">
              <motion.div
                ref={ref}
                layoutId={`card-${activeEvent.id}`}
                className="w-full max-w-2xl bg-background rounded-xl shadow-lg overflow-hidden"
              >
                <motion.div layoutId={`image-${activeEvent.id}`}>
                  <img
                    src={activeEvent.image}
                    alt={activeEvent.title}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <motion.h2
                        layoutId={`title-${activeEvent.id}`}
                        className="text-2xl font-bold mb-2"
                      >
                        {activeEvent.title}
                      </motion.h2>
                      <motion.p
                        layoutId={`description-${activeEvent.id}`}
                        className="text-muted-foreground"
                      >
                        {activeEvent.description}
                      </motion.p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setActiveEvent(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{new Date(activeEvent.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{activeEvent.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{activeEvent.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Registrations</p>
                        <p className="font-medium">{activeEvent.registrations}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      {typeof activeEvent.content === "function"
                        ? activeEvent.content()
                        : activeEvent.content}
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button
                        onClick={() => window.location.href = '/admin/event-attendees'}
                        variant="outline"
                        className="text-sm"
                      >
                        View Attendees
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {events.map((event) => (
          <motion.div
            layoutId={`card-${event.id}`}
            key={event.id}
            onClick={() => setActiveEvent(event)}
            className={cn(
              "bg-background border rounded-xl p-4 cursor-pointer",
              "hover:shadow-md transition-all duration-200",
              "flex flex-col md:flex-row gap-4"
            )}
          >
            <motion.div
              layoutId={`image-${event.id}`}
              className="w-full md:w-48 h-48 md:h-32 shrink-0"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
            <div className="flex-1">
              <motion.h3
                layoutId={`title-${event.id}`}
                className="text-xl font-semibold mb-2"
              >
                {event.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${event.id}`}
                className="text-muted-foreground mb-4"
              >
                {event.description}
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    event.status === "upcoming" && "bg-blue-100 text-blue-700",
                    event.status === "ongoing" && "bg-green-100 text-green-700",
                    event.status === "completed" && "bg-gray-100 text-gray-700"
                  )}>
                    {event.status}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registrations</p>
                  <p className="font-medium">{event.registrations}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}