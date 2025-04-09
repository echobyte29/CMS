import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Calendar, 
  FileImage, 
  CalendarDays, 
  Tag, 
  Info, 
  X, 
  Upload, 
  Edit,
  Eye,
  Share2,
  Save,
  PlusCircle,
  Sparkles,
  HelpCircle,
  Moon,
  Sun
} from "lucide-react"
import { useSidebar } from "@/context/SidebarContext"
import { Sidebar } from "@/components/Sidebar"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import { AdminHeader } from "@/components/AdminHeader"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Event description must be at least 10 characters.",
  }),
  topic: z.string({
    required_error: "Please select an event topic.",
  }),
  date: z.string({
    required_error: "Please select a date and time.",
  }),
  banner: z.any().optional(),
})

const eventTopics = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "UI/UX Design",
  "DevOps",
  "Blockchain",
  "Other",
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

const slideIn = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

export default function HostEventPage() {
  const navigate = useNavigate()
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()
  const { theme, setTheme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [scrollPos, setScrollPos] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create particles on user interaction
  const createParticles = (e: React.MouseEvent<HTMLElement>) => {
    if (particleCount > 30) return // Limit particles for performance
    
    // Only create particles 20% of the time for subtle effect
    if (Math.random() > 0.2) return
    
    setParticleCount(prev => prev + 1)
    const container = containerRef.current
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const particle = document.createElement('div')
    particle.className = 'absolute rounded-full bg-primary/30 dark:bg-primary/50 pointer-events-none'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.width = `${Math.random() * 10 + 5}px`
    particle.style.height = particle.style.width
    particle.style.animation = `float-up ${Math.random() * 2 + 1}s forwards ease-out`
    container.appendChild(particle)
    
    setTimeout(() => {
      container.removeChild(particle)
      setParticleCount(prev => prev - 1)
    }, 3000)
  }

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken")
    if (!adminToken) {
      navigate("/admin/login")
    }
  }, [navigate])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      topic: "",
      date: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Generate a unique event ID
    const eventId = `event_${Date.now()}`
    
    // Create the event object
    const newEvent = {
      id: eventId,
      title: values.name,
      description: values.description,
      date: values.date,
      topic: values.topic,
      image: previewUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      createdAt: new Date().toISOString()
    }
    
    // Generate sample attendees for this event
    const mockNames = [
      "Alex Johnson", "Jamie Smith", "Taylor Brown", "Jordan Lee", 
      "Casey Williams", "Riley Davis", "Sam Wilson", "Morgan Thompson"
    ]
    
    const mockEmails = [
      "alex@example.com", "jamie@example.com", "taylor@example.com", "jordan@example.com",
      "casey@example.com", "riley@example.com", "sam@example.com", "morgan@example.com"
    ]
    
    const statuses = ["confirmed", "pending", "cancelled"]
    
    // Generate a random number of attendees (3-8)
    const attendeeCount = Math.floor(Math.random() * 6) + 3
    
    // Create mock attendees
    const mockAttendees = Array.from({ length: attendeeCount }).map((_, index) => {
      // Use a consistent set of mock data but pick randomly for each attendee
      const nameIndex = Math.floor(Math.random() * mockNames.length)
      
      // Create registration date between today and 7 days ago
      const daysAgo = Math.floor(Math.random() * 7)
      const registrationDate = new Date()
      registrationDate.setDate(registrationDate.getDate() - daysAgo)
      
      return {
        id: `attendee_${Date.now()}_${index}`,
        name: mockNames[nameIndex],
        email: mockEmails[nameIndex],
        registrationDate: registrationDate.toISOString(),
        status: statuses[Math.floor(Math.random() * (statuses.length - 0.1))], // Bias away from cancelled
        eventId: eventId
      }
    })
    
    // Store event data (in a real app this would go to a database)
    try {
      // Get existing events from localStorage or initialize empty array
      const existingEvents = JSON.parse(localStorage.getItem("hostedEvents") || "[]")
      existingEvents.push(newEvent)
      localStorage.setItem("hostedEvents", JSON.stringify(existingEvents))
      
      // Get existing attendees from localStorage or initialize empty array
      const existingAttendees = JSON.parse(localStorage.getItem("eventAttendees") || "[]")
      const updatedAttendees = [...existingAttendees, ...mockAttendees]
      localStorage.setItem("eventAttendees", JSON.stringify(updatedAttendees))
      
      // Trigger storage event to notify other tabs (for demo purposes)
      window.dispatchEvent(new Event("storage"))
      
      toast.success("Event hosted successfully!")
      setTimeout(() => {
        toast("Attendees can now be viewed in the Event Attendees page", {
          description: `${attendeeCount} mock attendees were added to demonstrate functionality.`,
          action: {
            label: "View Attendees",
            onClick: () => navigate("/admin/event-attendees")
          }
        })
        setIsSubmitting(false)
        navigate("/admin/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error saving event:", error)
      toast.error("Failed to host event. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        processFile(file)
      } else {
        toast.error("Please upload an image file")
      }
    }
  }

  const removePreview = () => {
    setPreviewUrl("")
  }

  const formattedDate = form.watch("date") 
    ? new Date(form.watch("date")).toLocaleString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div 
      className="min-h-screen bg-background overflow-hidden"
      onMouseMove={createParticles}
      ref={containerRef}
    >
      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>

      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} className="border-r" />

      {/* Floating Action Menu */}
      <TooltipProvider>
        <motion.div 
          className="fixed right-6 bottom-6 z-50 flex flex-col gap-2 items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex flex-col gap-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="h-5 w-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle Preview</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                  onClick={() => toast.success("Event template saved for later!")}
                >
                  <Save className="h-5 w-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Save Draft</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    >
                      <HelpCircle className="h-5 w-5" />
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="backdrop-blur-md bg-white/50 dark:bg-gray-950/50 border-white/20 dark:border-gray-800/20 shadow-xl">
                    <DialogHeader>
                      <DialogTitle>Hosting Event Tips</DialogTitle>
                      <DialogDescription>Quick guide to create a successful event</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary">01</Badge>
                        <div>
                          <h4 className="font-medium">Compelling Description</h4>
                          <p className="text-sm text-muted-foreground">Be clear about what attendees will learn or experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary">02</Badge>
                        <div>
                          <h4 className="font-medium">Eye-Catching Banner</h4>
                          <p className="text-sm text-muted-foreground">Upload a high-quality image that represents your event</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary">03</Badge>
                        <div>
                          <h4 className="font-medium">Ideal Timing</h4>
                          <p className="text-sm text-muted-foreground">Choose dates and times that work for your target audience</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Event Tips</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </motion.div>
      </TooltipProvider>

      <main
        className={cn(
          "flex justify-center",
          "min-h-screen pt-16 pb-20",
          isSidebarCollapsed 
            ? "ml-[70px] w-[calc(100%-70px)]" 
            : "ml-64 w-[calc(100%-256px)]"
        )}
      >
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="fixed top-[-10rem] right-[-10rem] w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="fixed bottom-[-10rem] left-[-10rem] w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="w-full max-w-4xl px-4 sm:px-6 pt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
            style={{
              transform: `translateY(${scrollPos * 0.1}px)`
            }}
          >
            <motion.div 
              className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4 relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/5"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <Calendar className="h-6 w-6 text-primary relative z-10" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-purple-600">
              Host a New Event
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Create and schedule your next event. Fill in the details below to get started.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="backdrop-blur-sm bg-white/20 dark:bg-gray-950/20 border border-white/20 dark:border-gray-800/20 shadow-xl rounded-2xl overflow-hidden lg:col-span-2"
            >
              <div className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <motion.div custom={0} variants={fadeIn}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <Info className="h-4 w-4 text-primary" />
                              </motion.div>
                              Event Name
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-md blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                                <Input 
                                  placeholder="Enter a catchy name for your event" 
                                  {...field} 
                                  className="bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-800/20 backdrop-blur-xl transition-all focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div custom={1} variants={fadeIn}>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-foreground">
                              <motion.div
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                <FileImage className="h-4 w-4 text-primary" />
                              </motion.div>
                              Event Description
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-md blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                                <Textarea
                                  placeholder="Describe what your event is about"
                                  className="min-h-[120px] bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-800/20 backdrop-blur-xl transition-all focus:ring-2 focus:ring-primary/20"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <div className="flex items-center justify-between mt-1.5">
                              <FormMessage />
                              <div className={cn(
                                "text-xs transition-colors",
                                field.value.length > 0 ? "text-muted-foreground" : "text-transparent",
                                field.value.length > 200 ? "text-amber-500" : "",
                                field.value.length > 500 ? "text-red-500" : ""
                              )}>
                                {field.value.length} / 1000 chars
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div custom={2} variants={fadeIn}>
                        <FormField
                          control={form.control}
                          name="topic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-foreground">
                                <motion.div
                                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <Tag className="h-4 w-4 text-primary" />
                                </motion.div>
                                Event Topic
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-md blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                                    <SelectTrigger className="bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-800/20 backdrop-blur-xl transition-all focus:ring-2 focus:ring-primary/20">
                                      <SelectValue placeholder="Select a topic" />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-white/20 dark:border-gray-800/20">
                                  {eventTopics.map((topic) => (
                                    <SelectItem key={topic} value={topic} className="focus:bg-primary/10">
                                      {topic}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div custom={3} variants={fadeIn}>
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-foreground">
                                <motion.div
                                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <CalendarDays className="h-4 w-4 text-primary" />
                                </motion.div>
                                Date & Time
                              </FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-md blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                                  <Input 
                                    type="datetime-local" 
                                    {...field} 
                                    className="bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-800/20 backdrop-blur-xl transition-all focus:ring-2 focus:ring-primary/20"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                              {formattedDate && (
                                <p className="text-xs text-muted-foreground mt-1.5">{formattedDate}</p>
                              )}
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div custom={4} variants={fadeIn}>
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Upload className="h-4 w-4 text-primary" />
                          </motion.div>
                          Event Banner
                        </FormLabel>
                        {!previewUrl ? (
                          <div
                            className={cn(
                              "border-2 border-dashed rounded-xl p-8 text-center transition-all group cursor-pointer",
                              "bg-white/30 dark:bg-gray-900/30 border-primary/20",
                              dragActive ? "border-primary bg-primary/5" : "hover:bg-primary/5"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="file-upload"
                              />
                            </FormControl>
                            
                            <label 
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center gap-3 cursor-pointer"
                            >
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-4 rounded-full bg-primary/10 text-primary relative"
                              >
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-primary/5"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                  }}
                                />
                                <Upload className="h-6 w-6 relative z-10" />
                              </motion.div>
                              <div className="space-y-1">
                                <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                                  Drag and drop your image here or click to browse
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  Recommended size: 1200 x 630 pixels
                                </div>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="relative mt-2 rounded-xl overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                                  onClick={() => document.getElementById('file-upload')?.click()}
                                >
                                  <Edit className="h-4 w-4 mr-1" /> Change
                                </Button>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30"
                                  onClick={removePreview}
                                >
                                  <X className="h-4 w-4 mr-1" /> Remove
                                </Button>
                              </div>
                            </div>
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-60 object-cover rounded-xl transition-transform group-hover:scale-105 duration-300"
                            />
                          </div>
                        )}
                        <FormDescription>
                          Upload a banner image for your event (optional)
                        </FormDescription>
                      </FormItem>
                    </motion.div>

                    <motion.div custom={5} variants={fadeIn} className="pt-4">
                      <div className="flex gap-4">
                        <motion.div
                          whileHover={{ x: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => navigate("/admin/dashboard")}
                            className="bg-white/40 dark:bg-gray-900/40 border-white/20 dark:border-gray-800/20 backdrop-blur-xl relative group overflow-hidden"
                          >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-500 ease-in-out"></span>
                            Cancel
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground relative group overflow-hidden"
                            disabled={isSubmitting}
                          >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Event...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Host Event
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </motion.div>

            {/* Live Preview Panel */}
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="backdrop-blur-md bg-white/20 dark:bg-gray-950/20 border border-white/20 dark:border-gray-800/20 shadow-xl rounded-2xl overflow-hidden h-fit sticky top-24"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Eye className="h-4 w-4 text-primary" />
                        Live Preview
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPreview(false)}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    <div className="space-y-4">
                      {previewUrl && (
                        <div className="w-full rounded-xl overflow-hidden aspect-video">
                          <img
                            src={previewUrl}
                            alt="Event banner preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        <h4 className="font-medium text-lg leading-tight">
                          {form.watch("name") || "Your Event Name"}
                        </h4>
                        {formattedDate && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>{formattedDate}</span>
                          </div>
                        )}
                      </div>
                      
                      {form.watch("topic") && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                          {form.watch("topic")}
                        </Badge>
                      )}
                      
                      {form.watch("description") && (
                        <p className="text-sm text-muted-foreground line-clamp-4">
                          {form.watch("description")}
                        </p>
                      )}
                      
                      {!form.watch("name") && !form.watch("description") && !previewUrl && (
                        <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
                          <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                          <p className="text-sm">Fill in the form to see a preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}