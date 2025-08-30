'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    // THEME UPDATE: Deep blue background from your new palette
    <nav className="bg-[#1B2B34] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
            AI Did This
          </Link>
          
          {/* Links & Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged-in view
              <>
                {/* THEME UPDATE: Renamed to "Favorites" */}
                <Link href="/saved" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Favorites
                </Link>
                <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged-out view
              <Link
                href="/login"
                // THEME UPDATE: Using a bright blue accent from your palette
                className="bg-[#0077B6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0096C7] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
