"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Search, Filter, Menu, Loader2, RefreshCw, UserPlus, LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/ThemeToggle"
import { AdminHeader } from "@/components/AdminHeader"
import { AdminLayout } from "@/components/AdminLayout"

// Mock data
const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    branch: "Computer Science",
    year: "3rd Year",
    registrationDate: "2023-04-01",
    status: "Pending",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=2563eb`
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    branch: "Electronics",
    year: "2nd Year",
    registrationDate: "2023-04-02",
    status: "Pending",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=JS&backgroundColor=8b5cf6`
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    branch: "Information Technology",
    year: "4th Year",
    registrationDate: "2023-04-03",
    status: "Pending",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=AJ&backgroundColor=ec4899`
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    branch: "Computer Science",
    year: "1st Year",
    registrationDate: "2023-04-04",
    status: "Pending",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=SW&backgroundColor=10b981`
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    branch: "Mechanical",
    year: "3rd Year",
    registrationDate: "2023-04-05",
    status: "Pending",
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=MB&backgroundColor=f97316`
  },
]

type Member = {
  id: number
  name: string
  email: string
  branch: string
  year: string
  registrationDate: string
  status: "Pending" | "Approved" | "Rejected"
  avatar: string
}

export default function ApproveMember() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [view, setView] = useState<"table" | "card">("table")
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Count members by status
  const statusCounts = members.reduce((acc, member) => {
    const status = member.status.toLowerCase()
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Filter members based on search query and status filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.branch.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter === "all" ||
      member.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (memberId: number, newStatus: "Approved" | "Rejected") => {
    setIsProcessing(memberId)
    
    // Simulate API call
    setTimeout(() => {
      setMembers(prev => 
        prev.map(member => 
          member.id === memberId ? { ...member, status: newStatus } : member
        )
      )
      
      const member = members.find(m => m.id === memberId)
      
      if (member) {
        toast({
          title: newStatus === "Approved" ? "Member Approved" : "Member Rejected",
          description: `${member.name} has been ${newStatus.toLowerCase()} successfully.`,
          variant: newStatus === "Approved" ? "default" : "destructive",
        })
      }
      
      setIsProcessing(null)
    }, 600)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Just simulate a refresh
      setIsLoading(false)
    }, 800)
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-400"
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-400"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  // Framer motion variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      } 
    }),
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      } 
    }),
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.2
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-1">Approve Members</h1>
      <p className="text-muted-foreground mb-8">Review and approve membership requests</p>
      
      <div className="space-y-6">
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Total Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserPlus className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{members.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{statusCounts.pending || 0}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/10 border border-green-200 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Approved Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">{statusCounts.approved || 0}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for filtering */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              setStatusFilter(value)
            }}
            className="mb-6"
          >
            <TabsList className="bg-muted/50 dark:bg-muted/30 p-1 rounded-lg">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background rounded-md transition-all"
              >
                All
                <Badge variant="outline" className="ml-2 bg-muted">
                  {members.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-background rounded-md transition-all"
              >
                Pending
                <Badge variant="outline" className="ml-2 bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 text-yellow-700 dark:text-yellow-300">
                  {statusCounts.pending || 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-background rounded-md transition-all"
              >
                Approved
                <Badge variant="outline" className="ml-2 bg-green-100 dark:bg-green-900/40 border-green-300 text-green-700 dark:text-green-300">
                  {statusCounts.approved || 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-background rounded-md transition-all"
              >
                Rejected
                <Badge variant="outline" className="ml-2 bg-red-100 dark:bg-red-900/40 border-red-300 text-red-700 dark:text-red-300">
                  {statusCounts.rejected || 0}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, email or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-muted/50 focus:border-primary/50 bg-muted/5"
            />
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              className="border-muted/50"
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
            <div className="flex items-center gap-2 border rounded-md p-1 bg-muted/50 dark:bg-muted/20">
              <Button 
                variant={view === "table" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setView("table")}
                className="gap-1"
              >
                <LayoutList className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Table</span>
              </Button>
              <Button 
                variant={view === "card" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setView("card")}
                className="gap-1"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline-block">Cards</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 bg-muted/10 rounded-lg border border-dashed">
            <Loader2 className="h-8 w-8 text-primary/60 animate-spin mb-2" />
            <p className="text-muted-foreground">Loading member data...</p>
          </div>
        )}

        {/* No results message */}
        {!isLoading && filteredMembers.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 border rounded-lg bg-muted/5 border-dashed"
          >
            <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-25" />
            <p className="text-muted-foreground mb-2">No members found matching your filters.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                setSearchQuery("")
                setStatusFilter("all")
                setActiveTab("all")
              }}
            >
              Clear filters
            </Button>
          </motion.div>
        )}

        {/* Table View */}
        {!isLoading && view === "table" && filteredMembers.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="rounded-md border overflow-hidden shadow-sm bg-card backdrop-blur-sm"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Reg. Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      custom={index}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="group hover:bg-muted/50 border-b"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden border border-muted flexshrink-0">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{member.branch}</TableCell>
                      <TableCell>{member.year}</TableCell>
                      <TableCell>{formatDate(member.registrationDate)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("px-2 py-1 transition-colors", getStatusBadgeStyle(member.status))}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.status === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isProcessing === member.id}
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 dark:border-green-800 dark:hover:bg-green-950 transition-all duration-200"
                              onClick={() => handleStatusChange(member.id, "Approved")}
                            >
                              {isProcessing === member.id ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : (
                                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                              )}
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isProcessing === member.id}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 transition-all duration-200"
                              onClick={() => handleStatusChange(member.id, "Rejected")}
                            >
                              {isProcessing === member.id ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              ) : (
                                <XCircle className="mr-1 h-3.5 w-3.5" />
                              )}
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No actions available</span>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>
        )}

        {/* Card View */}
        {!isLoading && view === "card" && filteredMembers.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  layout
                >
                  <Card className="overflow-hidden h-full border-muted/60 bg-card/60 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-muted flex-shrink-0">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <Badge variant="outline" className={cn("px-2 py-1", getStatusBadgeStyle(member.status))}>
                              {member.status}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm">{member.email}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 text-sm">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Branch</p>
                          <p className="font-medium">{member.branch}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Year</p>
                          <p className="font-medium">{member.year}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Registration Date</p>
                          <p className="font-medium">{formatDate(member.registrationDate)}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 pb-3 bg-muted/20 border-t border-muted/30">
                      {member.status === "Pending" ? (
                        <div className="flex items-center gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isProcessing === member.id}
                            className="flex-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 dark:border-green-800 dark:hover:bg-green-950 transition-all duration-200 rounded-md shadow-sm"
                            onClick={() => handleStatusChange(member.id, "Approved")}
                          >
                            {isProcessing === member.id ? (
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                              <CheckCircle className="mr-1 h-3.5 w-3.5" />
                            )}
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isProcessing === member.id}
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950 transition-all duration-200 rounded-md shadow-sm"
                            onClick={() => handleStatusChange(member.id, "Rejected")}
                          >
                            {isProcessing === member.id ? (
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                              <XCircle className="mr-1 h-3.5 w-3.5" />
                            )}
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-center w-full text-muted-foreground">
                          No actions available
                        </p>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  )
}