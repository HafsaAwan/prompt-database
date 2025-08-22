'use client'; // 1. This component needs to run in the browser, not on the server.
// We need this because it uses browser-only features like useState and event handlers (onClick, onChange, onSubmit) to respond to user actions.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  // 2. State variables to hold the user's input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // 3. Hook to allow redirection

    // This function handles signing up a new user
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert('Error signing up: ' + error.message);
    } else if (data.user) {
      // Because email confirmation is on, Supabase sends a verification email.
      // The user is created but can't log in until they verify.
      alert('Sign up successful! Please check your email to verify your account.');
    }
  };


  // 4. This function will run when the form is submitted
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from reloading

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Error logging in: ' + error.message); 
    } else {
      router.push('/'); // Redirect to the homepage on successful login
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">
          Sign In or Sign Up
        </h1>
        {/* We don't need the <form> tag's onSubmit for this approach */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* This div will hold our two buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="w-full flex justify-center py-2 px-4 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}