import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn, Shield, UserPlus, Mail, User, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordInput } from "@/components/ui/password-input";

const userLoginSchema = z.object({
  acmId: z.string().min(1, "ACM ID is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type UserLoginFormData = z.infer<typeof userLoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    watch,
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      acmId: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const watchedFields = watch();

  const isFieldValid = (fieldName: keyof UserLoginFormData) => {
    return dirtyFields[fieldName] && !errors[fieldName];
  };

  const onSubmit = (data: UserLoginFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (data.email === "user@example.com" && data.password === "user123") {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Try user@example.com/user123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-16">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 dark:from-orange-500/10 dark:via-purple-500/10 dark:to-blue-500/10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
      
      {/* Gradient blobs */}
      <div className="absolute top-[-6rem] -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30" />
      <div className="absolute top-[-6rem] -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30" />
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl p-4"
      >
        <Card className="backdrop-blur-2xl bg-white/90 dark:bg-gray-950/30 border-white/20 dark:border-gray-800/20 shadow-2xl overflow-hidden">
          {/* Top gradient accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>
          
          <div className="p-8">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col items-center justify-center space-y-3 mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg transform -rotate-3"
                >
                  <LogIn className="h-10 w-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mt-3">
                  Welcome Back
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
                  Sign in to your account to access the ACM Student Chapter dashboard
                </p>
              </motion.div>
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="acmId" className="text-gray-800 dark:text-gray-200 font-medium">
                    ACM ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="acmId"
                      type="text"
                      placeholder="Enter your ACM ID"
                      {...register("acmId")}
                      className={`pl-10 h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-orange-500/30 ${
                        errors.acmId ? "border-red-500 focus:ring-red-500/50" : ""
                      } ${isFieldValid('acmId') ? "border-green-500/50 focus:ring-green-500/30" : ""}`}
                    />
                    {isFieldValid('acmId') && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    <AnimatePresence>
                      {errors.acmId && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.acmId.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-gray-800 dark:text-gray-200 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className={`pl-10 h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-orange-500/30 ${
                        errors.email ? "border-red-500 focus:ring-red-500/50" : ""
                      } ${isFieldValid('email') ? "border-green-500/50 focus:ring-green-500/30" : ""}`}
                    />
                    {isFieldValid('email') && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="space-y-2 md:col-span-2"
                >
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-800 dark:text-gray-200 font-medium">
                      Password
                    </Label>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to="/forgot-password"
                        className="text-sm text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
                      >
                        Forgot Password?
                      </Link>
                    </motion.div>
                  </div>
                  <div className="relative">
                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`h-11 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-orange-500/30 ${
                        errors.password ? "border-red-500 focus:ring-red-500/50" : ""
                      } ${isFieldValid('password') ? "border-green-500/50 focus:ring-green-500/30" : ""}`}
                    />
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.password.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg font-medium text-base transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                      disabled={isLoading || !isValid}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : "Sign in"}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex-1"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link 
                      to="/signup" 
                      className="flex items-center justify-center gap-2 py-2 px-4 h-12 rounded-md text-base font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/40 transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
                    >
                      <UserPlus className="h-5 w-5" />
                      Create an account
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="mt-6 flex justify-center"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    to="/admin/login" 
                    className="flex items-center justify-center gap-2 py-2 px-6 h-10 rounded-md text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <Shield className="h-4 w-4" />
                    Login as Admin
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
