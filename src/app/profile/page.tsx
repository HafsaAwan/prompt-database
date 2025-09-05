
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  // State to hold the current user object.
  const [user, setUser] = useState<User | null>(null);
  // State to manage the loading indicator.
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // This effect runs once to fetch the current user's data.
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If no user is logged in, redirect them to the login page.
      if (!user) {
        toast.error("You must be logged in to view this page.");
        router.push('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // Function to handle logging the user out.
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // While the page is fetching user data, show a loading message.
  if (loading) {
    return <p className="text-center py-24">Loading profile...</p>;
  }

  // Once loaded, render the profile information.
  return (
    <div className="container mx-auto px-8 md:px-16 py-24">
      <div className="max-w-xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins font-bold text-4xl text-text-primary">
            My Profile
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your account details.
          </p>
        </div>

        {/* Profile Information Card */}
        <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Email</label>
            <p className="text-lg text-text-primary mt-1">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Last Sign In</label>
            <p className="text-lg text-text-primary mt-1">
              {user ? new Date(user.last_sign_in_at!).toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="text-text-secondary hover:text-red-400 text-sm font-medium font-nunito transition-colors"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
}