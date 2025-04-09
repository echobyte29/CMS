import { useState, useEffect } from "react"
import { useSidebar } from "@/context/SidebarContext"
import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  Download, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  FileDown, 
  X,
  ChevronDown,
  UserCheck,
  Users,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { format } from "date-fns"
import { AdminHeader } from "@/components/AdminHeader"
import { AdminLayout } from "@/components/AdminLayout"
import { motion, AnimatePresence } from "framer-motion"
import { Check, User, Mail, Clock } from "lucide-react"

interface Attendee {
  id: string
  name: string
  email: string
  registrationDate: string
  status: "confirmed" | "pending" | "cancelled"
  eventId: string
}

interface Event {
  id: string
  title: string
  date: string
  description?: string
}

// Function to retrieve events from localStorage or use sample data
const getEvents = (): Event[] => {
  try {
    // Get hosted events from localStorage
    const hostedEvents = JSON.parse(localStorage.getItem("hostedEvents") || "[]")
    
    // Combine with sample events
    return [...sampleEvents, ...hostedEvents]
  } catch (error) {
    console.error("Error parsing stored events:", error)
    return sampleEvents
  }
}

// Sample data
const sampleEvents: Event[] = [
  { id: "1", title: "Web Development Workshop", date: "2024-04-15", description: "Learn modern web development techniques" },
  { id: "2", title: "AI/ML Symposium", date: "2024-04-20", description: "Exploring the future of artificial intelligence" },
  { id: "3", title: "Cybersecurity Workshop", date: "2024-04-25", description: "Essential security practices for developers" },
]

// Function to retrieve attendees from localStorage or use sample data
const getAttendees = (): Attendee[] => {
  const storedAttendees = localStorage.getItem("eventAttendees")
  
  if (storedAttendees) {
    try {
      // Combine stored attendees with sample attendees
      const parsedAttendees = JSON.parse(storedAttendees)
      return [...sampleAttendees, ...parsedAttendees]
    } catch (error) {
      console.error("Error parsing stored attendees:", error)
      return sampleAttendees
    }
  }
  
  return sampleAttendees
}

// Sample attendee data
const sampleAttendees: Attendee[] = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john.doe@example.com", 
    registrationDate: "2024-04-01", 
    status: "confirmed",
    eventId: "1" 
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    registrationDate: "2024-04-02", 
    status: "confirmed",
    eventId: "1" 
  },
  { 
    id: "3", 
    name: "Bob Johnson", 
    email: "bob.johnson@example.com", 
    registrationDate: "2024-04-03", 
    status: "pending",
    eventId: "1" 
  },
  { 
    id: "4", 
    name: "Alice Brown", 
    email: "alice.brown@example.com", 
    registrationDate: "2024-04-05", 
    status: "confirmed",
    eventId: "2" 
  },
  { 
    id: "5", 
    name: "Charlie Wilson", 
    email: "charlie.wilson@example.com", 
    registrationDate: "2024-04-06", 
    status: "cancelled",
    eventId: "2" 
  },
  { 
    id: "6", 
    name: "Diana Miller", 
    email: "diana.miller@example.com", 
    registrationDate: "2024-04-07", 
    status: "confirmed",
    eventId: "3" 
  },
]

export default function EventAttendees() {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()
  
  // Load events from localStorage
  const [events, setEvents] = useState(getEvents())
  // Initialize with no event selected
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [attendeesList, setAttendeesList] = useState(getAttendees())
  const [filteredAttendees, setFilteredAttendees] = useState([])
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState(["confirmed"])
  const [showAllStatuses, setShowAllStatuses] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  
  // Check if there are new attendees since last visit
  const [hasNewAttendees, setHasNewAttendees] = useState(false)
  
  useEffect(() => {
    // Listen for new registrations from HostEvent page
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "eventAttendees") {
        setAttendeesList(getAttendees())
        setHasNewAttendees(true)
        toast.info("New event registrations detected")
      } else if (e.key === "hostedEvents") {
        setEvents(getEvents())
      }
    }
    
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    // Only filter attendees if an event is selected
    if (!selectedEvent) {
      setFilteredAttendees([]);
      return;
    }
    
    // Apply all filters
    const filtered = attendeesList.filter(attendee => {
      // Event filter
      const matchesEvent = attendee.eventId === selectedEvent
      
      // Search filter
      const matchesSearch = 
        searchQuery.trim() === "" || 
        attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Status filter - if showAllStatuses is false, only show confirmed by default
      const matchesStatus = 
        (showAllStatuses && statusFilter.length === 0) || 
        statusFilter.includes(attendee.status)
      
      // Date filter
      let matchesDate = true
      const registrationDate = new Date(attendee.registrationDate)
      const today = new Date()
      
      if (dateFilter === "today") {
        matchesDate = 
          registrationDate.getDate() === today.getDate() &&
          registrationDate.getMonth() === today.getMonth() &&
          registrationDate.getFullYear() === today.getFullYear()
      } else if (dateFilter === "thisWeek") {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(today.getDate() - 7)
        matchesDate = registrationDate >= oneWeekAgo
      } else if (dateFilter === "thisMonth") {
        matchesDate = 
          registrationDate.getMonth() === today.getMonth() &&
          registrationDate.getFullYear() === today.getFullYear()
      }
      
      return matchesEvent && matchesSearch && matchesStatus && matchesDate
    })
    
    setFilteredAttendees(filtered)
  }, [selectedEvent, searchQuery, statusFilter, dateFilter, attendeesList, showAllStatuses])

  // Function to convert attendees data to CSV format
  const convertToCSV = (data: Attendee[]) => {
    if (data.length === 0) {
      return "No data available"
    }

    // CSV header - no need for event column since we're filtering by event
    const header = ["Name", "Email", "Registration Date", "Status"]
    
    // Convert each attendee to a CSV row
    const rows = data.map(attendee => {
      return [
        attendee.name,
        attendee.email,
        new Date(attendee.registrationDate).toLocaleDateString(),
        attendee.status
      ]
    })
    
    // Combine header and rows
    return [header, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
  }

  // Function to download CSV file for attendees
  const downloadCSV = () => {
    if (filteredAttendees.length === 0) {
      toast.error("No attendees to download")
      return
    }
    
    // Convert data to CSV format
    const csvContent = convertToCSV(filteredAttendees)
    
    // Create a filename that includes the event name
    const event = events.find(e => e.id === selectedEvent)
    // Create a sanitized filename from the event title
    const sanitizedTitle = event ? event.title.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'event'
    const filename = `${sanitizedTitle}_attendees.csv`
    
    // Create and download the file
    downloadFile(csvContent, filename)
    
    toast.success("CSV downloaded successfully")
  }
  
  // Helper function to download a file
  const downloadFile = (content: string, filename: string) => {
    // Create a Blob with the CSV content
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    
    // Create a temporary download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    
    // Trigger the download
    document.body.appendChild(link)
    link.click()
    
    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Get the current event title
  const getCurrentEventTitle = () => {
    if (!selectedEvent) {
      return "Select an event to view attendees"
    }
    
    const event = events.find(e => e.id === selectedEvent)
    return event ? event.title : "Unknown Event"
  }
  
  // Get the event date
  const getEventDate = () => {
    if (!selectedEvent) return null
    
    const event = events.find(e => e.id === selectedEvent)
    return event ? new Date(event.date) : null
  }
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    // Reset status filter to only "confirmed" unless showing all
    setStatusFilter(showAllStatuses ? [] : ["confirmed"])
    setDateFilter("all")
  }
  
  // Toggle a status filter
  const toggleStatusFilter = (status: string) => {
    // If it's the only status selected and being toggled off, check if we should reset to confirmed only
    if (statusFilter.length === 1 && statusFilter.includes(status) && !showAllStatuses) {
      setStatusFilter(["confirmed"])
      return
    }
    
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    )
  }
  
  // Toggle showing all statuses
  const toggleShowAllStatuses = () => {
    if (showAllStatuses) {
      // If turning off show all, reset to only confirmed
      setShowAllStatuses(false)
      setStatusFilter(["confirmed"])
    } else {
      // If turning on show all, clear status filters
      setShowAllStatuses(true)
      setStatusFilter([])
    }
  }
  
  // Get the count of attendees by status
  const getStatusCount = (status: string): number => {
    if (!selectedEvent) return 0;
    
    return attendeesList.filter(
      attendee => attendee.eventId === selectedEvent && attendee.status === status
    ).length;
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar} 
          className="border-r" 
        />
        
        <main className={cn(
          "flex-1 transition-all duration-300 flex flex-col",
          isSidebarCollapsed ? "pl-[70px]" : "pl-64"
        )}>
          <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
            <AdminHeader onMenuToggle={toggleSidebar} title="Event Attendees" showSearch={true} />
            
            {/* Event Selection Section */}
            <div className="border p-6 rounded-lg mb-8 bg-muted/5 shadow-sm w-full">
              <div className="flex flex-col space-y-2">
                <h2 className="text-lg font-medium mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Select an Event
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose an event to view its registered attendees
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {events.map(event => {
                    const confirmedCount = attendeesList.filter(
                      a => a.eventId === event.id && a.status === "confirmed"
                    ).length;
                    return (
                      <div 
                        key={event.id}
                        className={cn(
                          "border rounded-lg p-6 cursor-pointer transition-all shadow-lg",
                          selectedEvent === event.id 
                            ? "bg-primary/10 border-primary/30 shadow-md" 
                            : "hover:bg-muted/20 hover:border-muted/50"
                        )}
                        onClick={() => setSelectedEvent(event.id)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-center">{event.title}</h3>
                          {selectedEvent === event.id && <UserCheck className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-2 text-center">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(event.date), "MMM d, yyyy")}
                          </div>
                          {confirmedCount > 0 && (
                            <span className="text-xs bg-green-50 text-green-700 border-green-200 rounded-full px-2 py-1">
                              <Badge variant="outline">
                                {confirmedCount} confirmed
                              </Badge>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Attendees Section - only shown if an event is selected */}
            {selectedEvent ? (
              <>
                {/* Event action buttons */}
                <div className="flex justify-end mb-4">
                  <Button variant="outline" onClick={downloadCSV} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download CSV
                  </Button>
                </div>
                
                {/* Filters Section */}
                <div className="border p-4 rounded-lg mb-6 bg-muted/10 w-full">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="md:w-1/3">
                      <Label htmlFor="search" className="text-sm mb-2 block">Search Attendees</Label>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search by name or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    {/* Registration Date Filter */}
                    <div>
                      <Label htmlFor="dateFilter" className="text-sm mb-2 block">Registration Date</Label>
                      <Select
                        value={dateFilter}
                        onValueChange={setDateFilter}
                      >
                        <SelectTrigger id="dateFilter" className="min-w-[150px]">
                          <SelectValue placeholder="Filter by date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Dates</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                          <SelectItem value="thisMonth">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Status Filter Popover */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="min-w-[150px]">
                          <Filter className="mr-2 h-4 w-4" />
                          {showAllStatuses ? "All Statuses" : "Confirmed Only"}
                          {statusFilter.length > 0 && statusFilter.length < 3 && (
                            <span className="ml-2 bg-primary text-xs">
                              <Badge>{statusFilter.length}</Badge>
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Attendee Status</h4>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={toggleShowAllStatuses}
                              className="h-8 text-xs px-2"
                            >
                              {showAllStatuses ? "Show confirmed only" : "Show all statuses"}
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="confirmed" 
                                checked={statusFilter.includes("confirmed")}
                                onCheckedChange={() => toggleStatusFilter("confirmed")}
                              />
                              <Label htmlFor="confirmed" className={cn(
                                "flex items-center justify-between flex-1 cursor-pointer"
                              )}>
                                <span className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                                  <Badge>
                                    Confirmed
                                  </Badge>
                                </span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="pending" 
                                checked={statusFilter.includes("pending")}
                                onCheckedChange={() => toggleStatusFilter("pending")}
                                disabled={!showAllStatuses}
                              />
                              <Label htmlFor="pending" className={cn(
                                "flex items-center justify-between flex-1",
                                showAllStatuses ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                              )}>
                                <span className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">
                                  <Badge>
                                    Pending
                                  </Badge>
                                </span>
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="cancelled" 
                                checked={statusFilter.includes("cancelled")}
                                onCheckedChange={() => toggleStatusFilter("cancelled")}
                                disabled={!showAllStatuses}
                              />
                              <Label htmlFor="cancelled" className={cn(
                                "flex items-center justify-between flex-1",
                                showAllStatuses ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                              )}>
                                <span className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
                                  <Badge>
                                    Cancelled
                                  </Badge>
                                </span>
                              </Label>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    {/* Clear Filters Button */}
                    {(statusFilter.length === 0 || 
                      (statusFilter.length === 1 && statusFilter[0] !== "confirmed") || 
                      statusFilter.length > 1 || 
                      searchQuery || 
                      dateFilter !== 'all') && (
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        className="h-10"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Attendees Table */}
                {filteredAttendees.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Registration Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAttendees.map((attendee) => (
                          <TableRow key={attendee.id}>
                            <TableCell className="font-medium">{attendee.name}</TableCell>
                            <TableCell>{attendee.email}</TableCell>
                            <TableCell>{format(new Date(attendee.registrationDate), "MMM d, yyyy")}</TableCell>
                            <TableCell>
                              <span className={cn(
                                "capitalize text-xs",
                                attendee.status === "confirmed" && "bg-green-100 text-green-800 hover:bg-green-100",
                                attendee.status === "pending" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                                attendee.status === "cancelled" && "bg-red-100 text-red-800 hover:bg-red-100"
                              )}>
                                <Badge>
                                  {attendee.status}
                                </Badge>
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20 w-full">
                    <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {showAllStatuses || !statusFilter.includes("confirmed") 
                        ? "No attendees found with the selected status" 
                        : "No confirmed attendees found for this event"}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchQuery || (statusFilter.length > 0 && !statusFilter.includes("confirmed")) || dateFilter !== 'all' 
                        ? "Try changing your filters"
                        : showAllStatuses 
                          ? "Try selecting a different status"
                          : <>There might be <Button variant="link" className="px-1 h-auto text-sm" onClick={toggleShowAllStatuses}>pending or cancelled</Button> registrations</>
                      }
                    </p>
                    {(statusFilter.length === 0 || 
                      (statusFilter.length === 1 && statusFilter[0] !== "confirmed") || 
                      statusFilter.length > 1 || 
                      searchQuery || 
                      dateFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="mt-4"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 border rounded-lg bg-muted/20 w-full">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No Event Selected</p>
                <p className="text-muted-foreground mb-8">Please select an event from the list above to view its attendees</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}