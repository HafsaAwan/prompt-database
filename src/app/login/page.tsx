'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // 1. We add a new state to track if the user has successfully submitted the sign-up form.
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        // If the user is already fully registered, we can give a more specific message.
        toast.error('A user with this email already exists. Please sign in.');
      } else {
        // For any other errors, show the default message.
        toast.error('Error signing up: ' + error.message);
      }
    } else if (data.user) {
      toast.success('Sign up successful! Please check your email to verify.');
      // 2. After a successful sign-up, we set our new state to true.
      setIsSubmitted(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Error logging in: ' + error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
  // This is the main page container that centers the form.
  <div className="flex flex-col min-h-screen">
    <div className="flex flex-grow items-center justify-center px-4 py-12">
      
      {/* This is the glassy form container. */}
      <div className="w-full max-w-md p-8 space-y-6 bg-glass-bg border border-glass-border rounded-2xl shadow-lg">
        
        {/* We conditionally render the content based on the 'isSubmitted' state. */}
        {isSubmitted ? (
          // If the form has been submitted, show this success message.
          <div className="text-center">
            <h1 className="text-3xl font-bold font-poppins text-text-primary">
              Check your email
            </h1>
            <p className="mt-4 text-text-secondary">
              We've sent a verification link to <span className="font-semibold text-text-primary">{email}</span>. Please click the link to complete your registration.
            </p>
          </div>
        ) : (
          // If the form has NOT been submitted, show the login/signup form.
          <>
            <h1 className="text-3xl font-bold text-center font-poppins text-text-primary">
              Welcome Back
            </h1>
            <div className="space-y-6">
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-secondary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-secondary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleLogin}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-background-start bg-accent-primary hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full flex justify-center py-2 px-4 border border-glass-border rounded-lg shadow-sm text-sm font-medium text-text-primary bg-glass-bg hover:bg-white/20 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}
