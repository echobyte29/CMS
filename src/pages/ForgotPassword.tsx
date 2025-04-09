import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Check if we're on admin forgot password path
  const isAdmin = location.pathname.includes('admin');
  const backUrl = isAdmin ? '/admin/login' : '/login';
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const watchEmail = watch("email", "");

  const onSubmit = (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Password reset instructions sent to ${data.email}`);
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-blue-500/20 to-indigo-500/20 dark:from-teal-500/10 dark:via-blue-500/10 dark:to-indigo-500/10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
      
      {/* Gradient blobs */}
      <div className="absolute top-[-6rem] -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30" />
      <div className="absolute top-[-6rem] -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30" />
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-4"
      >
        <Card className="backdrop-blur-2xl bg-white/90 dark:bg-gray-950/30 border-white/20 dark:border-gray-800/20 shadow-2xl">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <Link 
                to={backUrl}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to login</span>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center shadow-lg"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
                {emailSent ? "Check Your Email" : "Forgot Password?"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {emailSent 
                  ? `We've sent recovery instructions to ${watchEmail}`
                  : `Enter your email to receive password reset instructions`
                }
              </p>
            </div>

            {!emailSent ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      className={`pl-10 bg-white/70 dark:bg-gray-900/40 border-gray-300 dark:border-gray-800/50 backdrop-blur-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 text-sm text-blue-800 dark:text-blue-300">
                  <p>
                    If you don't see the email in your inbox, please check your spam folder or try again.
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEmailSent(false)}
                  >
                    Try Again
                  </Button>
                  
                  <Button
                    type="button"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg"
                    onClick={() => navigate(backUrl)}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 