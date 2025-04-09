import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Chrome, Facebook, Github, Linkedin, LogIn, UserPlus } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

type AuthFormData = z.infer<typeof authSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: AuthFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  const socialIcons = [
    { Icon: Chrome, color: "text-red-500", label: "Google" },
    { Icon: Facebook, color: "text-blue-600", label: "Facebook" },
    { Icon: Github, color: "text-gray-800", label: "Github" },
    { Icon: Linkedin, color: "text-blue-500", label: "LinkedIn" }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100 p-4">
      <div className={`relative bg-white rounded-[30px] shadow-2xl w-full max-w-[768px] min-h-[480px] overflow-hidden`}>
        {/* Sign Up Form */}
        <div className={`absolute top-0 h-full w-1/2 transition-transform duration-700 ease-in-out
          ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col items-center justify-center px-10 bg-white">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <div className="flex gap-3 my-5">
              {socialIcons.map(({ Icon, color, label }, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-10 h-10 border rounded-lg flex items-center justify-center ${color} hover:bg-gray-50 transition-colors`}
                  aria-label={`Sign up with ${label}`}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500 mb-4">or use your email for registration</span>
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full bg-gray-100 border-none rounded-lg mb-3"
            />
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full bg-gray-100 border-none rounded-lg mb-3"
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full bg-gray-100 border-none rounded-lg mb-3"
            />
            <Button 
              type="submit"
              className="w-full bg-[#2da0a8] hover:bg-[#2590a8] text-white px-11 py-2 rounded-lg uppercase text-sm font-semibold tracking-wider mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 h-full w-1/2 transition-transform duration-700 ease-in-out
          ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col items-center justify-center px-10 bg-white">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex gap-3 my-5">
              {socialIcons.map(({ Icon, color, label }, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-10 h-10 border rounded-lg flex items-center justify-center ${color} hover:bg-gray-50 transition-colors`}
                  aria-label={`Sign in with ${label}`}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500 mb-4">or use your email password</span>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full bg-gray-100 border-none rounded-lg mb-3"
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full bg-gray-100 border-none rounded-lg mb-3"
            />
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800 mb-4">Forgot Your Password?</a>
            <Button 
              type="submit"
              className="w-full bg-[#2da0a8] hover:bg-[#2590a8] text-white px-11 py-2 rounded-lg uppercase text-sm font-semibold tracking-wider"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out
          ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-gradient-to-r from-[#5c6bc0] to-[#2da0a8] text-white relative h-full w-[200%] 
            transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : '-translate-x-full'}`}>
            
            {/* Left Panel */}
            <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center
              transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-0' : '-translate-x-[200%]'}`}>
              <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm mb-6">Enter your personal details to use all of site features</p>
              <button
                onClick={() => setIsSignUp(false)}
                className="border border-white bg-transparent text-white px-11 py-2 rounded-lg uppercase text-sm font-semibold tracking-wider hover:bg-white/10"
              >
                Sign In
              </button>
            </div>

            {/* Right Panel */}
            <div className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center
              transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-[200%]' : 'translate-x-0'}`}>
              <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-6">Register with your personal details to use all of site features</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="border border-white bg-transparent text-white px-11 py-2 rounded-lg uppercase text-sm font-semibold tracking-wider hover:bg-white/10"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;