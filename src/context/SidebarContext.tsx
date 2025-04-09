import { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (state: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  const setSidebarCollapsed = (state: boolean) => {
    setIsSidebarCollapsed(state)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarCollapsed, toggleSidebar, setSidebarCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
} 