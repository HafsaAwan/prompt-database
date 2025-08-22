'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import { useRouter } from 'next/navigation';

// This is the type for a single, clean prompt object. It's correct.
type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSavedPrompts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // This query is correct.
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('id, prompts(*)')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching saved prompts:', error);
      } else if (data) {
        // THE FIX: This logic is now robust. It tells TypeScript to expect 'any'
        // and then checks the data's actual shape before processing it.
        const extractedPrompts = (data as any[])
          .map(item => {
            // Check if item.prompts exists.
            if (!item.prompts) {
              return null;
            }
            // Check if it's an array (for the Vercel build server).
            if (Array.isArray(item.prompts)) {
              return item.prompts.length > 0 ? item.prompts[0] : null;
            }
            // Otherwise, treat it as a single object (for the local server).
            return item.prompts;
          })
          .filter((p): p is Prompt => p !== null); // This removes any nulls.
        
        setPrompts(extractedPrompts);
      }
      setLoading(false);
    };

    fetchSavedPrompts();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-8">Loading your saved prompts...</p>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Saved Prompts
      </h1>
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
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-8">You haven&apos;t saved any prompts yet.</p>
      )}
    </main>
  );
}
