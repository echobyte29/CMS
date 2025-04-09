import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNotifications } from '@/context/NotificationContext';

const Settings = () => {
  const { clearAllNotifications } = useNotifications();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const handleClearNotifications = () => {
    clearAllNotifications();
    toast.success('All notifications cleared');
  };

  return (
    <motion.div
      className="container mx-auto py-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8"
        variants={itemVariants}
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div className="flex items-center justify-between" variants={itemVariants}>
                <div className="space-y-1">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-500">Toggle dark mode theme</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label>Language</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div className="flex items-center justify-between" variants={itemVariants}>
                <div className="space-y-1">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </motion.div>

              <motion.div className="flex items-center justify-between" variants={itemVariants}>
                <div className="space-y-1">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Enable browser push notifications</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </motion.div>

              <motion.div className="flex items-center justify-between" variants={itemVariants}>
                <div className="space-y-1">
                  <Label>Notification Sound</Label>
                  <p className="text-sm text-gray-500">Play sound when receiving notifications</p>
                </div>
                <Switch
                  checked={notificationSound}
                  onCheckedChange={setNotificationSound}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button 
                  variant="destructive"
                  onClick={handleClearNotifications}
                  className="w-full"
                >
                  Clear All Notifications
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div className="flex items-center justify-between" variants={itemVariants}>
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label>Change Password</Label>
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm New Password" />
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label>Theme Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['blue', 'green', 'purple', 'pink', 'orange'].map((color) => (
                    <button
                      key={color}
                      className={`w-full aspect-square rounded-lg border-2 ${
                        color === 'blue' ? 'border-primary' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: `var(--${color}-500)` }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label>Font Size</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div 
        className="mt-8 flex justify-end"
        variants={itemVariants}
      >
        <Button onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Settings; 