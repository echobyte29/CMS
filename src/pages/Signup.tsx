// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Mail, User, LogIn, Shield, CheckCircle, XCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";

const signupSchema = z.object({
  acmId: z.string().min(1, "ACM ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      acmId: "",
      name: "",
      email: "",
      password: "",
    }
  });

  // Watch the password field
  const watchPassword = watch("password", "");

  // Check password requirements
  const hasMinLength = watchPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(watchPassword);
  
  // Calculate overall strength
  const getPasswordStrength = () => {
    let strength = 0;
    if (hasMinLength) strength += 1;
    if (hasUppercase) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecial) strength += 1;
    
    return strength;
  };
  
  // Get strength label
  const getStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };
  
  // Get color for strength bar
  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-orange-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const onSubmit = (data: SignupFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully!");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-16">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
      
      {/* Gradient blobs */}
      <div className="absolute top-[-6rem] -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30" />
      <div className="absolute top-[-6rem] -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30" />
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-3xl p-4"
      >
        <Card className="backdrop-blur-2xl bg-white/90 dark:bg-gray-950/30 border-white/20 dark:border-gray-800/20 shadow-2xl">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center space-y-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg mb-2"
              >
                <UserPlus className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Create an account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join the ACM Student Chapter today
              </p>
              
              {/* Admin login button - visible without scrolling */}
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                className="mt-1"
              >
                <Link 
                  to="/admin/login" 
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-all duration-200"
                >
                  <Shield className="h-4 w-4" />
                  Login as Admin
                </Link>
              </motion.div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="acmId" className="text-gray-900 dark:text-white">
                    ACM ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="acmId"
                      type="text"
                      placeholder="Your ACM ID"
                      {...register("acmId")}
                      className={`pl-10 h-11 bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 ${
                        errors.acmId ? "border-red-500" : ""
                      }`}
                    />
                    {errors.acmId && (
                      <p className="text-sm text-red-500 mt-1">{errors.acmId.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 dark:text-white">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name")}
                      className={`pl-10 h-11 bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`pl-10 h-11 bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 dark:text-white">
                    Create Password
                  </Label>
                  <div className="relative">
                    <PasswordInput
                      id="password"
                      placeholder="Create a strong password"
                      {...register("password")}
                      className={`h-11 bg-white/50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password strength indicator */}
              {watchPassword && (
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Password Strength: <span className={`
                      ${getPasswordStrength() === 4 ? 'text-green-500' : ''}
                      ${getPasswordStrength() === 3 ? 'text-blue-500' : ''}
                      ${getPasswordStrength() === 2 ? 'text-yellow-500' : ''}
                      ${getPasswordStrength() === 1 ? 'text-orange-500' : ''}
                      ${getPasswordStrength() === 0 ? 'text-red-500' : ''}
                    `}>{getStrengthLabel()}</span></h4>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                    <div className={`h-full ${getStrengthColor()} rounded-full transition-all duration-300`} style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start space-x-2">
                      {hasMinLength ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> : 
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      }
                      <span className={`text-xs ${hasMinLength ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {hasMinLength ? "Password has at least 8 characters" : "Password needs at least 8 characters"}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      {hasUppercase ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> : 
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      }
                      <span className={`text-xs ${hasUppercase ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {hasUppercase ? "Password contains uppercase letter" : "Password needs an uppercase letter"}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      {hasNumber ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> : 
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      }
                      <span className={`text-xs ${hasNumber ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {hasNumber ? "Password contains a number" : "Password needs a number"}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      {hasSpecial ? 
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /> : 
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      }
                      <span className={`text-xs ${hasSpecial ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {hasSpecial ? "Password contains a special character" : "Password needs a special character"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </motion.div>

                <div className="flex-1 flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 py-2 px-4 h-11 rounded-md text-base font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Already have an account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
