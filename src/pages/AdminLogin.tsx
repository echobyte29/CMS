import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Shield, User, UserPlus, LogIn, Mail } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { Card } from "@/components/ui/card";

const adminLoginSchema = z.object({
  uniqueId: z.string().min(1, "Unique ID is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      uniqueId: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: AdminLoginFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simple mock validation - in a real app this would be handled by the backend
      if (data.email === "admin@example.com" && data.password === "admin123") {
        // Set admin token in localStorage
        localStorage.setItem("adminToken", "admin-session-token");
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Try admin@example.com/admin123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-16">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
      
      {/* Gradient blobs */}
      <div className="absolute top-[-6rem] -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30" />
      <div className="absolute top-[-6rem] -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30" />
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl p-4"
      >
        <Card className="backdrop-blur-2xl bg-white/90 dark:bg-gray-950/30 border-white/20 dark:border-gray-800/20 shadow-2xl rounded-[18px]">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center space-y-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg"
              >
                <Shield className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Admin Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="uniqueId" className="text-gray-800 dark:text-gray-200">
                    Unique ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="uniqueId"
                      type="text"
                      placeholder="Enter your unique ID"
                      {...register("uniqueId")}
                      className={`pl-10 h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        errors.uniqueId ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.uniqueId && (
                      <p className="text-sm text-red-500 mt-1">{errors.uniqueId.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-800 dark:text-gray-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className={`pl-10 h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-800 dark:text-gray-200">
                      Password
                    </Label>
                    <Link 
                      to="/admin/forgot-password"
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        errors.password ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : "Login as Admin"}
                  </Button>
                </motion.div>

                <div className="flex-1 flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 py-2 px-4 h-11 rounded-md text-base font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    User Login
                  </Link>
                </div>
              </div>

              <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Use admin@example.com/admin123 to login</p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="mt-4 flex justify-center"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    to="/signup" 
                    className="flex items-center justify-center gap-2 py-2 px-6 h-10 rounded-md text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <UserPlus className="h-4 w-4" />
                    Create new account
                  </Link>
                </motion.div>
              </motion.div>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}