'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? 'bg-background-start/40 border-white/10'
          : 'bg-background-start/90 border-white/20'
      }`}
    >
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold font-poppins text-text-primary"
          >
            AI Did This
          </Link>

          <div className="flex items-center space-x-6">
            {/* General navigation links */}
            <Link href="/" className="nav-link hidden sm:block">
              Home
            </Link>
            <Link href="/prompts" className="nav-link hidden sm:block">
              Prompt Database
            </Link>
            {/* Conditional user links */}
            {user ? (
              <>
                <Link href="/saved" className="nav-link">
                  Favorites
                </Link>
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  // The "gentle" logout button now uses the same style as our nav links
                  className="nav-link"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-accent-primary hover:opacity-90 text-background-start px-4 py-2 rounded-lg text-sm font-semibold font-nunito transition-opacity"
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