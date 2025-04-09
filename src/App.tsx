import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Membership from "./pages/Membership";
import Events from "./pages/Events";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HostEvent from "./pages/admin/HostEvent";
import AdminEvents from "./pages/admin/Events";
import EventAttendees from "./pages/admin/EventAttendees";
import ApproveMember from "./pages/admin/ApproveMember";
import ViewMembers from "./pages/admin/ViewMembers";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SidebarProvider } from "@/context/SidebarContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { useState, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

function Layout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for theme and other resources
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin') && 
                     location.pathname !== '/admin/login' &&
                     location.pathname !== '/admin/forgot-password' &&
                     location.pathname !== '/admin/notifications' &&
                     location.pathname !== '/admin/settings';
  const isAuthPage = [
    '/login', 
    '/signup', 
    '/admin/login', 
    '/forgot-password', 
    '/admin/forgot-password'
  ].includes(location.pathname);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {!isAdminRoute && <Navbar />}
      <main className={`min-h-screen ${isAuthPage ? '' : 'pt-16'}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/host-event" element={<HostEvent />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/event-attendees" element={<EventAttendees />} />
          <Route path="/admin/approve" element={<ApproveMember />} />
          <Route path="/admin/view-members" element={<ViewMembers />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <QueryClientProvider client={queryClient}>
              <NotificationProvider>
                <SidebarProvider>
                  <Layout />
                </SidebarProvider>
              </NotificationProvider>
              <Toaster />
              <Sonner />
            </QueryClientProvider>
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
