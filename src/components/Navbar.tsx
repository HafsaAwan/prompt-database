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
      (_event, session) => {
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
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background-start/90 backdrop-blur-md border-white/10">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold font-poppins text-text-primary">
            AI Did This
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/saved" className="text-text-secondary hover:text-text-primary text-sm font-medium font-nunito transition-colors">
                  Favorites
                </Link>
                <span className="text-text-secondary/70 text-sm font-nunito hidden sm:block">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-accent-primary hover:opacity-90 text-background-start px-4 py-2 rounded-lg text-sm font-semibold font-nunito transition-opacity"
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