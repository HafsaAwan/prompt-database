'use client'; // This component now needs to be interactive

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  // Create a state variable to store the user object
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Use the useEffect hook to check for a user session on component load
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Set up a listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh the page to update the UI
  };

  return (
    <nav className="bg-zinc-900 p-4 border-b border-zinc-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          AI Did This
        </Link>
        <div>
          {/* This is our conditional rendering logic */}
          {user ? (
            // If a user exists, show their email and a Logout button
            <div className="flex items-center space-x-4">
              <Link href="/saved" className="text-zinc-300 hover:text-white text-sm">
                My Saved
              </Link>
              <span className="text-zinc-400 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            // If no user exists, show the Login button
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}