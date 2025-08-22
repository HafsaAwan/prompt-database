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

// THE FIX: This type now correctly defines that 'prompts' is an ARRAY of Prompt objects,
// which matches what the TypeScript error is telling us.
type SavedPromptResponse = {
  id: number;
  prompts: Prompt[];
};

export default function SavedPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugMessage, setDebugMessage] = useState('1. Component loaded. Starting fetch...');
  const router = useRouter();

  useEffect(() => {
    const fetchSavedPrompts = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDebugMessage('2. No user found. Redirecting...');
        router.push('/login');
        return;
      }
      setDebugMessage(`2. User found: ${user.email}`);

      const { data, error } = await supabase
        .from('saved_prompts')
        .select('id, prompts(*)')
        .eq('user_id', user.id);

      if (error) {
        setDebugMessage(`3. Error from Supabase: ${error.message}`);
      } else if (data) {
        setDebugMessage(`3. Data received from Supabase: ${JSON.stringify(data, null, 2)}`);
        
        // THE FIX: This logic now correctly handles the nested array structure.
        // It maps over the response, takes the first item from the inner 'prompts' array,
        // and then filters out any potential nulls.
        const extractedPrompts = (data as SavedPromptResponse[])
          .map(item => (item.prompts && item.prompts.length > 0 ? item.prompts[0] : null))
          .filter((p): p is Prompt => p !== null);
        
        setPrompts(extractedPrompts);
        setDebugMessage(`4. Processed ${extractedPrompts.length} prompts successfully.`);
      }
      setLoading(false);
    };

    fetchSavedPrompts();
  }, [router]);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        My Saved Prompts
      </h1>

      {loading && <p className="text-center">Loading your saved prompts...</p>}
      
      {!loading && prompts.length > 0 && (
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
      )}

      {!loading && prompts.length === 0 && (
        <p className="text-center mt-8">You haven&apos;t saved any prompts yet.</p>
      )}

      {/* Debug Box */}
      <div className="mt-12 p-4 bg-zinc-800 border border-zinc-700 rounded-lg">
        <h3 className="text-lg font-semibold text-zinc-400">Debug Information:</h3>
        <pre className="text-sm text-zinc-500 whitespace-pre-wrap">
          {debugMessage}
        </pre>
      </div>
    </main>
  );
}
