import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart3 } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState({ id: '', name: '' });

  useEffect(() => {
    // Fetch admin user data
    // This is a placeholder and should be replaced with actual data fetching logic
    setAdminUser({ id: '1', name: 'John Doe' });
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto">
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
              onClick={() => navigate('/admin/host-event')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Host Event
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => navigate('/admin/analytics')}
              variant="outline"
              className="border-2"
            >
              Analytics
              <BarChart3 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Rest of the dashboard content */}
        {/* ... existing code ... */}
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 