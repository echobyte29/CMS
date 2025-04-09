// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Clock, Bell, BarChart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="section-container bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground dark:text-slate-300 text-lg">
          Manage your ACM Student Chapter membership and activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Events Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Upcoming Events</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            You have 3 upcoming events this month.
          </p>
          <Link to="/events">
            <Button variant="outline" className="w-full dark:bg-slate-800/50">View Events</Button>
          </Link>
        </Card>

        {/* Membership Status Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Membership</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            Your student membership is active until Dec 2023.
          </p>
          <Link to="/membership">
            <Button variant="outline" className="w-full dark:bg-slate-800/50">Manage Membership</Button>
          </Link>
        </Card>

        {/* Resources Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Resources</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            Access exclusive learning materials and resources.
          </p>
          <Button variant="outline" className="w-full dark:bg-slate-800/50">Browse Resources</Button>
        </Card>

        {/* Activity Log Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Activity Log</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            View your participation history and contributions.
          </p>
          <Button variant="outline" className="w-full dark:bg-slate-800/50">View Activity</Button>
        </Card>

        {/* Notifications Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Notifications</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            Stay updated with important announcements.
          </p>
          <Button variant="outline" className="w-full dark:bg-slate-800/50">View Notifications</Button>
        </Card>

        {/* Analytics Card */}
        <Card className="p-6 hover:shadow-md transition-all dark:bg-slate-800/50">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium dark:text-white">Analytics</h3>
          </div>
          <p className="text-muted-foreground dark:text-slate-300 mb-4">
            Track your engagement and participation.
          </p>
          <Button variant="outline" className="w-full dark:bg-slate-800/50">View Analytics</Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
