"use client"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  BarChart3,
  Bell,
  LayoutDashboard,
  Menu,
  X,
  ChevronRight,
  UserPlus,
  Layers,
  Home,
  ChevronDown,
  FileText,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useNotifications } from "@/context/NotificationContext"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
  onToggle: () => void
}

interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
  color: string
  bgColor: string
  submenu?: MenuItem[]
  badge?: string
}

export function Sidebar({ className, isCollapsed: isCollapsedProp, onToggle }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedProp)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openSections, setOpenSections] = useState([] as string[])
  const { unreadCount } = useNotifications()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsCollapsed(isCollapsedProp)
  }, [isCollapsedProp])

  useEffect(() => {
    // Open the section that contains the active page
    const currentPath = location.pathname
    menuSections.forEach(section => {
      if (section.submenu) {
        const hasActiveChild = section.submenu.some(item => 
          currentPath === item.href || currentPath.startsWith(item.href + '/')
        )
        if (hasActiveChild) {
          setOpenSections(prev => prev.includes(section.label) ? prev : [...prev, section.label])
        }
      }
    })
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  const toggleSection = (sectionLabel: string) => {
    setOpenSections(prev => 
      prev.includes(sectionLabel) 
        ? prev.filter(item => item !== sectionLabel)
        : [...prev, sectionLabel]
    )
  }

  const menuSections: MenuItem[] = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: "/admin/dashboard",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    { 
      icon: Users, 
      label: "Members", 
      href: "#",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      submenu: [
        {
          icon: UserPlus,
          label: "Approve Members",
          href: "/admin/approve",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
        },
        {
          icon: Users,
          label: "View Members",
          href: "/admin/view-members",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
        }
      ]
    },
    { 
      icon: Calendar, 
      label: "Events", 
      href: "#",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      submenu: [
        {
          icon: Calendar,
          label: "Host Event",
          href: "/admin/host-event",
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
        },
        {
          icon: Users,
          label: "Event Attendees",
          href: "/admin/event-attendees",
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
        }
      ]
    },
    { 
      icon: BarChart3, 
      label: "Analytics", 
      href: "/admin/analytics",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      href: "/admin/notifications",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      badge: unreadCount > 0 ? unreadCount.toString() : undefined,
    },
    { 
      icon: Settings, 
      label: "Settings", 
      href: "/admin/settings",
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
    },
  ]

  // Check if a route is active (including parent routes)
  const isRouteActive = (href: string): boolean => {
    if (href === "#") return false;
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  // Mobile Sidebar
  if (isMobile) {
    return (
      <>
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-9 h-9 rounded-lg flex items-center justify-center font-bold shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">ACM</span>
              <span className="text-xs text-muted-foreground">Admin Portal</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)} className="bg-background/50 backdrop-blur-sm">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {isMobileOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed inset-y-0 left-0 w-[85%] bg-background p-6 shadow-xl z-50 animate-in slide-in-from-left">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-md">
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">ACM</span>
                    <span className="text-xs text-muted-foreground">Admin Portal</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="bg-background/50 backdrop-blur-sm rounded-full h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-8rem)] pr-3">
                <div className="flex flex-col gap-1">
                  {menuSections.map((section) => {
                    const hasSubmenu = section.submenu && section.submenu.length > 0
                    const isActive = isRouteActive(section.href)
                    const isSectionOpen = openSections.includes(section.label)

                    // For items without submenu
                    if (!hasSubmenu) {
                      return (
                        <Button
                          key={section.href}
                          variant="ghost"
                          className={cn(
                            "justify-start gap-4 px-3 w-full rounded-lg h-11",
                            "relative transition-all duration-200",
                            isActive 
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium shadow-sm" 
                              : "hover:bg-muted/80"
                          )}
                          onClick={() => {
                            navigate(section.href)
                            setIsMobileOpen(false)
                          }}
                        >
                          <div className={cn(
                            "p-1.5 rounded-md transition-colors",
                            isActive ? "text-primary bg-primary/10" : section.color,
                            isActive ? "bg-primary/10" : section.bgColor,
                          )}>
                            <section.icon className="h-4 w-4" />
                          </div>
                          <span className={cn(
                            "font-medium",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}>
                            {section.label}
                          </span>
                          {section.badge ? (
                            <div className={cn(
                              "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                              section.color,
                              section.bgColor
                            )}>
                              {section.badge}
                            </div>
                          ) : isActive && (
                            <div className="absolute right-3 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            </div>
                          )}
                        </Button>
                      )
                    }

                    // For items with submenu
                    return (
                      <Collapsible 
                        key={section.label}
                        open={isSectionOpen}
                        onOpenChange={() => toggleSection(section.label)}
                        className="w-full space-y-1"
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "justify-start gap-4 px-3 w-full rounded-lg h-11",
                              "relative transition-all duration-200",
                              section.submenu?.some(item => isRouteActive(item.href)) 
                                ? "bg-gradient-to-r from-primary/5 to-transparent text-foreground font-medium" 
                                : "hover:bg-muted/80"
                            )}
                          >
                            <div className={cn(
                              "p-1.5 rounded-md transition-colors",
                              section.submenu?.some(item => isRouteActive(item.href)) 
                                ? `${section.color} ${section.bgColor}` 
                                : `${section.color} ${section.bgColor}`,
                            )}>
                              <section.icon className="h-4 w-4" />
                            </div>
                            <span className={cn(
                              "font-medium",
                              section.submenu?.some(item => isRouteActive(item.href))
                                ? "text-foreground" 
                                : "text-muted-foreground"
                            )}>
                              {section.label}
                            </span>
                            <ChevronDown 
                              className={cn(
                                "ml-auto h-4 w-4 transition-transform duration-300", 
                                isSectionOpen ? "rotate-180" : ""
                              )} 
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-10 space-y-1 overflow-hidden">
                          {section.submenu?.map(item => {
                            const isItemActive = isRouteActive(item.href)
                            return (
                              <Button
                                key={item.href}
                                variant="ghost"
                                className={cn(
                                  "justify-start gap-3 pl-3 w-full rounded-lg h-9 my-0.5",
                                  "relative transition-all duration-200",
                                  isItemActive 
                                    ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium shadow-sm" 
                                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => {
                                  navigate(item.href)
                                  setIsMobileOpen(false)
                                }}
                              >
                                <div className={cn(
                                  "rounded-md transition-colors",
                                  isItemActive ? "text-primary" : item.color,
                                )}>
                                  <item.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-sm">
                                  {item.label}
                                </span>
                                {isItemActive && (
                                  <div className="absolute right-3 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <div className="h-1 w-1 rounded-full bg-primary"></div>
                                  </div>
                                )}
                              </Button>
                            )
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </div>
              </ScrollArea>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                <Button
                  variant="ghost"
                  className="justify-start gap-4 px-3 w-full h-11 rounded-lg bg-gradient-to-r hover:from-red-500/10 hover:to-transparent text-red-500 hover:text-red-600 transition-all duration-200"
                  onClick={handleLogout}
                >
                  <div className="p-1.5 rounded-md bg-red-500/10">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop Sidebar
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen z-40 pt-16 hidden md:block",
        "bg-white dark:bg-[#0B1120] border-r",
        "border-slate-200 dark:border-slate-800",
        "shadow-md shadow-slate-200/20 dark:shadow-none",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[260px]",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-background to-background/95">
          <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "gap-3")}>
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-9 h-9 rounded-lg flex items-center justify-center font-bold shadow-sm">
              A
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">ACM</span>
                <span className="text-xs text-muted-foreground">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 pt-4 px-3">
          <div className="flex flex-col gap-1.5">
            {menuSections.map((section) => {
              const hasSubmenu = section.submenu && section.submenu.length > 0
              const isActive = isRouteActive(section.href)
              const isSectionOpen = openSections.includes(section.label)
              const isSubmenuActive = hasSubmenu && section.submenu?.some(item => isRouteActive(item.href))

              // For items without submenu in collapsed state
              if (isCollapsed && !hasSubmenu) {
                return (
                  <Button
                    key={section.href}
                    variant="ghost"
                    className={cn(
                      "justify-center w-full h-11 p-0 rounded-lg",
                      "relative transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm" 
                        : "text-muted-foreground hover:bg-muted/80"
                    )}
                    onClick={() => navigate(section.href)}
                  >
                    <div className={cn(
                      "p-1.5 rounded-md",
                      isActive ? "text-primary bg-primary/10" : `${section.color} ${section.bgColor}`,
                    )}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    {section.badge && (
                      <div className={cn(
                        "absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full flex items-center justify-center text-xs font-medium px-1",
                        section.color,
                        section.bgColor
                      )}>
                        {section.badge}
                      </div>
                    )}
                    {isActive && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"></div>
                    )}
                  </Button>
                )
              }

              // For items with submenu in collapsed state
              if (isCollapsed && hasSubmenu) {
                return (
                  <Button
                    key={section.label}
                    variant="ghost"
                    className={cn(
                      "justify-center w-full h-11 p-0 rounded-lg",
                      "relative transition-all duration-200",
                      isSubmenuActive 
                        ? "bg-gradient-to-r from-primary/5 to-transparent" 
                        : "hover:bg-muted/80"
                    )}
                    onClick={() => {
                      setOpenSections(prev => 
                        prev.includes(section.label) 
                          ? prev.filter(item => item !== section.label)
                          : [...prev, section.label]
                      )
                      setIsCollapsed(false)
                    }}
                  >
                    <div className={cn(
                      "p-1.5 rounded-md",
                      isSubmenuActive ? `${section.color} ${section.bgColor}` : `${section.color} ${section.bgColor}`,
                    )}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    {isSubmenuActive && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"></div>
                    )}
                  </Button>
                )
              }

              // For items without submenu in expanded state
              if (!isCollapsed && !hasSubmenu) {
                return (
                  <Button
                    key={section.href}
                    variant="ghost"
                    className={cn(
                      "justify-start gap-4 px-3 w-full rounded-lg h-11",
                      "transition-all duration-200 ease-in-out",
                      isActive 
                        ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm" 
                        : "hover:bg-muted/80"
                    )}
                    onClick={() => navigate(section.href)}
                  >
                    <div className={cn(
                      "p-1.5 rounded-md transition-colors",
                      isActive ? "bg-primary/10" : section.bgColor
                    )}>
                      <section.icon 
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-primary" : section.color
                        )} 
                      />
                    </div>
                    <span className={cn(
                      "font-medium",
                      isActive ? "text-primary" : ""
                    )}>
                      {section.label}
                    </span>
                    {section.badge ? (
                      <div className={cn(
                        "ml-auto rounded-full px-2 py-0.5 text-xs font-medium",
                        section.color,
                        section.bgColor
                      )}>
                        {section.badge}
                      </div>
                    ) : isActive && (
                      <div className="ml-auto h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </Button>
                )
              }

              // For items with submenu in expanded state
              return (
                <Collapsible 
                  key={section.label}
                  open={isSectionOpen}
                  onOpenChange={() => toggleSection(section.label)}
                  className="w-full space-y-1"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "justify-start gap-4 px-3 w-full rounded-lg h-11",
                        "transition-all duration-200",
                        isSubmenuActive 
                          ? "bg-gradient-to-r from-primary/5 to-transparent text-foreground shadow-sm" 
                          : "hover:bg-muted/80"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-md transition-colors",
                        isSubmenuActive ? `${section.bgColor}` : `${section.bgColor}`
                      )}>
                        <section.icon 
                          className={cn(
                            "h-5 w-5",
                            isSubmenuActive ? `${section.color}` : `${section.color}`
                          )} 
                        />
                      </div>
                      <span className={cn(
                        "font-medium",
                        isSubmenuActive ? "text-foreground" : "text-muted-foreground" 
                      )}>
                        {section.label}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "ml-auto h-4 w-4 transition-transform duration-300", 
                          isSectionOpen ? "rotate-180" : ""
                        )} 
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent 
                    className="pl-12 space-y-1 overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
                  >
                    {section.submenu?.map(item => {
                      const isItemActive = isRouteActive(item.href)
                      return (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className={cn(
                            "justify-start gap-3 pl-2 w-full rounded-lg h-9 my-0.5",
                            "relative transition-all duration-200",
                            isItemActive 
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm" 
                              : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                          )}
                          onClick={() => navigate(item.href)}
                        >
                          <item.icon className={cn(
                            "h-3.5 w-3.5",
                            isItemActive ? "text-primary" : ""
                          )} />
                          <span className="text-sm">
                            {item.label}
                          </span>
                          {isItemActive && (
                            <div className="ml-auto h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                              <div className="h-1 w-1 rounded-full bg-primary"></div>
                            </div>
                          )}
                        </Button>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            className={cn(
              "w-full rounded-lg h-11",
              isCollapsed 
                ? "justify-center p-2" 
                : "justify-start gap-4 px-3",
              "text-red-600 dark:text-red-400",
              "bg-gradient-to-r hover:from-red-500/10 hover:to-transparent",
              "hover:text-red-600 dark:hover:text-red-400",
              "transition-all duration-200"
            )}
            onClick={handleLogout}
          >
            <div className={cn(
              "p-1.5 rounded-md bg-red-100 dark:bg-red-900/20"
            )}>
              <LogOut className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}