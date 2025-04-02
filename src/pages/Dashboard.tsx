
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Users, BookOpen, Clock, Bell, BarChart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="section-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your ACM Student Chapter membership and activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Events Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Upcoming Events</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            You have 3 upcoming events this month.
          </p>
          <Link to="/events">
            <Button variant="outline" className="w-full">View Events</Button>
          </Link>
        </Card>

        {/* Membership Status Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Membership</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Your student membership is active until Dec 2023.
          </p>
          <Link to="/membership">
            <Button variant="outline" className="w-full">Manage Membership</Button>
          </Link>
        </Card>

        {/* Resources Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Resources</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Access exclusive learning materials and resources.
          </p>
          <Button variant="outline" className="w-full">Browse Resources</Button>
        </Card>

        {/* Activity Log Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Activity Log</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            View your participation history and contributions.
          </p>
          <Button variant="outline" className="w-full">View Activity</Button>
        </Card>

        {/* Notifications Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Notifications</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            You have 2 unread notifications.
          </p>
          <Button variant="outline" className="w-full">View All</Button>
        </Card>

        {/* Stats Card */}
        <Card className="p-6 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Chapter Stats</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Explore statistics about our chapter's growth.
          </p>
          <Button variant="outline" className="w-full">View Stats</Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
