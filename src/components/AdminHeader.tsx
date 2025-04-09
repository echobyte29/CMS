"use client"

import { Button } from "@/components/ui/button"
import { Bell, Menu, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  onMenuToggle?: () => void
  title?: string
  showSearch?: boolean
}

export function AdminHeader({ onMenuToggle, title = "ACM Admin Portal", showSearch = false }: AdminHeaderProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  const adminUser = {
    name: "John Doe",
    role: "Admin",
    id: "ACM2024001",
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b shadow-md flex items-center px-4 md:px-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onMenuToggle}
        className="mr-4 hover:bg-background/90 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center">
        <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 mr-6">{title}</h2>
        
        {showSearch && (
          <div className="hidden md:flex flex-1 justify-center max-w-xl">
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
        )}
      </div>
      
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-1 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all rounded-full w-9 px-0 md:w-auto md:px-3">
              <span className="hidden md:inline">Account</span>
              <LogOut className="h-4 w-4 md:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

