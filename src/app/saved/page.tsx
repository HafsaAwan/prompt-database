'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

// This is the type for a single, clean prompt object. It's correct.
type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

// This is the robust type that handles both cases:
// 'prompts' can be a single object OR an array of objects.
type SupabaseResponse = {
  id: number;
  prompts: Prompt | Prompt[] | null;
};

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSavedPrompts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase
      .from('saved_prompts')
      .select('id, prompts(*)')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching saved prompts:', error);
    } else if (data) {
      // This is the robust logic from your working file.
      // It correctly handles both the local server and the live server.
      const extractedPrompts = (data as SupabaseResponse[])
        .map(item => {
          if (!item.prompts) return null;
          // If it's an array (like on Vercel), take the first item.
          if (Array.isArray(item.prompts)) {
            return item.prompts.length > 0 ? item.prompts[0] : null;
          }
          // Otherwise, treat it as a single object (like on localhost).
          return item.prompts;
        })
        .filter((p): p is Prompt => p !== null);
      
      setPrompts(extractedPrompts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedPrompts();
  }, [router]);

  const handleRemove = async (promptId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to remove a prompt.');
      return;
    }
    const { error } = await supabase
      .from('saved_prompts')
      .delete()
      .eq('user_id', user.id)
      .eq('prompt_id', promptId);

    if (error) {
      toast.error('Error removing prompt: ' + error.message);
    } else {
      // Instead of reloading, we just update our state!
      setPrompts(prevPrompts => prevPrompts.filter(p => p.id !== promptId));
      toast.success('Prompt removed successfully!');
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading your saved prompts...</p>;
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      {/* THEME UPDATE: Styled the title and added a subtitle */}
      <div className="text-center py-8 md:py-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark-blue mb-4">
          My Favorites
        </h2>
        <p className="text-md text-slate-600">
          All your saved prompts in one place.
        </p>
      </div>
      
      {prompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              prompt_text={prompt.prompt_text}
              category={prompt.category}
              use_case={prompt.use_case}
              variant="saved"
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        // THEME UPDATE: Styled the "empty" message
        <div className="text-center py-12">
          <p className="text-slate-600">You haven&apos;t saved any prompts yet.</p>
          <Link href="/" className="mt-4 inline-block bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-medium-blue transition-colors">
            Explore Prompts
          </Link>
        </div>
      )}
    </main>
  );
}
