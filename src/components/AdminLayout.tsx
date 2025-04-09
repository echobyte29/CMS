import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/Sidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useSidebar } from "@/context/SidebarContext"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { isSidebarCollapsed, toggleSidebar } = useSidebar()
  const navigate = useNavigate()

  const adminUser = {
    name: "John Doe",
    role: "Admin",
    id: "ACM2024001",
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

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
          <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b shadow-md">
            <div className="h-full max-w-screen-2xl mx-auto px-4 md:px-6 flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-background/90 transition-colors">
                  <Menu className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">ACM Admin Portal</h2>
              </div>
              
              {/* Center Section - Search */}
              <div className="hidden md:flex flex-1 justify-center max-w-xl px-4">
                <div className="relative w-full max-w-md">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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

              {/* Right Section */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full animate-pulse border-2 border-background"></span>
                </Button>
                <ThemeToggle />
                <div className="hidden sm:block h-6 w-px bg-border mx-1"></div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="gap-2 hover:bg-background/90 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  )
}