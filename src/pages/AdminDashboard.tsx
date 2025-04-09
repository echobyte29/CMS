"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Calendar,
  Users,
  UserPlus,
  ArrowRight,
  Activity,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  BarChart3,
  TrendingUp,
  Settings,
  Menu,
  Bell,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/Sidebar"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/context/SidebarContext"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem("adminToken")
    if (!adminToken) {
      navigate("/admin/login")
    }
  }, [navigate])

  const adminUser = {
    name: "John Doe",
    role: "Admin",
    id: "ACM2024001",
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleNavigation = (href) => {
    navigate(href)
    scrollToTop()
  }

  const quickLinks = [
    { name: "Home", href: "/admin/dashboard" },
    { name: "Host Event", href: "/admin/host-event" },
    { name: "Approve Members", href: "/admin/approve" },
    { name: "View Members", href: "/admin/view-members" },
    { name: "Contact", href: "/admin/contact" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} className="border-r fixed top-0 left-0 h-screen z-40" />

      <main
        className={cn(
          "flex justify-center",
          "min-h-screen",
          isSidebarCollapsed 
            ? "ml-[80px] w-[calc(100%-80px)]" 
            : "ml-[260px] w-[calc(100%-260px)]"
        )}
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
          {/* Fixed Header with Toggle */}
          <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b shadow-md flex items-center px-4 md:px-6">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 hover:bg-background/90 transition-colors">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1 flex items-center">
              <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mr-6">ACM Admin Portal</h2>
              
              {/* Search Bar - Material Dashboard Pro inspired */}
              <div className="relative hidden md:flex items-center max-w-xs flex-1">
                <div className="absolute left-3 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full h-9 pl-9 pr-4 rounded-full text-sm bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full animate-pulse border-2 border-background"></span>
              </Button>
              <ThemeToggle />
              <div className="hidden sm:block h-6 w-px bg-border mx-1"></div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                  {adminUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block text-sm">
                  <p className="font-medium leading-none">{adminUser.name}</p>
                  <p className="text-xs text-muted-foreground">{adminUser.role}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-1 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all rounded-full w-9 px-0 md:w-auto md:px-3">
                <span className="hidden md:inline">Log out</span>
                <LogOut className="h-4 w-4 md:hidden" />
              </Button>
            </div>
          </div>
          
          {/* Hero Section - More compact and professional like Material Dashboard Pro */}
          <div className="mb-10 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl blur-xl opacity-70"></div>
            <div className="absolute -z-10 inset-0 opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="text-primary">
                <defs>
                  <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                    <circle cx="1" cy="1" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
              </svg>
            </div>
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary/80 to-purple-600"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2 bg-slate-100 dark:bg-slate-800/60 rounded-full px-3 py-1 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Active Session</span>
                    <span className="text-primary font-medium">•</span>
                    <span className="text-primary font-medium">ID: {adminUser.id}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">{adminUser.name}</span>
                  </h1>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Manage your ACM Student Chapter activities and members with powerful analytics and tools
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md rounded-lg relative overflow-hidden group h-10"
                    onClick={() => navigate('/admin/host-event')}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    Host Event 
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-background/50 backdrop-blur-sm border-muted-foreground/20 shadow-sm h-10"
                    onClick={() => navigate('/admin/analytics')}
                  >
                    Analytics
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon"
                    variant="ghost" 
                    className="rounded-full h-10 w-10 border border-muted-foreground/10 bg-background/50 backdrop-blur-sm"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-10">
            {/* Quick Stats - More Material-like cards with improved visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">3</h3>
                          <span className="text-xs text-muted-foreground">events</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline">
                        Active
                      </Badge>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <Separator className="my-2 opacity-50" />
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Updated 1 hour ago</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-primary/5 -mr-2 group-hover:bg-primary/10 transition-colors" onClick={() => navigate('/admin/host-event')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
                        <UserPlus className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-bold mt-1 text-green-500 group-hover:scale-110 transition-transform">5</h3>
                          <span className="text-xs text-muted-foreground">requests</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline">
                        +2 new
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-2 opacity-50" />
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Updated 30 minutes ago</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-green-500/5 -mr-2 group-hover:bg-green-500/10 transition-colors" onClick={() => navigate('/admin/approve')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-bold mt-1 text-blue-500 group-hover:scale-110 transition-transform">128</h3>
                          <span className="text-xs text-muted-foreground">active</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-500 font-medium group-hover:scale-110 transition-transform">+12%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <Separator className="my-2 opacity-50" />
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Updated today</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-blue-500/5 -mr-2 group-hover:bg-blue-500/10 transition-colors" onClick={() => navigate('/admin/view-members')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                        <BarChart3 className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Event Attendance</p>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-bold mt-1 text-purple-500 group-hover:scale-110 transition-transform">87%</h3>
                          <span className="text-xs text-muted-foreground">average</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline">
                        Updated
                      </Badge>
                    </div>
                  </div>
                  <Separator className="my-2 opacity-50" />
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Based on last 5 events</span>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs hover:bg-purple-500/5 -mr-2 group-hover:bg-purple-500/10 transition-colors" onClick={() => navigate('/admin/analytics')}>
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Data Visualization Section - Material Dashboard Pro inspired */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>Event Participation</CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="my-3" />
                  <div className="h-[240px] mt-2 relative overflow-hidden rounded-lg">
                    {/* Chart placeholder - in a real app, use a charting library */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <div className="h-full w-full flex items-end justify-around pb-8 px-4">
                      <div className="relative group">
                        <div 
                          className="w-12 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-md transition-all group-hover:bg-primary/80"
                          style={{ height: '65%' }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          65% (Jan)
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">Jan</div>
                      </div>
                      <div className="relative group">
                        <div 
                          className="w-12 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-md transition-all group-hover:bg-primary/80"
                          style={{ height: '78%' }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          78% (Feb)
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">Feb</div>
                      </div>
                      <div className="relative group">
                        <div 
                          className="w-12 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-md transition-all group-hover:bg-primary/80"
                          style={{ height: '85%' }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          85% (Mar)
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">Mar</div>
                      </div>
                      <div className="relative group">
                        <div 
                          className="w-12 bg-gradient-to-t from-purple-500/90 to-purple-500/50 rounded-t-md transition-all group-hover:bg-purple-500/80"
                          style={{ height: '92%' }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          92% (Apr)
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">Apr</div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                    <div className="absolute left-0 bottom-0 top-0 w-px bg-border"></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-3 w-3 rounded-sm bg-primary"></span>
                        <span className="text-sm">Current Year</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Average Participation: 80%</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 bg-background/50 border-border hover:bg-background/80" onClick={() => navigate('/admin/analytics')}>
                      Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-xl">
                        <UserPlus className="h-5 w-5 text-green-500" />
                      </div>
                      <CardTitle>Membership Growth</CardTitle>
                    </div>
                    <Badge variant="outline">
                      +28% ↑
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="my-3" />
                  <div className="h-[240px] mt-2 relative overflow-hidden rounded-lg">
                    {/* Chart placeholder - in a real app, use a charting library */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
                    <div className="relative h-full w-full">
                      <div className="absolute bottom-8 left-0 right-0 h-px bg-border/50"></div>
                      <div className="absolute bottom-16 left-0 right-0 h-px bg-border/30"></div>
                      <div className="absolute bottom-24 left-0 right-0 h-px bg-border/30"></div>
                      <div className="absolute bottom-32 left-0 right-0 h-px bg-border/30"></div>
                      <div className="absolute bottom-40 left-0 right-0 h-px bg-border/30"></div>
                      
                      {/* Line chart - simplified representation */}
                      <svg className="absolute inset-0 w-full h-full px-4 pb-8" viewBox="0 0 400 200" preserveAspectRatio="none">
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(22, 163, 74, 0.5)" />
                          <stop offset="100%" stopColor="rgba(22, 163, 74, 0)" />
                        </linearGradient>
                        
                        {/* Fill area */}
                        <path 
                          d="M0,140 C40,120 60,150 100,100 C140,50 180,80 220,60 C260,40 300,20 400,10 L400,200 L0,200 Z" 
                          fill="url(#lineGradient)" 
                        />
                        
                        {/* Line */}
                        <path 
                          d="M0,140 C40,120 60,150 100,100 C140,50 180,80 220,60 C260,40 300,20 400,10" 
                          fill="none" 
                          stroke="#16a34a" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                        />
                        
                        {/* Data points */}
                        <circle cx="0" cy="140" r="5" fill="#16a34a" />
                        <circle cx="100" cy="100" r="5" fill="#16a34a" />
                        <circle cx="220" cy="60" r="5" fill="#16a34a" />
                        <circle cx="400" cy="10" r="5" fill="#16a34a" />
                      </svg>
                      
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="h-3 w-3 rounded-sm bg-green-500"></span>
                        <span className="text-sm">New Members</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total new: 87 this year</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 bg-background/50 border-border hover:bg-background/80" onClick={() => navigate('/admin/view-members')}>
                      Member Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions Grid - Material Pro inspired cards */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Quick Actions</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-purple-600"></span>
                </h2>
                <Button variant="outline" size="sm" className="rounded-lg bg-background/50 backdrop-blur-sm border-muted-foreground/20 shadow-sm">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Host Event Card */}
                <Card className="border hover:border-primary/30 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden group">
                  <CardHeader className="relative pb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shadow-sm">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Host Event</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <Separator className="my-3" />
                    <p className="text-sm text-muted-foreground mb-4 mt-2">Create and schedule a new event for your members</p>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/90 p-0 group/btn"
                      onClick={() => navigate('/admin/host-event')}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Approve Members Card */}
                <Card className="border hover:border-green-500/30 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden group">
                  <CardHeader className="relative pb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors shadow-sm">
                          <UserPlus className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle className="text-lg">Approve Members</CardTitle>
                      </div>
                      <Badge variant="outline">
                        5 Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <Separator className="my-3" />
                    <p className="text-sm text-muted-foreground mb-4 mt-2">Review and approve new member applications</p>
                    <Button
                      variant="ghost"
                      className="text-green-500 hover:text-green-600 p-0 group/btn"
                      onClick={() => navigate('/admin/approve')}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>

                {/* View Members Card */}
                <Card className="border hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden group">
                  <CardHeader className="relative pb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors shadow-sm">
                        <Users className="h-5 w-5 text-blue-500" />
                      </div>
                      <CardTitle className="text-lg">View Members</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-2">
                    <Separator className="my-3" />
                    <p className="text-sm text-muted-foreground mb-4 mt-2">Access and manage your chapter's member database</p>
                    <Button
                      variant="ghost"
                      className="text-blue-500 hover:text-blue-600 p-0 group/btn"
                      onClick={() => navigate('/admin/view-members')}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <Card className="p-8 hover:shadow-xl transition-all duration-300 shadow-md rounded-xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Recent Activity</span>
                  </h2>
                </div>
                <Badge variant="secondary">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Live Updates
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 backdrop-blur-sm transition-colors group border border-muted/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                      <UserPlus className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">New member registration</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn bg-background/50 backdrop-blur-sm rounded-lg">
                    View
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 backdrop-blur-sm transition-colors group border border-muted/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Event updated</p>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn bg-background/50 backdrop-blur-sm rounded-lg">
                    View
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 backdrop-blur-sm transition-colors group border border-muted/20 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                      <Settings className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">System settings updated</p>
                      <p className="text-sm text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group/btn bg-background/50 backdrop-blur-sm rounded-lg">
                    View
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="rounded-lg backdrop-blur-sm bg-background/50 border-muted-foreground/20 hover:border-muted-foreground/40">View All Activity</Button>
              </div>
            </Card>

            {/* Footer */}
            <footer className="mt-20 pt-10 pb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none"></div>
              <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md">
                      A
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">ACM</span>
                      <span className="text-xs text-muted-foreground">Admin Portal</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Empowering the next generation of computing professionals through education, networking, and
                    career development opportunities.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-colors">
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg relative inline-block">
                    <span>Quick Links</span>
                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/30"></span>
                  </h3>
                  <nav className="flex flex-col gap-2">
                    {quickLinks.map((link) => (
                      <Button 
                        key={link.href} 
                        variant="link" 
                        className="justify-start p-0 h-auto font-normal hover:text-primary transition-colors"
                        onClick={() => handleNavigation(link.href)}
                      >
                        {link.name}
                      </Button>
                    ))}
                  </nav>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg relative inline-block">
                    <span>Stay Updated</span>
                    <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/30"></span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter for the latest updates and announcements.
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter your email" 
                      className="max-w-[240px] rounded-lg bg-background/50 border-muted-foreground/20 focus:border-primary/50" 
                    />
                    <Button className="rounded-lg shadow-md">Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </div>
              </div>

              <Separator className="my-8 opacity-50" />

              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">© 2025 ACM Student Chapter. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="link" 
                    className="text-sm text-muted-foreground p-0 h-auto hover:text-primary transition-colors"
                    onClick={() => handleNavigation("/admin/privacy-policy")}
                  >
                    Privacy Policy
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-sm text-muted-foreground p-0 h-auto hover:text-primary transition-colors"
                    onClick={() => handleNavigation("/admin/terms-of-service")}
                  >
                    Terms of Service
                  </Button>
                  <Button 
                    variant="link" 
                    className="text-sm text-muted-foreground p-0 h-auto hover:text-primary transition-colors"
                    onClick={() => handleNavigation("/admin/cookie-policy")}
                  >
                    Cookie Policy
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  )
}

