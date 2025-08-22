'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PromptCard from '@/components/PromptCard';
import FilterControls from '@/components/FilterControls';

type Prompt = {
  id: number;
  title: string;
  prompt_text: string;
  category: string;
  use_case: string;
};

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. New state to store the IDs of saved prompts. A Set is efficient for lookups.
  const [savedPromptIds, setSavedPromptIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      // First, fetch all the prompts
      const { data: allPrompts, error: promptsError } = await supabase.from('prompts').select('*');
      if (promptsError) {
        console.error('Error fetching prompts:', promptsError);
      } else if (allPrompts) {
        setPrompts(allPrompts);
      }

      // Next, check if a user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // If a user exists, fetch their saved prompt IDs
        const { data: saved, error: savedError } = await supabase
          .from('saved_prompts')
          .select('prompt_id') // We only need the ID
          .eq('user_id', user.id);

        if (savedError) {
          console.error('Error fetching saved prompts:', savedError);
        } else if (saved) {
          // Create a Set of the IDs for quick lookups
          const idSet = new Set(saved.map(item => item.prompt_id));
          setSavedPromptIds(idSet);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        AI Prompt Database
      </h1>
      <p className="text-zinc-400 text-center mb-8">
        Find the perfect prompt for any task.
      </p>

      <FilterControls />

      {loading ? (
        <p className="text-center">Loading prompts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              prompt_text={prompt.prompt_text}
              category={prompt.category}
              use_case={prompt.use_case}
              variant="home"
              // 2. Pass down whether this specific prompt is saved or not
              isSaved={savedPromptIds.has(prompt.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}