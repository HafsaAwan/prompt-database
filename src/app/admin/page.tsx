'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User } from '@supabase/supabase-js';

// --- ADMIN SECURITY CONFIGURATION ---
// IMPORTANT: Replace this with your actual User ID from Supabase Authentication.
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function AdminPage() {
  // State for the form fields
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [category, setCategory] = useState('');
  const [useCase, setUseCase] = useState(''); // Added useCase state

  // State to manage loading and user authentication
  const [_user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // This effect runs once to check if the current user is the authorized admin.
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // --- DEBUGGING LOGS ---
      console.log("Logged-in User ID:", user?.id);
      console.log("Admin ID from .env:", process.env.NEXT_PUBLIC_ADMIN_USER_ID);
      // --- END DEBUGGING ---

      
      setUser(user);

      // Security Check: If there is no user or the user's ID doesn't match the admin ID,
      // redirect them to the homepage.
      if (!user || user.id !== ADMIN_USER_ID) {
        toast.error("Access Denied. You are not authorized to view this page.");
        router.push('/');
      } else {
        // If the user is the admin, stop the loading state.
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  // This function handles the form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled.
    if (!title || !promptText || !category || !useCase) {
      toast.error('Please fill out all fields.');
      return;
    }

    // Insert the new prompt data into the 'prompts' table in Supabase.
    const { error } = await supabase.from('prompts').insert({
      title,
      prompt_text: promptText,
      category,
      use_case: useCase,
    });

    if (error) {
      toast.error('Error creating prompt: ' + error.message);
    } else {
      toast.success('Prompt created successfully!');
      // Clear the form fields after a successful submission.
      setTitle('');
      setPromptText('');
      setCategory('');
      setUseCase('');
    }
  };

  // If the page is still loading or checking credentials, show a loading message.
  if (loading) {
    return <p className="text-center py-24">Verifying credentials...</p>;
  }

  return (
    // Main container for the admin page content.
    <div className="container mx-auto px-8 md:px-16 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins font-bold text-4xl text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-2">Add a new prompt to the database.</p>
        </div>

        {/* The form for creating a new prompt, styled with our glassy theme. */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-glass-bg border border-glass-border rounded-2xl p-8">
          
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-primary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
            />
          </div>

          {/* Prompt Text Field (Textarea) */}
          <div>
            <label htmlFor="promptText" className="block text-sm font-medium text-text-secondary">Prompt Text</label>
            <textarea
              id="promptText"
              rows={4}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-primary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
            />
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-primary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
            />
          </div>
          
          {/* Use Case Field */}
          <div>
            <label htmlFor="useCase" className="block text-sm font-medium text-text-secondary">Use Case</label>
            <input
              id="useCase"
              type="text"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="mt-1 block w-full bg-glass-bg border border-glass-border rounded-lg py-2 px-3 text-text-primary placeholder-text-secondary/60 focus:ring-2 focus:ring-accent-primary focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-background-start bg-accent-primary hover:opacity-90 transition-opacity"
            >
              Add Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}